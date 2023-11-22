const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "name required"],
        },
        email: {
            type: String,
            required: [true, "email required"],
            unique: true,
            lowercase: true,
        },
        profileImg: String,

        password: {
            type: String,
            required: [true, "password required"],
            minlength: [6, "Too short password"],
        },

        role: {
            type: String,
            enum: ["user", "manager", "admin"],
            default: "user",
        },


    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 12);
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;