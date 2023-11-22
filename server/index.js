const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("DB Connetion Successfull");
    })
    .catch((err) => {
        console.log(err.message);
    });


app.use("/api/auth", require('./routes/authRoutes'));
app.use("/api/quiz", require('./routes/quizRoutes'));
app.use("/api/announcements", require('./routes/announcementRoutes'));

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error"

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`server connected in a port ${process.env.PORT}`);
});