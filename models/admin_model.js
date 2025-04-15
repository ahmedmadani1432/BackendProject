// const mongoose = require("mongoose")

// const schema = mongoose.Schema

// const admin_schema = new schema(
//     {
//         name : {type : String, required: true},
//         email:{type : String, required: true},
//         phno: {type: Number, required: true},
//         password : {type : String , required: true},
//     },
//     {timestamps:true}
// )

// module.exports = mongoose.model("admin",admin_schema)

// const mongoose = require("mongoose");

// const Schema = mongoose.Schema;

// const adminUserSchema = new Schema(
//   {
//     adminName: { type: String, required: true },
//     adminEmail: { type: String, required: true },
//     phoneNumber: { type: Number, required: true },
//     adminPassword: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("adminUser", adminUserSchema);

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