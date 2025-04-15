// const express = require("express")
// const tutor_ctrl = require("../controllers/tutor_cntrl")

// const router = express.Router()
// //post
// router.post("/signup",tutor_ctrl.signup)
// router.post("/login",tutor_ctrl.login)
// router.post("/markAttedance",tutor_ctrl.MarkAttendance)
// router.post("/addStudent",tutor_ctrl.createStudent)
// router.post("/markStudentAttendance",tutor_ctrl.StudentAttendance)

// //get
// router.get("/attendaceOfAllStudents",tutor_ctrl.attedanceOfAllStudents)
// router.get("/attendanceHistoryOfStudent",tutor_ctrl.attedanceHistoryOfStudent)

// module.exports = router




const express = require("express")
const tutor_ctrl = require("../controllers/tutor_cntrl")

const router = express.Router()

// POST routes
router.post("/signup", tutor_ctrl.signup)
router.post("/login", tutor_ctrl.login)
router.post("/markAttedance", tutor_ctrl.MarkAttendance)
router.post("/addStudent", tutor_ctrl.createStudent)
router.post("/markStudentAttendance", tutor_ctrl.StudentAttendance)

// GET routes
router.get("/attendanceOfAllStudents", tutor_ctrl.attendanceOfAllStudents)
router.get("/attendanceHistoryOfStudent", tutor_ctrl.attendanceHistoryOfStudent)

module.exports = router





























// router.post("/attendance",tutor_ctrl.attendence)

// router.post("/register",tutor_ctrl.register)