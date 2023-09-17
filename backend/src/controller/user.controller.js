const userServ = require("../services/user.service");
const slugify = require("slugify")

class UserController{
    _svc;

    constructor(){
        this._svc = userServ; 
    }
    
    listAllUsers = async (req, res, next) => {
        try{
            let paging ={
                totalNoOfRows: await this._svc.getAllCount(),
                perPage: req.query.perPage ? Number(req.query.perPage):10,
                currentPage: req.query.page ? Number(req.query.page):1
            }

            let data = await this._svc.getAllUsers(paging)
            // console.log(data)
            res.json({
                result: data,
                status: true,
                msg: "User Data Fetched",
                meta: paging
            })
        } catch(exception){
            next(exception)
        }

    }

    storeUser = async (req, res ,next) =>{
        try{
            let data = req.body;
            if(req.file){
                data.image = req.file.filename;
            }

            let validated = await this._svc.userValidate(data);
            validated.slug = slugify(validated.name, {lower: true, replacement :"-"})
            let response = await this._svc.createUser(validated); 
            res.json({
                result: response,
                msg : "User created successfully",
                status: true,
                meta: null
            })
        }catch(exception){
            next(exception)
        }

    }

    updateUser = async (req, res, next) => {
        try{
            let data = req.body;
            let user = await this._svc.getUserById(req.params.id)
            if(req.file){
                data.image = req.file.filename;
            } else{
                data.image = user.image
            }

            let validated = await this._svc.updatedata(data);
            let response = await this._svc.updateUser(validated, req.params.id); 
            res.json({
                result: response,
                msg : "User updated successfully",
                status: true,
                meta: null
            })
        }catch(exception){
            next(exception)
        }

    }

    deleteUser = async (req, res, next) => {
        try{
            let user = await this._svc.getUserById(req.params.id)
            let del = await this._svc.deleteUserById(req.params.id)
            res.json({
                result : del,
                msg: "User deleted successfully",
                status: true,
                meta: null
            })
        }catch(except){
            next(except)
        }

    }

    getUserForHomePage = async (req, res, next) => {
        try{
            let filter ={
                status: "active",
            }
            let paging ={
                totalNoOfRows: await this._svc.getAllCount(filter),
                perPage: req.query.perPage ? Number(req.query.perPage):10,
                currentPage: req.query.page ? Number(req.query.page):1
            }
            let data = await this._svc.getUserByFilter(filter, paging);
            res.json({
                result: data,
                msg:"User data",
                status: true,
                meta: paging
            })
        }catch(exception){
            next(exception)
        }

    }

    getUserById = async (req, res, next) => {
        try{
            let id = req.params.id;
            let data = await this._svc.getUserById(id);
            res.json({
                result: data,
                msg:"User data fetched",
                status: true,
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }


}

module.exports = UserController