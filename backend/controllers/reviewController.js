const Rent = require("../models/Rent");
const Review = require("../models/Review");

exports.createReview = async(req, res) => {
    const rentId = req.params.rentId;
    const newReview = new Review({...req.body});
    try {
        const savedReview = await newReview.save();

        //after creating a new review now update the reviews array of the rent
        await Rent.findByIdAndUpdate(rentId,{
            $push: {reviews: savedReview._id},
        });

        res.status(200).json({success:true, message:"Review submitted", data:savedReview});
    } catch (err) {
        res.status(500).json({success:false, message:"failed to submit"});
    }
};