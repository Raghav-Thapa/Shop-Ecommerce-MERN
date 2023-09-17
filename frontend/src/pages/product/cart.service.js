import HttpService from "../../services/http.service";

class CartService extends HttpService{
    sendToCart = async (data) => {
        try {
            let response = await this.postRequest('/v1/cart', data, {auth:true});
            return response;
        } catch(exception){
            throw exception;
        }
    }

    getCartDetail = async (data) => {
        try {
            let response = await this.postRequest('/v1/cart/detail', data, {auth:true});
            return response;
        } catch(exception){
            throw exception;
        }
    }

    placeAnOrder = async(cart) => {
        try {
            let response = await this.postRequest('/v1/cart/setCart', cart, {auth:true});
            return response;
        } catch(exception){
            throw exception;
        }
    }

    listAllCarts = async() => {
        try {
            let response = await this.getRequest('/v1/cart/list-all', {auth:true});
            return response;
        } catch(exception) {
            throw exception
        }
    }
}

export default new CartService();