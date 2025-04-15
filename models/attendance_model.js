// const mongoose = require("mongoose")

// const schema = mongoose.Schema

// const attendance_schema = new schema(
//     {
//         email:{type:String,required:true,ref:"user"},
//         date : {type:String,required:true},
//         time: {type:String,required:true}
//     }
// )


// module.exports = mongoose.model("Attendance",attendance_schema)

// const mongoose = require("mongoose")

// const Schema = mongoose.Schema

// const attendanceSchema = new Schema(
//     {
//         email: {type: String, required: true, ref: "user"},
//         date: {type: String, required: true},
//         time: {type: String, required: true}
//     },
//     { timestamps: false }
// )

// module.exports = mongoose.model("Attendance", attendanceSchema)



const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const attendanceSchema = new Schema(
    {
        userEmail: { type: String, required: true, ref: "User" }, // Reference to the user model
        attendanceDate: { type: Date, required: true }, // Use Date type for better date handling
        userId: { type: Schema.Types.ObjectId, required: true, ref: "User" }, // Reference to user ID for better tracking
        status: { type: String, enum: ["present", "absent"], required: true, default: "present" } // Optional: Track attendance status (present/absent)
    },
    { timestamps: true } // Optional: add createdAt and updatedAt fields
);

module.exports = mongoose.model("Attendance", attendanceSchema);