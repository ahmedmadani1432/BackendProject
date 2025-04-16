

const moment = require("moment");

const tutor_Mdl = require("../models/tutor_model");
const center_Mdl = require("../models/center_model");
const student_Mdl = require("../models/student_model");
const attend_Mdl = require("../models/attendance_model");
const studentAttendance_Mdl = require("../models/studentAttendance_model");

const {
    responseGenerator,
    hashPassword,
    comparePassword,
    generateTokens
} = require("../utils/util");

// ==========================
// Tutor Signup
// ==========================
const signup = async (req, res) => {
    try {
        const data = req.body;

        const existingUser = await tutor_Mdl.findOne({ email: data.email });
        if (existingUser) {
            return res.status(400).json(responseGenerator(false, "Email already exists"));
        }

        const centerExists = await center_Mdl.findById(data.center);
        if (!centerExists) {
            return res.status(400).json(responseGenerator(false, "Center does not exist"));
        }

        const tutorCount = await tutor_Mdl.countDocuments();
        data.id = tutorCount + 1;

        data.password = await hashPassword(data.password);

        const newTutor = new tutor_Mdl(data);
        await newTutor.save();

        res.status(201).json(responseGenerator(true, "Tutor registered successfully", newTutor));
    } catch (err) {
        console.error(err);
        res.status(500).json(responseGenerator(false, "Internal server error"));
    }
};


// Tutor Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const tutor = await tutor_Mdl.findOne({ email }).lean();
        if (!tutor) {
            return res.status(401).json(responseGenerator(false, "Invalid email or password"));
        }

        const isMatch = await comparePassword(password, tutor.password);
        if (!isMatch) {
            return res.status(401).json(responseGenerator(false, "Invalid email or password"));
        }

        const tokens = generateTokens({
            email,
            name: tutor.name,
            id: tutor.id
        });

        res.status(200).json(responseGenerator(true, "Tutor logged in successfully", {
            name: tutor.name,
            id: tutor.id,
            tokens
        }));
    } catch (err) {
        console.error(err);
        res.status(500).json(responseGenerator(false, "Internal server error"));
    }
};


// Mark Tutor Attendance
const MarkAttendance = async (req, res) => {
    try {
        const { email } = req.body;
        const today = moment().format("YYYY-MM-DD");
        const currentTime = moment().format("HH:mm");

        const alreadyMarked = await attend_Mdl.findOne({ email, date: today });
        if (alreadyMarked) {
            return res.status(200).json(responseGenerator(true, "Attendance already marked for today"));
        }

        const attendance = new attend_Mdl({ email, date: today, time: currentTime });
        await attendance.save();

        res.status(201).json(responseGenerator(true, "Attendance marked successfully"));
    } catch (err) {
        console.error(err);
        res.status(500).json(responseGenerator(false, "Internal server error"));
    }
};


// Mark Student Attendance
const StudentAttendance = async (req, res) => {
    try {
        const { roll_no } = req.body;
        const today = moment().format("YYYY-MM-DD");
        const currentTime = moment().format("HH:mm");

        const alreadyMarked = await studentAttendance_Mdl.findOne({ roll_no, date: today });
        if (alreadyMarked) {
            return res.status(400).json(responseGenerator(true, "Attendance already marked for this student today"));
        }

        const attendance = new studentAttendance_Mdl({ roll_no, date: today, time: currentTime });
        await attendance.save();

        res.status(201).json(responseGenerator(true, "Student attendance marked successfully", attendance));
    } catch (err) {
        console.error(err);
        res.status(500).json(responseGenerator(false, "Internal server error"));
    }
};


// Create Student
const createStudent = async (req, res) => {
    try {
        const data = req.body;

        const exists = await student_Mdl.findOne({ name: data.name, fname: data.fname });
        if (exists) {
            return res.status(400).json(responseGenerator(false, "Student already exists"));
        }

        const studentCount = await student_Mdl.countDocuments();
        const rollno = studentCount + 1;

        const newStudent = new student_Mdl({ ...data, rollno });
        await newStudent.save();

        res.status(201).json(responseGenerator(true, "Student added successfully", newStudent));
    } catch (err) {
        console.error(err);
        res.status(500).json(responseGenerator(false, "Internal server error"));
    }
};

// All Students' Attendance
const attendanceOfAllStudents = async (req, res) => {
    try {
        const records = await studentAttendance_Mdl.find();

        const msg = records.length
            ? "Attendance list of all students"
            : "No attendance recorded yet";

        res.status(200).json(responseGenerator(true, msg, records));
    } catch (err) {
        console.error(err);
        res.status(500).json(responseGenerator(false, "Internal server error"));
    }
};

// Attendance History of a Student
const attendanceHistoryOfStudent = async (req, res) => {
    try {
        const { roll_no } = req.body;

        const history = await studentAttendance_Mdl.find({ roll_no });
        if (history.length === 0) {
            return res.status(404).json(responseGenerator(true, "No attendance history for this student"));
        }

        res.status(200).json(responseGenerator(true, "Student attendance history", history));
    } catch (err) {
        console.error(err);
        res.status(500).json(responseGenerator(false, "Internal server error"));
    }
};

module.exports = {
    signup,
    login,
    MarkAttendance,
    StudentAttendance,
    createStudent,
    attendanceOfAllStudents,
    attendanceHistoryOfStudent
};
