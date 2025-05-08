const express = require('express');
const { createReview } = require('../controllers/reviewController');
const { verifyUser } = require('../utils/verifyToken');

const router = express.Router();

router.post('/:rentId', verifyUser, createReview );

module.exports = router;