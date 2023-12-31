const router = require('express').Router()
const { productCtrl } = require('../controller')
const authCheck = require("../middleware/auth.middleware")
const { checkPermission } = require('../middleware/permission.middleware')
const uploader = require('../middleware/uploader.middleware')

const uploadPath = (req,res,next) =>{
    req.uploadPath = "./public/products/";
    next()
}

router.get("/:slug/detail", productCtrl.getProductBySlug);

router.route("/")
    .get(authCheck, checkPermission('admin'), productCtrl.listAllProducts)
    .post(authCheck, checkPermission('admin'), uploadPath, uploader.array('images'),productCtrl.storeProduct)

router.route("/:id")
    .put(authCheck, checkPermission('admin'), uploadPath, uploader.single('image'),productCtrl.updateProduct)
    .get(authCheck, checkPermission('admin'), productCtrl.getProductById)
    .delete(authCheck, checkPermission('admin'),productCtrl.deleteProduct)

router.get('/list/home', productCtrl.getProductForHomePage)

module.exports = router;

