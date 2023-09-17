const BrandService = require("../services/brand.service");
const slugify = require("slugify");
const ProductService = require("../services/product.service");

class BrandController{
    _svc;

    constructor(){
        this._svc = new BrandService(); 
        this.prodSvc = new ProductService();
    }

    getDetailOfBrand = async(req, res, next) => {
        try{
            let slug = req.params.slug
            let brand = await this._svc.getBrandByFilter({slug: slug})
            let products = await this.prodSvc.getProductByFilter({
                brand: brand
            }, {
                perPage:100,
                currentPage: 1
            })
            res.json({
                data:{
                    brandDetail: brand,
                    productList: products
                },
                status: true,
                msg: "Brand List"
            })

        }catch(exception){
            next(exception)
        }
    }
    
    listAllBrands = async (req, res, next) => {
        try{
            let paging ={
                totalNoOfRows: await this._svc.getAllCount(),
                perPage: req.query.perPage ? Number(req.query.perPage):10,
                currentPage: req.query.page ? Number(req.query.page):1
            }

            let data = await this._svc.getAllBrands(paging)
            // console.log(data)
            res.json({
                result: data,
                status: true,
                msg: "Brand Data Fetched",
                meta: paging
            })
        } catch(exception){
            next(exception)
        }

    }

    storeBrand = async (req, res ,next) =>{
        try{
            let data = req.body;
            if(req.file){
                data.image = req.file.filename;
            }

            let validated = await this._svc.brandValidate(data);
            validated.slug = slugify(validated.name, {lower: true, replacement :"-"})
            let response = await this._svc.createBrand(validated); 
            res.json({
                result: response,
                msg : "Brand created successfully",
                status: true,
                meta: null
            })
        }catch(exception){
            next(exception)
        }

    }

    updateBrand = async (req, res, next) => {
        try{
            let data = req.body;
            let brand = await this._svc.getBrandById(req.params.id)
            if(req.file){
                data.image = req.file.filename;
            } else{
                data.image = brand.image
            }

            let validated = await this._svc.brandValidate(data);
            let response = await this._svc.updateBrand(validated, req.params.id); 
            res.json({
                result: response,
                msg : "Brand updated successfully",
                status: true,
                meta: null
            })
        }catch(exception){
            next(exception)
        }

    }

    deleteBrand = async (req, res, next) => {
        try{
            let brand = await this._svc.getBrandById(req.params.id)
            let del = await this._svc.deleteBrandById(req.params.id)
            res.json({
                result : del,
                msg: "Brand deleted successfully",
                status: true,
                meta: null
            })
        }catch(except){
            next(except)
        }

    }

    getBrandForHomePage = async (req, res, next) => {
        try{
            let filter ={
                status: "active",
            }
            let paging ={
                totalNoOfRows: await this._svc.getAllCount(filter),
                perPage: req.query.perPage ? Number(req.query.perPage):10,
                currentPage: req.query.page ? Number(req.query.page):1
            }
            let data = await this._svc.getBrandByFilter(filter, paging);
            res.json({
                result: data,
                msg:"Brand data",
                status: true,
                meta: paging
            })
        }catch(exception){
            next(exception)
        }

    }

    getBrandById = async (req, res, next) => {
        try{
            let id = req.params.id;
            let data = await this._svc.getBrandById(id);
            res.json({
                result: data,
                msg:"Brand data fetched",
                status: true,
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }


}

module.exports = BrandController