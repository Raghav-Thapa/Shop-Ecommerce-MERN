import HttpService from "../../../services/http.service"

class ProductService extends HttpService {
    // CRUD 
    createProduct =async (data) => {
        try {
            let response = await this.postRequest('/v1/product', data, {auth: true, file: true})
            return response
        } catch(exception){
            throw exception
        }
    }
    listHomeProducts = async (perpage =10, page=1) => {
        try {
            let response = await this.getRequest("/v1/product/list/home?perPage="+perpage+"&page="+page, {auth:true});
            return response;
        } catch(exception){
            throw exception;
        }
    }
    listAllProducts = async (perpage =10, page=1) => {
        try {
            let response = await this.getRequest("/v1/product?perPage="+perpage+"&page="+page, {auth:true});
            return response;
        } catch(exception){
            throw exception;
        }
    }
    deleteProductById = async(id) => {
        try{
            let response = await this.deleteRequest("/v1/product/"+id, {auth: true});
            return response;
        } catch(exception) {
            throw exception
        }
    }
    getProductById = async(id) => {
        try{
            let response = await this.getRequest("/v1/product/"+id, {auth: true});
            return response;
        } catch(exception) {
            throw exception
        }
    }
    getProductBySlug = async(slug) => {
        try{
            let response = await this.getRequest("/v1/product/"+slug+"/detail");
            return response;
        } catch(exception) {
            throw exception
        }
    }
    updateProduct = async(data, id) => {
        try{
            let response = await this.putRequest("/v1/product/"+id, data, {auth: true, file: true});
            return response;
        } catch(exception) {
            throw exception
        }
    }
}
export default ProductService