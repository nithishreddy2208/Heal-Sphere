// //http:localhost:3000/doctor/addPrescription/{id}




const PrescriptionModel = require("../Models/PrescriptionModel");
const AppointmentModel = require("../Models/AppointmentModel");
const DoctorModel = require("../Models/DoctorModel");

const addPrescription = async (req, res) => {
    try {
        const patientId = req.params.id; 
        console.log(patientId);
        const doctorId = req.user._id; 
        console.log(doctorId);
        const {patientName,medicines, dosages, cause } = req.body; 

        const doctor = await DoctorModel.findOne({ userId: doctorId });
        if (!doctor) {
            return res.status(403).json({ message: "Doctor not found" });
        }

        const completedAppointment = await AppointmentModel.findOne({
            patientId,
            doctorId: doctor._id,
            status: "Completed",
        });
        if (!completedAppointment) {
            return res.status(403).json({
                message: "You can add prescription only after the appointment is completed",
            });
        }

        const prescription = new PrescriptionModel({
            patientId,
            doctorId,
            patientName,
            medicines,
            dosages,
            cause,
            issuedOn : new Date().toLocaleDateString()
        });
        await prescription.save();
        return res.status(200).json({ "message": "Prescription is Added" });
    } catch (error) {
        return res.status(500).json(error);
    }
};

const getPrescription = async (req, res) => {
    try {
        const patientId = req.user._id; // Access req.user directly
        const getPres = await PrescriptionModel.find({ patientId }).populate('doctorId','specialization');
        if (!getPres.length) { // Check if there are no prescriptions
            return res.status(403).json("No prescriptions Found");
        }
        return res.status(200).json(getPres);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const getPrescriptionDetailsById = async (req, res) => {
    try {
        const id = req.params.id;
        const getPres = await PrescriptionModel.findById(id)
        if (!getPres) { 
            return res.status(403).json("No prescription found");
        }
        return res.status(200).json(getPres);
    } catch (error) {
        return res.status(500).json({ error });
    }
}

const getDoctorPrescriptions = async (req, res) => {
    try {
        const doctorId = req.user._id;
        const prescriptions = await PrescriptionModel.find({ doctorId }).populate(
            'patientId',
            'userName email'
        );
        return res.status(200).json({ prescriptions });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

module.exports = { addPrescription, getPrescription, getPrescriptionDetailsById, getDoctorPrescriptions };

