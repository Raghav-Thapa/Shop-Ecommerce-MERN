import HttpService from "../../../services/http.service"

class UserService extends HttpService {
    //CRUD
    createUser =async (data) => {
        try {
            let response = await this.postRequest('/v1/user', data, {auth:true, file:true})
            return response
        } catch(exception){
            throw exception
        }
    } 
    
    // listAllSellers = async (perPage=10, page=1) =>{
    //     try{
    //         let response = await this.getRequest("v1/user?perPage="+perPage+"&page="+page,{auth:true})
    //         let sellers = response.result.data.filter(user => user.role === 'seller');
    //         return sellers;
    //     }catch(exception){
    //         throw exception
    //     }
    // }
    
    listAllUsers = async (perPage=10, page=1) =>{
        try{
            let response = await this.getRequest("v1/user?perPage="+perPage+"&page="+page,{auth:true})
            return response
        }catch(exception){
            throw exception
        }
    }

    deleteUserById = async (id) => {
        try{
            let response = await this.deleteRequest("/v1/user/"+id, {auth:true});
            return response;

        }catch(exception){
            throw exception
        }
    }

    getUserById = async(id) => {
        try{
            let response = await this.getRequest("/v1/user/"+id, {auth:true});
            return response;

        }catch(exception){
            throw exception
        }

    }

    updateUser = async (data, id) => {
        try{
            let response = await this.putRequest("/v1/user/"+id, data, {auth:true, file:true});
            return response;

        }catch(exception){
            throw exception
        }
    }
}

export default UserService