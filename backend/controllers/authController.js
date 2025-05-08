const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//user registration
exports.register = async(req, res) => {
    try {

        //hashing password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            photo: req.body.photo,
        });

        await newUser.save();

        res.status(200).json({success:true, message:"Successfully Created"});
    } catch (err) {
        res.status(500).json({success:false, message:"Failed to Create. Try again"});
    }
};

//user login
exports.login = async(req, res) => {
    const email = req.body.email;
    try {
        const user = await User.findOne({email});

        //if user doesn't exist
        if(!user){
            return res.status(404).json({success:false, message:"User not found"});
        }

        //if user is exist then check the password or compare the password
        const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password);

        //if password is incorrect 
        if(!checkCorrectPassword){
            return res.status(401).json({success:false, message:"Incorrect email or password"});
        }

        const {password, role, ...rest} = user._doc;

        //create jwt token
        const token = jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET_KEY,{ expiresIn:'15d' });

        //set token in the browser cookies and send the response to the client
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax", 
            maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
        }).status(200).json({token, data:{...rest}, role,});
    } catch (err) {
        res.status(500).json({success:false, message:"Failed to login"});
    }
};

exports.logoutUser = (req, res) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // or "none" if cross-site
    });
  
    res.status(200).json({ success: true, message: "Logged out successfully" });
  };