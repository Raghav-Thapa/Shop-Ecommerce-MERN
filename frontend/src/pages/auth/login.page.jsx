import { Container, Form, Row, Col, Button, InputGroup } from "react-bootstrap"
import "../../assets/css/login.page.css"
import loginImage from "../../assets/images/loginpage.jpg"
import { HeaderSection } from "../home/component/header.component"
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi"
import { FaCircleUser } from "react-icons/fa6"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Axios } from "axios"
import axiosInstance from "../../config/axios.config"
import AuthService from "./auth.service"
import { useDispatch, useSelector } from "react-redux"
import { setLoggedInUser } from "../../reducer/user.reducer"
import { useEffect } from "react"


const LoginPage = () => {

    const dispatch = useDispatch();

    const authSvc = new AuthService()

    const loginSchema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().min(8).required(),
        // confirmPassword: Yup.string(). oneOf(Yup.ref('password'))
    });

    const navigate = useNavigate()


    const formik = useFormik({
        initialValues: {
            email: null,
            password: null
        },

        validationSchema: loginSchema,

        onSubmit: async (values) => {

            // TODO: API Call for the submission
            try {
                // url => http://localhost:3005/
                //path => login => /api/v1/auth/login, post, payload 
                //path => register => /api/v1/auth/register

                let response = await authSvc.login(values);
                if (response.status) {
                    //webstorage
                    let formattedData = {
                        id: response.result.data._id,
                        name: response.result.data.name,
                        email: response.result.data.email,
                        role: response.result.data.role,
                    }

                    //store
                    //reducer event dispatch

                    dispatch(setLoggedInUser(formattedData))


                    localStorage.setItem("accessToken", response.result.token.accessToken)
                    localStorage.setItem("refreshToken", response.result.token.refreshToken)
                    localStorage.setItem("user", JSON.stringify(formattedData))

                    toast.success("Welcome to" + formattedData.role + " Portal !")
                    navigate("/" + formattedData.role)

                } else {
                    toast.warning("Credentials does not match")
                }

                //webstorage,cookie,localstorage
                // console.log(response)
            } catch (axiosErrorResponse) {
                // toast.error(axiosErrorResponse.data.msg)
                console.log(axiosErrorResponse)
                toast.error("Credentials does not match")
            }
        },

    })

    let loggedInUser = useSelector((root) => {
        return root.User?.loggedInUser
    })
    useEffect(() => {
        if (loggedInUser) {
            let redirect = (localStorage.getItem('redirect') ? localStorage.getItem('redirect'): "/" + loggedInUser.role)
            localStorage.removeItem('redirect')
            toast.info("You are already logged in !! ")
            navigate(redirect)
        }
    }
        , [loggedInUser])

    return (<>
        <div className="backcolor">
            <HeaderSection />

            <Container>
                <Row className="mx-5 my-5 formborder">
                    <Col lg={7}>
                        <img className="loginimage" height={500} width={700} src={loginImage} alt="" />
                    </Col>

                    <Col className="loginbackcolor" lg={5}>

                        <h3 className="login"> <FaCircleUser className="mb-2 me-2" />USER LOGIN</h3>
                        <hr className="mb-5" />

                        <Form className="form-format" onSubmit={formik.handleSubmit}>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1"><HiOutlineMail /></InputGroup.Text>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        onChange={formik.handleChange}
                                        name="email"

                                    />
                                    {/* <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text> */}
                                    {/* <span className="text-danger">
                                    {formik.errors?.email}
                                </span> */}
                                </InputGroup>
                                <span className="text-danger">{formik.errors?.email}</span>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">< HiOutlineLockClosed /></InputGroup.Text>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter Password"
                                        name="password"
                                        onChange={formik.handleChange}
                                    />
                                </InputGroup>
                                <span className="text-danger">{formik.errors?.password}</span>
                            </Form.Group>


                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Remember Me" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                            <a className="signup" href="forget-password">Forgot Password ? </a>
                        </Form>

                    </Col>
                </Row>
            </Container>

        </div>

    </>
    )
}

export default LoginPage