// const admin_Mdl = require("../models/admin_model")
// const tutor_Mdl = require("../models/tutor_model")
// const center_Mdl = require("../models/center_model")
// const attend_Mdl = require("../models/attend_model")
// const student_Mdl = require("../models/student_model")
// const { responseGenerator,hashPassword,comparePassword,generateTokens } = require("../utils/util");



// const login = async(req,res) => {
//     try {
//         const { email,password } = req.body;
//         const admin = await admin_Mdl.findOne({email}).lean()
//         if(admin){
//             const isPasswordMatches = comparePassword(password,admin.password);
//             if(isPasswordMatches){
//                 const tokens = generateTokens({email, name:admin.name, id:admin.id,})
//                 res.status(200).json({
//                     message : "Admin LoggedIn sucesscully ...!!!!",
//                     success : true,
//                     data : {
//                         name : admin.name,
//                         id : admin.id,
//                         tokens
//                     }
//                 })
//             }
//         }else{
//         res.status(401).json({success: false, message: "Invalid email or password ....!!!!"})
//         }
//     } catch (err) {
//         console.log(err)
//         let resp = responseGenerator(false);
//         res.status(404).json(resp)
//     }
// }


// const dashboard = async(req,res) => {
//     try {
//         const center = await center_Mdl.find()
//         const user = await tutor_Mdl.find()
//         res.status(200).json({center,user})
//     } catch (err) {
//         console.log(err)
//         let resp = responseGenerator(false);
//         res.status(404).json(resp)
//     }
// }

// const addCenter = async(req,res) => {
//     try {
//         const data = req.body
//         // data.centerImages = req.files.map(file => file.path)
//         const center = new center_Mdl(data)
//         await center.save();
//         let resp = responseGenerator(true, "Center created successfully ....!!!", center)
//         res.status(200).json(resp)
//     } catch (err) {
//         console.log(err);
//         let resp = responseGenerator(false);
//         res.status(404).json(resp)
//     }
// }

// const getUsersList = async(req,res) => {
//     try {
//         const users = await tutor_Mdl.find().populate("center","center location contact -_id")
//         let resp = responseGenerator(true,"Here is the List of users ...!!!",users)
//         res.status(200).json(resp)
//     } catch (err) {
//         console.log(err);
//         let resp = responseGenerator(false);
//         res.status(404).json(resp)
//     }
// }


// const getusersbyCenterid = async(req,res) => {
//     try {
//         const c_id = req.params.id;
//         const users = await tutor_Mdl.find({center: c_id}).populate("center","center location contact")
//         if(users.length==0){
//             let resp = responseGenerator(false,"No users in this center ...!!!!");
//             res.status(404).json(resp)
//         }
//         let resp = responseGenerator(true,"Here is the list of the users of the given centerId...!!!",users)
//         res.status(200).json(resp)
//     } catch (err) {
//         console.log(err);
//         let resp = responseGenerator(false);
//         res.status(404).json(resp)
//     }
// }


// const deleteUser = async(req,res) => {
//     try {
//         const user_email = req.body.email
//         const user =await tutor_Mdl.findOne({email:user_email})
//         if(user){
//             await tutor_Mdl.deleteOne(user);
//             var resp = responseGenerator(true,"User deleted successfully ....!!!", tutor_Mdl);
//             res.status(202).json(resp)
//         }else{
//             throw new Error("User doesnt exist with this email ...!!!!")
//         }
//     } catch (err) {
//         console.log(err)
//         let resp = responseGenerator(false);
//         res.status(404).json(resp)
//     }
// }



// const getallcenters = async(req,res) => {
//     try {
//         const allCenters = await center_Mdl.find().populate()
//         let resp = responseGenerator(true,"Here is the list of centers ...!!!",allCenters)
//         res.status(200).json(resp)
//     } catch (err) {
//         console.log(err);
//         let resp = responseGenerator(false);
//         res.status(404).json(resp)
//     }
// }


// const attedanceList = async(req,res) => {
//     try {
//         const attedance = await attend_Mdl.find()
//         let resp = responseGenerator(true,"Attendance list ....!!!",attedance)
//         res.status(200).json(resp)
//     } catch (err) {
//         console.log(err)
//         let resp = responseGenerator(false);
//         res.status(404).json(resp)
//     }
// }

// const attedanceHistory = async(req,res) => {
//     try {
//         const email = req.body.email
//         const history = await attend_Mdl.find({email}).sort({date: 1})
//         if(history.length!=0){
//             let resp = responseGenerator(true,"Here is the attendance history of the tutor ...!!!",history)
//             res.status(200).json(resp)
//         }else{
//             res.status(200).json("No attendance history of this tutor...!!!")
//         }
//     } catch (err) {
//         console.log(err)
//         let resp = responseGenerator(false);
//         res.status(404).json(resp)
//     }
// }


// const deleteAttendance = async(req,res) => {
//     try {
//         const userEmail = req.body.email
//         await attend_Mdl.findOneAndDelete({email:userEmail})
//         let resp = responseGenerator(true,"Attendance deleted successfully ...!!!!",attend_Mdl)
//         res.status(200).json(resp)
//     } catch (err) {
//         console.log(err)
//         let resp = responseGenerator(false);
//         res.status(404).json(resp)
//     }
// }



// const register = async(req,res) => {
//     try {
//         const data = req.body;
//         const admin = new admin_Mdl(data);
//         await admin.save();
//         let resp = responseGenerator(true, "Admin successfully created ...!!!!",admin)
//         res.status(200).json(resp)
//     } catch (err) {
//         console.log(err)
//         let resp = responseGenerator(false);
//         res.status(404).json(resp)
//     }
// }


// const getAllStudentsAtCenter = async(req,res) => {
//     try {
//         const c_id = req.params.id
//         const students = await student_Mdl.find({center:c_id}).populate("center","center location contact")
//         if(student_Mdl.length==0){
//             let resp = responseGenerator(true,"No students at this center...!!!")
//             res.status(200).json(resp)
//         }
//         let resp = responseGenerator(true,"Here is the list of students that are studing at the given center....!!!!",students)
//         res.status(200).json(resp)
//     } catch (err) {
//         console.log(err)
//         let resp = responseGenerator(false);
//         res.status(404).json(resp)
//     }
// }

// const getAllStudentsByTutor = async(req,res) => {
//     try {
//         const t_id = req.params.id
//         const students = await student_Mdl.find({tutor:t_id}).populate("tutor","name email")
//         if(students.length==0){
//             let resp = responseGenerator(true,"No Students under this tutor...!!!")
//             res.status(404).json(resp)
//         }
//         let resp = responseGenerator(true,"Here is the list of the students under  this tutor....!!!!",students)
//         res.status(200).json(resp)
//     } catch (err) {
//         console.log(err)
//         let resp = responseGenerator(false);
//         res.status(404).json(resp)
//     }
// }

// const  allStudents = async(req,res) => {
//     try {
//         const students = await student_Mdl.find()
//         if(students.length==0){
//             let resp = responseGenerator(true,"No Students joined yet...!!!!")
//             res.status(200).json(resp)
//         }
//         let resp = responseGenerator(true,"Here is the list of all the students ...!!!!",students)
//         res.status(200).json(resp)
//     } catch (err) {
//         console.log(err)
//         let resp = responseGenerator(false);
//         res.status(404).json(resp)
//     }
// }

// module.exports = {
//     register,
//     login,
//     getUsersList,
//     addCenter,
//     deleteUser,
//     attedanceList,
//     allStudents,
//     attedanceHistory,
//     deleteAttendance,
//     getallcenters,
//     getusersbyCenterid,
//     getAllStudentsAtCenter,
//     getAllStudentsByTutor,
//     dashboard
// }




// const admin_Mdl = require("../models/admin_model");
// const tutor_Mdl = require("../models/tutor_model");
// const center_Mdl = require("../models/center_model");
// const attend_Mdl = require("../models/attendance_model"); // Renamed to match your new file
// const student_Mdl = require("../models/student_model"); // Renamed to match your new file
// const { responseGenerator, hashPassword, comparePassword, generateTokens } = require("../utils/util");

// const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const admin = await admin_Mdl.findOne({ userEmail: email }).lean(); // Updated to match schema
//         if (admin) {
//             const isPasswordMatches = comparePassword(password, admin.userPassword); // Updated to match schema
//             if (isPasswordMatches) {
//                 const tokens = generateTokens({ email, name: admin.fullName, id: admin._id }); // Updated to match schema
//                 res.status(200).json({
//                     message: "Admin LoggedIn successfully ...!!!!",
//                     success: true,
//                     data: {
//                         name: admin.fullName, // Updated to match schema
//                         id: admin._id,
//                         tokens
//                     }
//                 });
//             } else {
//                 res.status(401).json({ success: false, message: "Invalid email or password ....!!!!" });
//             }
//         } else {
//             res.status(401).json({ success: false, message: "Invalid email or password ....!!!!" });
//         }
//     } catch (err) {
//         console.log(err);
//         let resp = responseGenerator(false);
//         res.status(404).json(resp);
//     }
// };

// const dashboard = async (req, res) => {
//     try {
//         const centers = await center_Mdl.find();
//         const users = await tutor_Mdl.find();
//         res.status(200).json({ centers, users });
//     } catch (err) {
//         console.log(err);
//         let resp = responseGenerator(false);
//         res.status(404).json(resp);
//     }
// };

// const addCenter = async (req, res) => {
//     try {
//         const data = req.body;
//         const center = new center_Mdl(data);
//         await center.save();
//         let resp = responseGenerator(true, "Center created successfully ....!!!", center);
//         res.status(200).json(resp);
//     } catch (err) {
//         console.log(err);
//         let resp = responseGenerator(false);
//         res.status(404).json(resp);
//     }
// };

// const getUsersList = async (req, res) => {
//     try {
//         const users = await tutor_Mdl.find().populate("center", "center location contact -_id");
//         let resp = responseGenerator(true, "Here is the List of users ...!!!", users);
//         res.status(200).json(resp);
//     } catch (err) {
//         console.log(err);
//         let resp = responseGenerator(false);
//         res.status(404).json(resp);
//     }
// };

// const getUsersByCenterId = async (req, res) => {
//     try {
//         const c_id = req.params.id;
//         const users = await tutor_Mdl.find({ center: c_id }).populate("center", "center location contact");
//         if (users.length === 0) {
//             let resp = responseGenerator(false, "No users in this center ...!!!!");
//             res.status(404).json(resp);
//         } else {
//             let resp = responseGenerator(true, "Here is the list of the users of the given centerId...!!!", users);
//             res.status(200).json(resp);
//         }
//     } catch (err) {
//         console.log(err);
//         let resp = responseGenerator(false);
//         res.status(404).json(resp);
//     }
// };

// const deleteUser = async (req, res) => {
//     try {
//         const user_email = req.body.userEmail; // Changed to match incoming body param
//         const user = await tutor_Mdl.findOne({ userEmail: user_email }); // Updated to match schema
//         if (user) {
//             await tutor_Mdl.deleteOne(user);
//             var resp = responseGenerator(true, "User deleted successfully ....!!!", tutor_Mdl);
//             res.status(202).json(resp);
//         } else {
//             throw new Error("User doesn't exist with this email ...!!!!");
//         }
//     } catch (err) {
//         console.log(err);
//         let resp = responseGenerator(false);
//         res.status(404).json(resp);
//     }
// };

// const getAllCenters = async (req, res) => {
//     try {
//         const allCenters = await center_Mdl.find();
//         let resp = responseGenerator(true, "Here is the list of centers ...!!!", allCenters);
//         res.status(200).json(resp);
//     } catch (err) {
//         console.log(err);
//         let resp = responseGenerator(false);
//         res.status(404).json(resp);
//     }
// };

// const attendanceList = async (req, res) => {
//     try {
//         const attendance = await attend_Mdl.find().populate("userId", "fullName -_id"); // Populate student/tutor name
//         let resp = responseGenerator(true, "Attendance list ....!!!", attendance);
//         res.status(200).json(resp);
//     } catch (err) {
//         console.log(err);
//         let resp = responseGenerator(false);
//         res.status(404).json(resp);
//     }
// };

// const attendanceHistory = async (req, res) => {
//     try {
//         const email = req.body.userEmail; // Changed to match body param
//         const history = await attend_Mdl.find({ userEmail: email }).sort({ attendanceDate: 1 }); // Updated to match schema
//         if (history.length !== 0) {
//             let resp = responseGenerator(true, "Here is the attendance history of the tutor ...!!!", history);
//             res.status(200).json(resp);
//         } else {
//             res.status(200).json("No attendance history for this tutor...!!!");
//         }
//     } catch (err) {
//         console.log(err);
//         let resp = responseGenerator(false);
//         res.status(404).json(resp);
//     }
// };

// const deleteAttendance = async (req, res) => {
//     try {
//         const userEmail = req.body.userEmail; // Changed to match body param
//         await attend_Mdl.findOneAndDelete({ userEmail: userEmail });
//         let resp = responseGenerator(true, "Attendance deleted successfully ...!!!!", attend_Mdl);
//         res.status(200).json(resp);
//     } catch (err) {
//         console.log(err);
//         let resp = responseGenerator(false);
//         res.status(404).json(resp);
//     }
// };

// const register = async (req, res) => {
//     try {
//         const data = req.body;
//         const admin = new admin_Mdl(data);
//         await admin.save();
//         let resp = responseGenerator(true, "Admin successfully created ...!!!!", admin);
//         res.status(200).json(resp);
//     } catch (err) {
//         console.log(err);
//         let resp = responseGenerator(false);
//         res.status(404).json(resp);
//     }
// };

// const getAllStudentsAtCenter = async (req, res) => {
//     try {
//         const c_id = req.params.id;
//         const students = await student_Mdl.find({ center: c_id }).populate("center", "center location contact");
//         if (students.length === 0) {
//             let resp = responseGenerator(true, "No students at this center...!!!");
//             res.status(200).json(resp);
//         } else {
//             let resp = responseGenerator(true, "Here is the list of students at the given center....!!!!", students);
//             res.status(200).json(resp);
//         }
//     } catch (err) {
//         console.log(err);
//         let resp = responseGenerator(false);
//         res.status(404).json(resp);
//     }
// };

// const getAllStudentsByTutor = async (req, res) => {
//     try {
//         const t_id = req.params.id;
//         const students = await student_Mdl.find({ tutor: t_id }).populate("tutor", "fullName email"); // Updated to match schema
//         if (students.length === 0) {
//             let resp = responseGenerator(true, "No Students under this tutor...!!!");
//             res.status(404).json(resp);
//         } else {
//             let resp = responseGenerator(true, "Here is the list of the students under this tutor....!!!!", students);
//             res.status(200).json(resp);
//         }
//     } catch (err) {
//         console.log(err);
//         let resp = responseGenerator(false);
//         res.status(404).json(resp);
//     }
// };

// const allStudents = async (req, res) => {
//     try {
//         const students = await student_Mdl.find();
//         if (students.length === 0) {
//             let resp = responseGenerator(true, "No Students joined yet...!!!!");
//             res.status(200).json(resp);
//         } else {
//             let resp = responseGenerator(true, "Here is the list of all the students ...!!!!", students);
//             res.status(200).json(resp);
//         }
//     } catch (err) {
//         console.log(err);
//         let resp = responseGenerator(false);
//         res.status(404).json(resp);
//     }
// };

// module.exports = {
//     register,
//     login,
//     getUsersList,
//     addCenter,
//     deleteUser,
//     attendanceList,
//     allStudents,
//     attendanceHistory,
//     deleteAttendance,
//     getAllCenters,
//     getUsersByCenterId,
//     getAllStudentsAtCenter,
//     getAllStudentsByTutor,
//     dashboard
// };


const admin_Mdl = require("../models/admin_model");
const tutor_Mdl = require("../models/tutor_model");
const center_Mdl = require("../models/center_model");
const attend_Mdl = require("../models/attendance_model");
const student_Mdl = require("../models/student_model");

const {
    responseGenerator,
    hashPassword,
    comparePassword,
    generateTokens
} = require("../utils/util");

const register = async (req, res) => {
    try {
        const admin = new admin_Mdl(req.body);
        await admin.save();
        res.status(200).json(responseGenerator(true, "Admin registered successfully!", admin));
    } catch (err) {
        console.error(err);
        res.status(500).json(responseGenerator(false));
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await admin_Mdl.findOne({ userEmail: email }).lean();
        if (admin && comparePassword(password, admin.userPassword)) {
            const tokens = generateTokens({
                email,
                name: admin.fullName,
                id: admin._id
            });
            return res.status(200).json({
                success: true,
                message: "Admin logged in successfully!",
                data: {
                    name: admin.fullName,
                    id: admin._id,
                    tokens
                }
            });
        }
        res.status(401).json({ success: false, message: "Invalid email or password" });
    } catch (err) {
        console.error(err);
        res.status(500).json(responseGenerator(false));
    }
};

const dashboard = async (req, res) => {
    try {
        const centers = await center_Mdl.find();
        const tutors = await tutor_Mdl.find();
        res.status(200).json({ centers, tutors });
    } catch (err) {
        console.error(err);
        res.status(500).json(responseGenerator(false));
    }
};

const addCenter = async (req, res) => {
    try {
        const center = new center_Mdl(req.body);
        await center.save();
        res.status(200).json(responseGenerator(true, "Center created successfully!", center));
    } catch (err) {
        console.error(err);
        res.status(500).json(responseGenerator(false));
    }
};

const getUsersList = async (req, res) => {
    try {
        const tutors = await tutor_Mdl.find().populate("center", "center location contact -_id");
        res.status(200).json(responseGenerator(true, "Tutors list fetched!", tutors));
    } catch (err) {
        console.error(err);
        res.status(500).json(responseGenerator(false));
    }
};

const getUsersByCenterId = async (req, res) => {
    try {
        const tutors = await tutor_Mdl.find({ center: req.params.id }).populate("center", "center location contact");
        const msg = tutors.length ? "Tutors in center fetched" : "No tutors found for this center";
        res.status(200).json(responseGenerator(true, msg, tutors));
    } catch (err) {
        console.error(err);
        res.status(500).json(responseGenerator(false));
    }
};

const getAllStudentsAtCenter = async (req, res) => {
    try {
        const students = await student_Mdl.find({ center: req.params.id }).populate("center", "center location contact");
        const msg = students.length ? "Students at center fetched" : "No students at this center";
        res.status(200).json(responseGenerator(true, msg, students));
    } catch (err) {
        console.error(err);
        res.status(500).json(responseGenerator(false));
    }
};

const getAllStudentsByTutor = async (req, res) => {
    try {
        const students = await student_Mdl.find({ tutor: req.params.id }).populate("tutor", "fullName email");
        const msg = students.length ? "Students under tutor fetched" : "No students found under this tutor";
        res.status(200).json(responseGenerator(true, msg, students));
    } catch (err) {
        console.error(err);
        res.status(500).json(responseGenerator(false));
    }
};

const allStudents = async (req, res) => {
    try {
        const students = await student_Mdl.find();
        const msg = students.length ? "All students fetched" : "No students yet";
        res.status(200).json(responseGenerator(true, msg, students));
    } catch (err) {
        console.error(err);
        res.status(500).json(responseGenerator(false));
    }
};

const attendanceList = async (req, res) => {
    try {
        const attendance = await attend_Mdl.find().populate("userId", "fullName -_id");
        res.status(200).json(responseGenerator(true, "All attendance records fetched", attendance));
    } catch (err) {
        console.error(err);
        res.status(500).json(responseGenerator(false));
    }
};

const attendanceHistory = async (req, res) => {
    try {
        const history = await attend_Mdl.find({ userEmail: req.body.userEmail }).sort({ attendanceDate: 1 });
        const msg = history.length ? "Attendance history found" : "No history for this tutor";
        res.status(200).json(responseGenerator(true, msg, history));
    } catch (err) {
        console.error(err);
        res.status(500).json(responseGenerator(false));
    }
};

const deleteUser = async (req, res) => {
    try {
        const { userEmail } = req.body;
        const tutor = await tutor_Mdl.findOne({ userEmail });
        if (!tutor) throw new Error("Tutor not found");
        await tutor_Mdl.deleteOne({ _id: tutor._id });
        res.status(200).json(responseGenerator(true, "Tutor deleted successfully"));
    } catch (err) {
        console.error(err);
        res.status(404).json(responseGenerator(false, err.message));
    }
};

const deleteAttendance = async (req, res) => {
    try {
        const { userEmail } = req.body;
        await attend_Mdl.findOneAndDelete({ userEmail });
        res.status(200).json(responseGenerator(true, "Attendance deleted"));
    } catch (err) {
        console.error(err);
        res.status(500).json(responseGenerator(false));
    }
};

const getAllCenters = async (req, res) => {
    try {
        const centers = await center_Mdl.find();
        res.status(200).json(responseGenerator(true, "All centers fetched", centers));
    } catch (err) {
        console.error(err);
        res.status(500).json(responseGenerator(false));
    }
};

module.exports = {
    register,
    login,
    dashboard,
    addCenter,
    getUsersList,
    getUsersByCenterId,
    getAllStudentsAtCenter,
    getAllStudentsByTutor,
    allStudents,
    attendanceList,
    attendanceHistory,
    deleteUser,
    deleteAttendance,
    getAllCenters
};
