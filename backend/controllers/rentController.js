const Rent = require("../models/Rent");
const fs = require('fs');
const path = require('path');

//create new rent
exports.createRent = async (req, res) => {
  // console.log("file: ", req.files);

  try {
    const {
      city,
      state,
      address,
      propertyType,
      bed,
      bath,
      desc,
      price,
      area,
      availableFor,
    } = req.body;

    const photoFilenames = req.files?.map((file) => file.filename) || [];

    const newRent = new Rent({
      currentOwner: req.user.id,
      city,
      state,
      address,
      propertyType,
      bed: parseInt(bed),
      bath: parseInt(bath),
      photo: photoFilenames,
      desc,
      price: parseFloat(price),
      area: parseFloat(area),
      availableFor,
    });

    const savedRent = await newRent.save();
    res
      .status(201)
      .json({ message: "Property Created Successfully", savedRent });
  } catch (err) {
    console.error("Create Rent Error:", err);
    res.status(500).json({ message: "Failed to create rent." });
  }
};

//getSingle rent
exports.getSingleRent = async (req, res) => {
  const id = req.params.id;

  try {
    const rent = await Rent.findById(id)
      .populate("currentOwner", "-password")
      .populate("reviews");

    res
      .status(200)
      .json({ success: true, message: "Successfully Found", data: rent });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not Found" });
  }
};

//update rent
// exports.updateRent = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const updatedRent = await Rent.findByIdAndUpdate(
//       id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );

//     res
//       .status(200)
//       .json({
//         success: true,
//         message: "Successfully Updated",
//         data: updatedRent,
//       });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "failed to update" });
//   }
// };

//delete rent
// exports.deleteRent = async (req, res) => {
//   const id = req.params.id;

//   try {
//     await Rent.findByIdAndDelete(id);

//     res.status(200).json({ success: true, message: "Successfully Deleted" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "failed to delete" });
//   }
// };

//getAll rent
// export const getAllRent = async(req, res) => {

//     //for pagination
//     const page = parseInt(req.query.page);

//     try {

//         const rents = await Rent.find({}).populate("currentOwner", '-password').populate('reviews').skip(page * 9).limit(9);

//         res.status(200).json({success:true, count:rents.length, message:"Successfully Found", data:rents,});
//     } catch (err) {
//         res.status(404).json({success:false, message:"Not Found",});
//     }
// };

exports.getAllRent = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const { city, state, propertyType, bed, bath, priceMin, priceMax } = req.query;

  const filters = {};

  if (city) filters.city = city;
  if (state) filters.state = state;
  if (propertyType) filters.propertyType = propertyType;
  if (bed) filters.bed = parseInt(bed); // ✨ Exact bed match
  if (bath) filters.bath = parseInt(bath); // ✨ Exact bath match
  if (priceMin && priceMax) {
    filters.price = { $gte: parseInt(priceMin), $lte: parseInt(priceMax) };
  } else if (priceMin) {
    filters.price = { $gte: parseInt(priceMin) };
  } else if (priceMax) {
    filters.price = { $lte: parseInt(priceMax) };
  }

  try {
    const rents = await Rent.find(filters)
      .populate("currentOwner", "-password")
      .populate("reviews")
      .skip(page * 9)
      .limit(9);

    const rentCount = await Rent.countDocuments(filters);

    res.status(200).json({
      success: true,
      count: rents.length,
      totalCount: rentCount,
      message: "Successfully Found",
      data: rents,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not Found" });
  }
};

//get rent by search
exports.getRentBySearch = async (req, res) => {
  //here 'i' means case sensitive
  const city = new RegExp(req.query.city, "i");

  try {
    const rents = await Rent.find({ city })
      .populate("currentOwner", "-password")
      .populate("reviews");

    res.status(200).json({
      success: true,
      count: rents.length,
      message: "Successfully Found",
      data: rents,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not Found" });
  }
};

//get featured rent
exports.getFeaturedRent = async (req, res) => {
  try {
    const rents = await Rent.find({ featured: true })
      .populate("currentOwner", "-password")
      .populate("reviews")
      .limit(9);

    res.status(200).json({
      success: true,
      count: rents.length,
      message: "Successfully Found",
      data: rents,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not Found" });
  }
};

//get rent counts
exports.getRentCount = async (req, res) => {
  try {
    const rentCount = await Rent.estimatedDocumentCount();

    res.status(200).json({ success: true, data: rentCount });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch" });
  }
};

// USER CREATED RENT ------- CRUD
// Get Properties by Current Owner
exports.getMyProperties = async (req, res) => {
  console.log("User ID:", req.user.id); // Log user ID

  try {
    const myProperties = await Rent.find({ currentOwner: req.user.id });
    if (myProperties.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No properties found for this user",
      });
    }
    res.status(200).json(myProperties);
  } catch (err) {
    console.error("Get My Rents Error: ", err);
    res.status(500).json({
      message: "Failed to fetch your properties.",
    });
  }
};

// Delete Rent
exports.deleteProperty = async (req, res) => {
  const propertyId = req.params.id;
  try {
    const property = await Rent.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property Not Found." });
    }

    if (property.currentOwner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized." });
    }

    // Delete associated images
    property.photo.forEach((filename) => {
      const filePath = path.join(__dirname, "../public/uploads", filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });

    await Rent.findByIdAndDelete(propertyId);
    res.status(200).json({ message: "Property deleted successfully." });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ message: "Failed to delete property." });
  }
};


//Update Property
exports.updateProperty = async (req, res) => {
  const propertyId = req.params.id;

  try {
    const property = await Rent.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found." });
    }

    if (property.currentOwner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized." });
    }

    // If new photos are uploaded
    if (req.files && req.files.length > 0) {
      // Delete old photos from server
      property.photo.forEach((filename) => {
        const filePath = path.join(__dirname, "../public/uploads", filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });

      // Update photo array
      req.body.photo = req.files.map((file) => file.filename);
    }

    const updatedProperty = await Rent.findByIdAndUpdate(propertyId, req.body, {
      new: true,
    });

    res.status(200).json(updatedProperty);
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ message: "Failed to update property." });
  }
};

//view single Rent
exports.getPropertyById = async (req, res) => {
  const propertyId = req.params.id;
  try {
    const property = await Rent.findById(propertyId).populate(
      "currentOwner",
      "name email"
    );
    if (!property)
      return res.status(404).json({
        message: "Property not found.",
      });

    res.status(200).json(property);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching property.",
    });
  }
};
