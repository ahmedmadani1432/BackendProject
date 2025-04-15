


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
        const { userEmail, userPassword } = req.body;
        const admin = await admin_Mdl.findOne({ userEmail: userEmail }).lean();
        if (admin && comparePassword(userPassword, admin.userPassword)) {
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
