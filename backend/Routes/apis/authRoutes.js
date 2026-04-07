const express = require('express');
const {login,register, addAdmin} = require('../../Controllers/authControllers');
const { authenticateJWT } = require('../../Middleware/authMiddleware');
const UserModel = require("../../Models/UserModel");

const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.get("/me", authenticateJWT, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id).select("userName email roles");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
// router.post('/addAdmin',authentcateJWT,checkRole('isAdmin'),addAdmin);
router.post('/addAdmin',addAdmin);

module.exports = router;


