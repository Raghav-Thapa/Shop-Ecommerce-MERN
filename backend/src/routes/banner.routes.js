const router = require('express').Router()
const { bannerCtrl } = require('../controller')
const authCheck = require("../middleware/auth.middleware")
const { checkPermission } = require('../middleware/permission.middleware')
const uploader = require('../middleware/uploader.middleware')

const uploadPath = (req,res,next) =>{
    req.uploadPath = "./public/banners/";
    next()
}

router.route("/")
    .get(authCheck, checkPermission('admin'), bannerCtrl.listAllBanners)
    .post(authCheck, checkPermission('admin'), uploadPath, uploader.single('image'),bannerCtrl.storeBanner)

router.route("/:id")
    .put(authCheck, checkPermission('admin'), uploadPath, uploader.single('image'),bannerCtrl.updateBanner)
    .delete(authCheck, checkPermission('admin'),bannerCtrl.deleteBanner)
    .get(authCheck, checkPermission('admin'), bannerCtrl.getBannerById)

router.get('/list/home', bannerCtrl.getBannerForHomePage)

module.exports = router;

