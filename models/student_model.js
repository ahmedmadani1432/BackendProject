// const mongoose = require("mongoose")

// const schema = mongoose.Schema

// const student_schema = new schema(
//     {
//         name: {type:String,required:true},
//         rollno:{type:Number,required:true},
//         age:{type:Number},
//         fname:{type:String,required:true},
//         fphno:{type:Number,required:true},
//         center:{type:mongoose.Schema.Types.ObjectId, ref: "center",required:true},
//         tutor:{type:mongoose.Schema.Types.ObjectId, ref: "user",required:true}
//     },
//     {timestamps:true}
// )

// module.exports = mongoose.model("Student",student_schema)

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema(
    {
        fullName: { type: String, required: true },
        rollNumber: { type: Number, required: true },
        age: { type: Number },
        fatherName: { type: String, required: true },
        fatherPhoneNumber: { type: Number, required: true },
        center: { type: mongoose.Schema.Types.ObjectId, ref: "Center", required: true },
        tutor: { type: mongoose.Schema.Types.ObjectId, ref: "Tutor", required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
