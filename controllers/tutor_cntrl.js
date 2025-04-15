

const tutor_Mdl = require("../models/tutor_model");
const center_Mdl = require("../models/center_model");
const student_Mdl = require("../models/student_model");
const attend_Mdl = require("../models/attendance_model");
const studentAttendance_Mdl = require("../models/studentsAttend_Model");
const moment = require("moment");
const { responseGenerator, hashPassword, comparePassword, generateTokens } = require("../utils/util");

const signup = async (req, res) => {
    try {
        const data = req.body;
        const existingUser = await tutor_Mdl.findOne({ email: data.email });
        if (existingUser) {
            return res.status(400).json(responseGenerator(false, "Email Already exists in the list"));
        }

        const centerExists = await center_Mdl.findOne({ _id: data.center });
        if (!centerExists) {
            return res.status(400).json(responseGenerator(false, "Center doesn't exist. Please contact admin to create center."));
        }

        let id = await tutor_Mdl.countDocuments();
        id = id + 1;

        // Hash password before saving
        data.password = await hashPassword(data.password);

        const user = new tutor_Mdl({ ...data, id });
        await user.save();

        res.status(201).json(responseGenerator(true, "User Added successfully!", user));
    } catch (err) {
        console.log(err);
        res.status(500).json(responseGenerator(false, "Internal Server Error"));
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await tutor_Mdl.findOne({ email }).lean();

        if (!user) {
            return res.status(401).json(responseGenerator(false, "Invalid email or password"));
        }

        const isPasswordMatches = await comparePassword(password, user.password); // await password comparison
        if (isPasswordMatches) {
            const tokens = generateTokens({ email, name: user.name, id: user.id });
            res.status(200).json({
                success: true,
                message: "User logged in successfully!",
                data: { name: user.name, id: user.id, tokens }
            });
        } else {
            res.status(401).json(responseGenerator(false, "Invalid email or password"));
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(responseGenerator(false, "Internal Server Error"));
    }
};

const MarkAttendance = async (req, res) => {
    try {
        const { email } = req.body;
        const today = moment().format("YYYY-MM-DD");
        const currentTime = moment().format("HH:mm");

        let attendance = await attend_Mdl.findOne({ email, date: today });
        if (attendance) {
            return res.status(200).json(responseGenerator(true, "Already marked today's attendance."));
        }

        const newAttendance = new attend_Mdl({ email, date: today, time: currentTime });
        await newAttendance.save();

        res.status(201).json(responseGenerator(true, "Attendance marked successfully."));
    } catch (err) {
        console.log(err);
        res.status(500).json(responseGenerator(false, "Internal Server Error"));
    }
};

const StudentAttendance = async (req, res) => {
    try {
        const { roll_no } = req.body;
        const today = moment().format("YYYY-MM-DD");
        const currentTime = moment().format("HH:mm");

        let attendance = await studentAttendance_Mdl.findOne({ roll_no, date: today });
        if (attendance) {
            return res.status(400).json(responseGenerator(true, "Today's Attendance already marked."));
        }

        const newAttendance = new studentAttendance_Mdl({ roll_no, date: today, time: currentTime });
        await newAttendance.save();

        res.status(201).json(responseGenerator(true, "Attendance marked successfully.", newAttendance));
    } catch (err) {
        console.log(err);
        res.status(500).json(responseGenerator(false, "Internal Server Error"));
    }
};

const createStudent = async (req, res) => {
    try {
        const data = req.body;
        const student = await student_Mdl.findOne({ name: data.name, fname: data.fname });
        if (student) {
            return res.status(400).json(responseGenerator(false, "Student already exists."));
        }

        const count = await student_Mdl.countDocuments();
        const rollno = count + 1;

        const newStudent = new student_Mdl({ ...data, rollno });
        await newStudent.save();

        res.status(201).json(responseGenerator(true, "Student added successfully.", newStudent));
    } catch (err) {
        console.log(err);
        res.status(500).json(responseGenerator(false, "Internal Server Error"));
    }
};

// const attendanceOfAllStudents = async (req, res) => {
//     try {
//         const studentAttendanceList = await studentAttendance_Mdl.find();
//         if (studentAttendanceList.length === 0) {
//             return res.status(200).json(responseGenerator(true, "No attendance recorded yet."));
//         }

//         res.status(200).json(responseGenerator(true, "Attendance list of all students.", studentAttendanceList));
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(responseGenerator(false, "Internal Server Error"));
//     }
// };

const attendanceOfAllStudents = async (req, res) => {
    try {
        const studentAttendanceList = await studentAttendance_Mdl.find();
        if (studentAttendanceList.length === 0) {
            return res.status(200).json(responseGenerator(true, "No attendance recorded yet."));
        }
        res.status(200).json(responseGenerator(true, "Attendance list of all students.", studentAttendanceList));
    } catch (err) {
        console.log(err);
        res.status(500).json(responseGenerator(false, "Internal Server Error"));
    }
};
 
const attendanceHistoryOfStudent = async (req, res) => {
    try {
        const { roll_no } = req.body;
        const history = await studentAttendance_Mdl.find({ roll_no });

        if (history.length === 0) {
            return res.status(400).json(responseGenerator(true, "No attendance history for this student."));
        }

        res.status(200).json(responseGenerator(true, "Attendance history for this student.", history));
    } catch (err) {
        console.log(err);
        res.status(500).json(responseGenerator(false, "Internal Server Error"));
    }
};

module.exports = {
        login,
        signup,
        MarkAttendance,
        createStudent,
        StudentAttendance,
        attendanceOfAllStudents, 
        attendanceHistoryOfStudent 
    
};
