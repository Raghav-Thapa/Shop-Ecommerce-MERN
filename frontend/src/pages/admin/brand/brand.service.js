import HttpService from "../../../services/http.service"

class BrandService extends HttpService {
    //CRUD
    createBrand =async (data) => {
        try {
            let response = await this.postRequest('/v1/brand', data, {auth:true, file:true})
            return response
        } catch(exception){
            throw exception
        }
    } 

    getDetailBrand = async (slug) => {
        try {
            let response = await this.getRequest('/v1/brand/'+slug+"/detail")
            return response;
        } catch(exception) {
            throw exception
        }
    } 


    listAllBrands = async (perPage=10, page=1) =>{
        try{
            let response = await this.getRequest("v1/brand?perPage="+perPage+"&page="+page,{auth:true})
            return response
        }catch(exception){
            throw exception
        }
    }

    listAllHomeBrands = async (perpage =10, page=1) => {
        try {
            let response = await this.getRequest("/v1/brand/list/home?perPage="+perpage+"&page="+page, {auth:true});
            return response;
        } catch(exception){
            throw exception;
        }
    }

    deleteBrandById = async (id) => {
        try{
            let response = await this.deleteRequest("/v1/brand/"+id, {auth:true});
            return response;

        }catch(exception){
            throw exception
        }
    }

    getBrandById = async(id) => {
        try{
            let response = await this.getRequest("/v1/brand/"+id, {auth:true});
            return response;

        }catch(exception){
            throw exception
        }

    }

    updateBrand = async (data, id) => {
        try{
            let response = await this.putRequest("/v1/brand/"+id, data, {auth:true, file:true});
            return response;

        }catch(exception){
            throw exception
        }
    }
}

export default BrandService