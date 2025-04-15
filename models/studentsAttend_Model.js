// const mongoose = require("mongoose");

// const Schema = mongoose.Schema;

// const studentSchema = new Schema(
//     {
//         fullName: { type: String, required: true },
//         rollNumber: { type: Number, required: true },
//         age: { type: Number },
//         fatherName: { type: String, required: true },
//         fatherPhoneNumber: { type: Number, required: true },
//         center: { type: mongoose.Schema.Types.ObjectId, ref: "Center", required: true },
//         tutor: { type: mongoose.Schema.Types.ObjectId, ref: "Tutor", required: true }
//     },
//     { timestamps: true }
// );

// module.exports = mongoose.model("Student", studentSchema);


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
