import React, { useEffect, useState } from 'react'
import Card from './Card';
import Select from 'react-select';
import symptomSpecializationMapping from '../data/symptomSpecializationMapping';
import { Stethoscope, Search, Filter, Users, Calendar, Clock, Star, MapPin, Phone, Mail } from "lucide-react";

const BookAppointment = () => {
    const [doctors, setDoctors] = useState([]);
    const [symptoms, setSymptoms] = useState([]);
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [allDoctors, setAllDoctors] = useState([]); // Store all doctors
    const [isFiltered, setIsFiltered] = useState(false); // Track if currently filtered

    useEffect(() => {
        fetchSymptoms();
        fetchAllDoctors();
    }, []);

    const fetchSymptoms = async () => {
        try {
            const res = await fetch('http://localhost:3000/symptoms');
            const data = await res.json();
            setSymptoms(data);
        } catch (error) {
            console.error('Error fetching symptoms:', error);
            // Fallback to symptoms from mapping if API fails
            const fallbackSymptoms = symptomSpecializationMapping.map(item => item.symptom);
            setSymptoms(fallbackSymptoms);
        }
    };

    const fetchAllDoctors = async () => {
        try {
            const docs = await fetch(`http://localhost:3000/getDoctors`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await docs.json();
            if (docs.ok) {
                setAllDoctors(data.getDocs);
                setDoctors(data.getDocs); // Initially show all doctors
            }
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    // Client-side filtering function using symptom mapping
    const filterDoctorsBySymptoms = (selectedSymptoms) => {
        if (selectedSymptoms.length === 0) {
            return allDoctors; // Return all doctors if no symptoms selected
        }

        // Get all relevant specializations for selected symptoms
        const relevantSpecializations = new Set();
        
        selectedSymptoms.forEach(symptom => {
            const mapping = symptomSpecializationMapping.find(item => item.symptom === symptom);
            if (mapping) {
                mapping.specializations.forEach(spec => relevantSpecializations.add(spec));
            }
        });

        // Filter doctors whose specialization matches any of the relevant specializations
        const filteredDoctors = allDoctors.filter(doctor => 
            relevantSpecializations.has(doctor.specialization)
        );

        return filteredDoctors;
    };

    const handleFilterClick = () => {
        const filteredDoctors = filterDoctorsBySymptoms(selectedSymptoms);
        setDoctors(filteredDoctors);
        setIsFiltered(true);
    };

    const handleShowAllDoctors = () => {
        setDoctors(allDoctors);
        setIsFiltered(false);
        setSelectedSymptoms([]);
    };

    const handleSymptomChange = (selected) => {
        const values = selected ? selected.map(opt => opt.value) : [];
        setSelectedSymptoms(values);
        // Don't automatically filter, let user click filter button
    };

    return (
        <div className="min-h-screen bg-medical-light py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-3 rounded-full text-sm font-medium mb-6">
                        <Stethoscope className="w-5 h-5" />
                        <span>Find Your Perfect Doctor</span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Book Your <span className="text-gradient-medical">Appointment</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Select your symptoms and find the right specialist for your healthcare needs. 
                        Our advanced matching system connects you with expert doctors.
                    </p>
                </div>

                {/* Filter Section */}
                <div className="medical-card max-w-4xl mx-auto p-8 rounded-3xl shadow-xl mb-12">
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                                Select Your Symptoms
                            </h2>
                            <p className="text-gray-600">
                                Choose one or more symptoms to find relevant doctors
                            </p>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-6 items-end">
                            <div className="flex-1">
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    <Search className="w-4 h-4 inline mr-2" />
                                    Symptoms (Multi-select)
                                </label>
                                <Select
                                    isMulti
                                    options={symptoms.map(symptom => ({ value: symptom, label: symptom }))}
                                    value={selectedSymptoms.map(symptom => ({ value: symptom, label: symptom }))}
                                    onChange={handleSymptomChange}
                                    className="medical-input"
                                    placeholder="Select symptoms..."
                                    styles={{
                                        control: (provided) => ({
                                            ...provided,
                                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                            border: '2px solid #e5e7eb',
                                            borderRadius: '12px',
                                            minHeight: '50px',
                                            boxShadow: 'none',
                                            '&:hover': {
                                                borderColor: '#3b82f6'
                                            }
                                        }),
                                        option: (provided, state) => ({
                                            ...provided,
                                            backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#eff6ff' : 'white',
                                            color: state.isSelected ? 'white' : '#374151',
                                            padding: '12px 16px'
                                        }),
                                        multiValue: (provided) => ({
                                            ...provided,
                                            backgroundColor: '#3b82f6',
                                            borderRadius: '8px'
                                        }),
                                        multiValueLabel: (provided) => ({
                                            ...provided,
                                            color: 'white'
                                        })
                                    }}
                                />
                            </div>
                            
                            <button
                                onClick={handleFilterClick}
                                className="btn-medical flex items-center justify-center space-x-2 px-8 py-4 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group min-w-[180px]"
                            >
                                <Filter className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span>Filter Doctors</span>
                            </button>
                        </div>
                        
                        {/* Show "Show All Doctors" button when filtered */}
                        {isFiltered && (
                            <div className="text-center">
                                <button
                                    onClick={handleShowAllDoctors}
                                    className="flex items-center justify-center space-x-2 px-6 py-3 rounded-full border-2 border-gray-300 text-gray-600 font-semibold hover:bg-gray-50 transition-all duration-300 group mx-auto"
                                >
                                    <Users className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    <span>Show All Doctors</span>
                                </button>
                            </div>
                        )}
                        
                        {/* Status indicator */}
                        <div className="text-center">
                            <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                                {isFiltered ? (
                                    selectedSymptoms.length > 0 ? (
                                        <>
                                            <Search className="w-4 h-4" />
                                            <span>Showing doctors for: {selectedSymptoms.join(', ')}</span>
                                        </>
                                    ) : (
                                        <>
                                            <Users className="w-4 h-4" />
                                            <span>Showing all available doctors</span>
                                        </>
                                    )
                                ) : (
                                    <>
                                        <Users className="w-4 h-4" />
                                        <span>Showing all available doctors</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Results Section */}
                <div className="space-y-8">
                    <div className="text-center">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                            Available Doctors
                        </h3>
                        <p className="text-gray-600">
                            {doctors.length} doctor{doctors.length !== 1 ? 's' : ''} found
                        </p>
                    </div>
                    
                    {doctors.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {doctors.map((doctor) => (
                                <div key={doctor._id} className="medical-card p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                                    <Card doctor={doctor} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="bg-white rounded-3xl p-12 shadow-lg max-w-md mx-auto">
                                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full p-6 w-20 h-20 mx-auto mb-6">
                                    <Search className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Doctors Available</h3>
                                {isFiltered && selectedSymptoms.length > 0 && (
                                    <p className="text-gray-600 mb-6">
                                        No doctors found for the selected symptoms. Try different symptoms or show all doctors.
                                    </p>
                                )}
                                <button
                                    onClick={handleShowAllDoctors}
                                    className="btn-medical flex items-center justify-center space-x-2 px-6 py-3 rounded-full text-white font-semibold"
                                >
                                    <Users className="w-4 h-4" />
                                    <span>Show All Doctors</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BookAppointment