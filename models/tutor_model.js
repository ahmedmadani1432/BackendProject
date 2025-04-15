

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tutorSchema = new Schema(
    {
        fullName: { type: String, required: true },
        tutorId: { type: Number, required: true },
        phoneNumber: { type: Number, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        center: { type: mongoose.Schema.Types.ObjectId, ref: "Center", required: true },
        teachingHours: { type: String, required: true },
        subjectExpertise: { type: String, required: true },
        // documentPath: { type: String } // Uncomment if you later want to store tutor documents
    },
    { timestamps: true }
);

module.exports = mongoose.model("Tutor", tutorSchema);
