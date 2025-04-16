


const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentAttendanceSchema = new Schema(
    {
        studentId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Student" },
        attendanceDate: { type: Date, required: true },
        status: { type: String, enum: ["present", "absent"], required: true, default: "present" }
    },
    { timestamps: true }
);

module.exports = mongoose.model("StudentAttendance", studentAttendanceSchema);
