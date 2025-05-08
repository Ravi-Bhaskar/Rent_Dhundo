const express = require("express");
const multer = require("multer");
const { verifyAdmin, verifyUser, verifyToken } = require("../utils/verifyToken");
const { createRent, getSingleRent, getAllRent, getRentBySearch, getFeaturedRent, getRentCount, getMyProperties, deleteProperty, updateProperty, getPropertyById } = require("../controllers/rentController");

const router = express.Router();

// Storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "./public/rent-images"; // Ensure this path is correct
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, `image-${Date.now()}-${file.originalname}`);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only jpg, png, and jpeg formats are allowed"));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// Create a new rent listing
router.post("/", verifyUser, upload.array("photos", 3), async (req, res) => {
  try {
    if (req.files.length > 3) {
      return res.status(400).json({ success: false, message: "You can upload a maximum of 3 images." });
    }

    await createRent(req, res);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// Get all rents
router.get("/", getAllRent);

// Get rent listings by search query
router.get("/search/getRentBySearch", getRentBySearch);

// Get featured rent listings
router.get("/search/getFeaturedRents", getFeaturedRent);

// Get rent count
router.get("/search/getRentCount", getRentCount);

// Get my properties (owner-specific)
router.get('/myProperties', verifyUser, getMyProperties);

// Delete a property (owner-specific)
router.delete("/delete/:id", verifyUser, deleteProperty);

// Update a property (owner-specific)
router.put("/update/:id", verifyUser, upload.array("photos", 5), updateProperty);

// Get (view) a single property by owner
router.get("/view/:id", getPropertyById);

// Get a single rent listing
router.get("/:id", getSingleRent);

module.exports = router;
