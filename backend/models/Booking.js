const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    rentId: {
        type: mongoose.Types.ObjectId,
        ref: "Rent",
      },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    fullName: {
      type: String,
      required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    bookAt: {
      type: Date,
      required: true,
  },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;