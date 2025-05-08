const express = require('express');
const { deleteUser, getAllUser, getSingleUser, updateUser } = require('../controllers/userController');
const router = express.Router();


const { verifyAdmin, verifyUser } = require('../utils/verifyToken');

//update user
router.put("/:id", verifyUser, updateUser);

//delete user
router.delete("/:id", verifyUser, deleteUser);

//get Single user
router.get("/:id", verifyUser, getSingleUser);

//get all users
router.get("/", verifyAdmin, getAllUser);

module.exports = router;

