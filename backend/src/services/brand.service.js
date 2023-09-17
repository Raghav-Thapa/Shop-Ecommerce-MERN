const BrandModel = require("../models/brand.model")
const Joi = require("joi")

class BrandService{
    brandValidate = async (data) => {
        try{
            let schema = Joi.object({
                name: Joi.string().min(3).required(),
                image: Joi.string().required(),
                status: Joi.string().valid("active","inactive").default("inactive")
            })
            let response = schema.validate(data);
            if(response.error){
                let msg = response.error.details[0].message;
                throw{status: 400, msg: msg}
            }
            return response.value;
            
        }catch(exception){
            console.log(exception)
            throw exception
            // throw {
            //     status: 400,
            //     msg: "Brand Validation Failure"
            // }
        }
    }

    getAllBrands = async ({perPage = 10, currentPage =1}) =>{
        try{
            let skip = (currentPage-1) * perPage;

            let data = await BrandModel.find()
            .sort({_id: -1})
            .skip(skip)
            .limit(perPage)
            return data;
        } catch(exception) {
            console.log(exception)
            throw{status: 500, msg: "Querry execution fialed."}
        }
    }

    getAllCount = async (filter ={}) => {
        return await BrandModel.count(filter)
    }
    createBrand = async (data) => {
        try{
            let brand = new BrandModel(data);
            return await brand.save()
        }catch(exception){
            console.log(exception)
            throw{
                status: 500, msg:"Db querry failed"
            }
        }
    }
    updateBrand = async(data,id) =>{
        try{
            let response = await BrandModel.findByIdAndUpdate(id, {$set: data})
            return response

        } catch(except){
            throw except
        }
    }
    getBrandById = async(id) => {
        try{
            let brand = await BrandModel.findById(id)
            if(brand){
                return brand
            } else{
                throw{status:404, msg:"Brand does not exist"}
            }

        }catch(err){
            console.log(err)
            throw err
        }
    }
    deleteBrandById = async(id) => {
        try{
            let delResponse = await BrandModel.findByIdAndDelete(id)
            if(delResponse){
                return delResponse
            } else{
                throw{status:404, msg: "Brand has been already deleted or does not exist"}
            }
            
        }catch(except){
            throw except
        }
    }
    getBrandByFilter = async(filter, paging) =>  {
        try {
            let response = await BrandModel.find(filter)
                    .sort({_id: -1})
                    .limit(10)
            return response;
        } catch(exception) {
            throw exception
        }
    }
}
module.exports = BrandService