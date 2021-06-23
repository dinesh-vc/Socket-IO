const express = require('express')
const route = express.Router();
const controller=require('../controller/controller.js')

route.get('/home' , controller.home)

module.exports=route;