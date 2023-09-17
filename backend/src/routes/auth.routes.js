const app = require("express").Router()
const authCtrl = require('../controller/auth.controller')
const authCheck = require("../middleware/auth.middleware")
const { checkPermission } = require("../middleware/permission.middleware")
const uploader = require("../middleware/uploader.middleware")



app.post('/login',authCtrl.login)

const uploadPath =(req,res,next) => {
    req.uploadPath ="./public/user"
    next()

}

app.post('/register',uploadPath, uploader.single("image"), authCtrl.register)

// const uploadPath2 =(req,res,next) => {
//     req.uploadPath ="./public/user/active"
//     next()

// }

app.post('/activate/:token',authCtrl.activateUser)
app.post('/forget-password',authCtrl.forgetPassword)
app.post('/reset-password', authCtrl.resetPassword)
app.get('/me',authCheck,authCtrl.getLoggedInUser)

app.get("/refresh-token", authCheck, authCtrl.refreshToken)

module.exports = app;
