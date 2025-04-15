// const mongoose = require("mongoose");

// const schema = mongoose.Schema;

// const center_schema = new schema(
//     {
//         center: {type: String, required: true},
//         centerCode: {type:String,required:true},
//         city:{type:String,required:true},
//         location: {type:String, required:true},
//         postalCode:{type:Number,required:true},
//         contactPerson:{type:String,required:true},
//         contactNumber : {type : Number, required: true},
//         centerImages:{type:[String], required:true}
//     },
//     {timestamps: true}
// )

// module.exports = mongoose.model("center",center_schema);

// const mongoose = require("mongoose");

// const Schema = mongoose.Schema;

// const masjidSchema = new Schema(
//     {
//         masjidName: {type: String, required: true},
//         masjidCode: {type: String, required: true},
//         city: {type: String, required: true},
//         address: {type: String, required: true},
//         pinCode: {type: Number, required: true},
//         imam: {type: String, required: true},
//         contactNo: {type: Number, required: true}
//     },
//     {timestamps: true}
// )

// module.exports = mongoose.model("masjid", masjidSchema);

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const centerSchema = new Schema(
    {
        center: { type: String, required: true }, // Name of the center
        // centerCode: { type: String, required: true, unique: true }, // Unique center code
        city: { type: String, required: true }, // City where the center is located
        location: { type: String, required: true }, // A more specific address or location
        postalCode: { type: String, required: true }, // Changed to String to accommodate all formats
        contactPerson: { type: String, required: true }, // Name of the contact person
        contactNumber: { type: String, required: true }, // Changed to String for better phone number handling
        // centerImages: { type: [String], required: true } // Array of image URLs
    },
    { timestamps: true } // Automatically add createdAt and updatedAt fields
);

module.exports = mongoose.model("Center", centerSchema); // Use "Center" for the model name (keeping it singular is a convention)