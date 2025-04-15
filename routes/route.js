

const express = require('express')
const admin_route= require('./admin_route')
const tutor_route = require('./tutor_route')

const router = express.Router();

router.use('/admin',admin_route)
router.use('/tutor',tutor_route)

module.exports= router