const router = require('express').Router()
const {userCtrl} = require('../controller')
// const { userCtrl } = require('../controller')
const authCheck = require("../middleware/auth.middleware")
const { checkPermission } = require('../middleware/permission.middleware')
const uploader = require('../middleware/uploader.middleware')

const uploadPath = (req,res,next) =>{
    req.uploadPath = "./public/user/";
    next()
}

router.route("/")
    .get(authCheck, checkPermission('admin'), userCtrl.listAllUsers)
    .post(authCheck, checkPermission('admin'), uploadPath, uploader.single('image'),userCtrl.storeUser)

router.route("/:id")
    .put(authCheck, checkPermission('admin'), uploadPath, uploader.single('image'),userCtrl.updateUser)
    .delete(authCheck, checkPermission('admin'),userCtrl.deleteUser)
    .get(authCheck, checkPermission('admin'), userCtrl.getUserById)

router.get('/list/home', userCtrl.getUserForHomePage)

module.exports = router;

