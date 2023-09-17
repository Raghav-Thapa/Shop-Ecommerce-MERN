import { useEffect } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify";
import { Auth } from "./";

const ActivateUser = () => {
    let params = useParams()
    let navigate = useNavigate()

    //let [query,setQuery] = useSearchParams()
    //?token=data
    //let token = query.get("token")
    const loadUser = async () => {
        //api call
        try{
            let user = await Auth.authSvc.getUserByToken(params.token)
            toast.success("Your account has been created successfully. Please login to continue...")
            navigate("/login")

        }catch(exception){
            console.log(exception)
            let msg = exception.data.msg?? "Cannot activate your account at this moment. Contact Admin"
            toast.warning(msg)
            navigate("/register")
        }
    }

    useEffect(() => {
        loadUser()
    }, [])
    return(<>
    
    </>)
}

export default ActivateUser