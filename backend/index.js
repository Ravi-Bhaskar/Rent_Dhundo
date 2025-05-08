const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require("path");

const rentRoute = require('./routes/rents');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const reviewRoute = require('./routes/reviews');
const bookingRoute = require('./routes/bookings');

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
    origin:"http://localhost:3000",
    credentials:true,
};

//database connection
mongoose.set('strictQuery', false);
const connect = async()=> {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log('MongoDB database connected');
    } catch (err) {
        console.log('MongoDB database connection failed');
    }
};

// middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/rents', rentRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/review', reviewRoute);
app.use('/api/v1/booking', bookingRoute);
app.use("/rent-images",express.static(path.join(__dirname, 'public/rent-images')));

// app.use((err, req, res, next) => {
//     if (err instanceof multer.MulterError) {
//       console.error("Multer Error:", err);
//       return res.status(400).json({ message: err.message });
//     }
//     next(err);
//   });

app.listen(port, () => {
    connect();
    console.log('server listening on port', port);
})