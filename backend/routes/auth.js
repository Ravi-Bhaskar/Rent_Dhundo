const express = require('express');
const { login, register, logoutUser } = require("../controllers/authController");
const { getMyProfile } = require("../controllers/userController");
const router = express.Router();
const { verifyToken } = require('../utils/verifyToken');

// register
router.post('/register', register);

// login
router.post('/login', login);


router.get("/me", verifyToken, getMyProfile);

router.post("/logout", logoutUser);

module.exports = router;