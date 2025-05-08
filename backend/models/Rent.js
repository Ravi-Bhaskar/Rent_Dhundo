const mongoose = require("mongoose");

const RentSchema = new mongoose.Schema(
  {
    currentOwner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    propertyType: {
      type: String,
      required: true,
    },
    bed: {
      type: Number,
      required: true,
      min: 1,
    },
    bath: {
      type: Number,
      required: true,
      min: 1,
    },
    photo: {
      type: [],
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    area: {
      type: Number,
      required: true,
    },
    availableFor: {
      type: String,
      required: true,
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review",
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Rent = mongoose.model("Rent", RentSchema);
module.exports = Rent;