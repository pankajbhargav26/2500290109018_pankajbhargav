
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();


connectDB();




app.use(express.json());
app.use(cors());
app.use(helmet());


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20
});

app.use("/api/auth", limiter);

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/vehicles", require("./routes/vehicleRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));


app.get("/", (req, res) => {
    res.send("RentEase Backend Running");
});


app.use(errorHandler);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
