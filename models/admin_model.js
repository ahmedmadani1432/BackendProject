

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminSchema = new Schema(
    {
        fullName: { type: String, required: true },
        userEmail: { type: String, required: true },
        phoneNumber: { type: Number, required: true },
        userPassword: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);