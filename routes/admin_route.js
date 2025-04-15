

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
