const ProductModel = require("../models/product.model");
const Joi = require("joi");

class ProductService {
    productValidate = async (data) => {
        try {
            let schema = Joi.object({
                name: Joi.string().min(3).required(),
                categories: Joi.string(),
                detail: Joi.string(),
                price: Joi.number().min(1).required(),
                discount: Joi.number().min(0).max(99),
                brand: Joi.string(),
                attributes: Joi.array(),
                isFeatured: Joi.bool(),
                images: Joi.array().items(Joi.string()),
                sellerId: Joi.string(),
                status: Joi.string().valid("active",'inactive').default("inactive")
            })
            let response = schema.validate(data);
            if(response.error) {
                let msg = response.error.details[0].message;
                throw {status: 400, msg: msg}
            }
            return response.value;
        } catch(exception) {
            console.log(exception)
            throw exception
        }
    }

    getAllProducts = async ({perPage= 10, currentPage=1}) => {
        try {
            let skip = (currentPage-1) * perPage;
            
            let data = await ProductModel.find()
                .populate("categories")
                .populate("brand")
                .populate("sellerId")
                .sort({_id: -1})
                .skip(skip)
                .limit(perPage)
            return data;
        } catch(exception) {
            console.log(exception)
            throw {status: 500, msg: "Query execution failed."}
        }
    }

    getAllCount = async (filter={}) => {
        return await ProductModel.count(filter);
    }

    createProduct = async(data) => {
        try {
            let product = new ProductModel(data);
            return await product.save()
        } catch(exception) {
            console.log(exception)
            throw {
                status: 500, msg: "DB Query failed"
            }
        }
    }

    updateProduct = async (data, id) => {
        try {
            // findByIdAndUpdate => return => before update boject
            let response = await ProductModel.findByIdAndUpdate(id, {$set: data})
            return response
        } catch(except){
            throw except
        }
    }

    getProductById = async(id) => {
        try {
            let product = await ProductModel.findById(id)
                .populate("categories")
                .populate("brand")
                .populate("sellerId");
            if(product) {
                return product
            } else {
                throw {status: 404, msg: "Product does not exists"}
            }
        } catch(err) {
            console.log(err)
            throw err
        }
    }

    deleteProductById = async(id) => {
        try{
            let delResponse = await ProductModel.findByIdAndDelete(id)
            if(delResponse){
                return delResponse
            } else {
                throw {status: 404, msg: "Product has been already deleted or does not exists"}
            }
        } catch(except) {
            throw except
        }
    }

    getProductByFilter = async(filter, paging) =>  {
        try {
            let skip = (paging.currentPage-1) * paging.perPage;
            let response = await ProductModel.find(filter)
                .populate("categories")
                .populate("brand")
                .populate("sellerId")
                    .sort({_id: -1})
                    .skip(skip)
                    .limit(paging.perPage)
            return response;
        } catch(exception) {
            throw exception
        }
    }
}

module.exports = ProductService;