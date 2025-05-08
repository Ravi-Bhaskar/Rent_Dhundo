const User = require('../models/User');


//create new user
exports.createUser = async (req, res) => {
    const newUser = new User(req.body);

    try {
        const savedUser = await newUser.save();

        res.status(200).json({success:true, message:"Successfully created", data: savedUser,});
    } catch (err) {
        res.status(500).json({success:false, message:"Failed to create. Try again"});
    }
}

//update user
exports.updateUser = async(req, res) => {

    const id = req.params.id
    try {

        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: req.body
        }, {new:true})

        res.status(200).json({success:true, message:"Successfully Updated", data: updatedUser,});

    } catch (err) {
        res.status(500).json({success:false, message:"failed to update",});
    }
};

//delete user
exports.deleteUser = async(req, res) => {
    const id = req.params.id

    try {

        await User.findByIdAndDelete(id);

        res.status(200).json({success:true, message:"Successfully Deleted",});

    } catch (err) {
        res.status(500).json({success:false, message:"failed to delete",});
    }
};

//getSingle user
exports.getSingleUser = async(req, res) => {
    const id = req.params.id
    
    try {

        const user = await User.findById(id);

        res.status(200).json({success:true, message:"Successfully Found", data:user,});

    } catch (err) {
        res.status(404).json({success:false, message:"Not Found",});
    }
};

//getAll user
exports.getAllUser = async(req, res) => {

    try {

        const users = await User.find({})

        res.status(200).json({success:true, message:"Successfully Found", data:users,});
    } catch (err) {
        res.status(404).json({success:false, message:"Not Found",});
    }
};

//get my profile
exports.getMyProfile = async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select('-password'); // exclude password
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, message: "Something went wrong" });
    }
};