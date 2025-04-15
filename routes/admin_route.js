// const express = require("express")
// const admin_cntrls = require("../controllers/admin_cntrls")
// const tutor_cntrl = require("../controllers/tutor_cntrl")
// const { upload } = require("../utils/util")
// const router = express.Router()
// //posts
// router.post("/register",admin_cntrls.register)
// router.post("/login",admin_cntrls.login)
// router.post("/addCenter",admin_cntrls.addCenter)
// router.post("/addTutor",tutor_cntrl.signup)
// //get
// router.get("/dashboard",admin_cntrls.dashboard)
// router.get("/getuserbyCenterid/:id",admin_cntrls.getusersbyCenterid)
// router.get("/getallcenters",admin_cntrls.getallcenters)
// router.get("/getAllStudents",admin_cntrls.allStudents)
// router.get("/getAllStudentsAtCenter/:id",admin_cntrls.getAllStudentsAtCenter)
// router.get("/getAllStudentsByTutorId/:id",admin_cntrls.getAllStudentsByTutor)
// router.get("/getTutorsList",admin_cntrls.getUsersList)
// router.get("/attendanceOfAllStudents",tutor_cntrl.attedanceOfAllStudents)
// router.get("/attendanceHistoryOfStudent",tutor_cntrl.attedanceHistoryOfStudent)
// router.get("/attendanceListOfTutor",admin_cntrls.attedanceList)
// router.get("/attendanceHistoryOfTutor",admin_cntrls.attedanceHistory)
// //delete
// router.delete("/removeUser",admin_cntrls.deleteUser)
// router.delete("/deleteAttendance",admin_cntrls.deleteAttendance)


// module.exports=router

// // const express = require('express');
// // const admin_cntrls = require('../controllers/admin_cntrls');
// // const tutor_cntrls = require('../controllers/tutor_cntrl');
// // const {upload} = require('../utils/util')
// // const router = express.Router()



// const express = require("express")
// const admin_cntrls = require("../controllers/admin_cntrls")
// const tutor_cntrl = require("../controllers/tutor_cntrl")
// const { upload } = require("../utils/util")
// const router = express.Router()

// // POST routes
// router.post("/register", admin_cntrls.register)
// router.post("/login", admin_cntrls.login)
// router.post("/addCenter", admin_cntrls.addCenter)
// router.post("/addTutor", tutor_cntrl.signup)

// // GET routes
// router.get("/dashboard", admin_cntrls.dashboard)
// router.get("/getUserbyCenterid/:id", admin_cntrls.getUsersbyCenterid)
// router.get("/getAllcenters", admin_cntrls.getallcenters)
// router.get("/getAllStudents", admin_cntrls.allStudents)
// router.get("/getAllStudentsAtCenter/:id", admin_cntrls.getAllStudentsAtCenter)
// router.get("/getAllStudentsByTutorId/:id", admin_cntrls.getAllStudentsByTutor)
// router.get("/getTutorsList", admin_cntrls.getUsersList)
// // router.get("/attendanceOfAllStudents", tutor_cntrl.attedanceOfAllStudents)
// router.get("/attendanceOfAllStudents", tutor_cntrl.attendanceOfAllStudents); // Correct reference
// router.get("/attendanceHistoryOfStudent", tutor_cntrl.attendanceHistoryOfStudent)
// router.get("/attendanceListOfTutor", admin_cntrls.attendanceList)
// router.get("/attendanceHistoryOfTutor", admin_cntrls.attendanceHistory)

// // DELETE routes
// router.delete("/removeUser", admin_cntrls.deleteUser)
// router.delete("/deleteAttendance", admin_cntrls.deleteAttendance)

// module.exports = router

const express = require("express");
const adminCntrl = require("../controllers/admin_cntrls");
const tutorCntrl = require("../controllers/tutor_cntrl");

const router = express.Router();

// Admin Auth
router.post("/register", adminCntrl.register);
router.post("/login", adminCntrl.login);

// Center and Tutor Management
router.post("/addCenter", adminCntrl.addCenter);
router.post("/addTutor", tutorCntrl.signup);

// Dashboard
router.get("/dashboard", adminCntrl.dashboard);

// Center Info
router.get("/getAllCenters", adminCntrl.getAllCenters);
router.get("/getTutorsList", adminCntrl.getUsersList);
router.get("/getUserByCenterId/:id", adminCntrl.getUsersByCenterId);

// Student Info
router.get("/getAllStudents", adminCntrl.allStudents);
router.get("/getAllStudentsAtCenter/:id", adminCntrl.getAllStudentsAtCenter);
router.get("/getAllStudentsByTutorId/:id", adminCntrl.getAllStudentsByTutor);

// Attendance (Admin View)
router.get("/attendanceListOfTutor", adminCntrl.attendanceList);
router.get("/attendanceHistoryOfTutor", adminCntrl.attendanceHistory);

// Attendance (Tutor View)
router.get("/attendanceOfAllStudents", tutorCntrl.attendanceOfAllStudents);
router.get("/attendanceHistoryOfStudent", tutorCntrl.attendanceHistoryOfStudent);

// Delete Routes
router.delete("/removeUser", adminCntrl.deleteUser);
router.delete("/deleteAttendance", adminCntrl.deleteAttendance);

module.exports = router;
