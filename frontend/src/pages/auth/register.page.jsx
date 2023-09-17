import { Container, Form, Row, Col, Button, InputGroup } from "react-bootstrap"
import "../../assets/css/register.page.css"
import registerImage from "../../assets/images/registerpage.jpg"
import userImage from "../../assets/images/userimage.jpg"
import { HeaderSection } from "../home/component/header.component"
import { LiaSignInAltSolid } from "react-icons/lia"
import { SiGnuprivacyguard } from "react-icons/si"
import { useFormik } from "formik"
import * as Yup from "yup"
import AuthService from "./auth.service"
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import loadingg from "../../assets/images/hello.gif"
import "./loading.page.css"
import {useSelector } from "react-redux"



const RegisterPage = () => {
    const navigate = useNavigate();

    let [loading, setLoading] = useState(false);

    const registerSchema = Yup.object({
        name: Yup.string().min(3).required(),
        email: Yup.string().email().required(),
        role: Yup.string().matches(/seller|customer/).default("customer"),
        password: Yup.string().min(8).max(30).required(),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], "Password and confirm Password does not match"),
        image: Yup.string()
    })

    const formik = useFormik({
        initialValues: {
            name: null,
            email: null,
            role: null,
            password: null,
            confirmPassword: null,
            image: null,
        },

        // onSubmit: (values) => {
        //     axios.post('url')
        //     console.log("Registration:", values)

        // }

        validationSchema: registerSchema,
        onSubmit: async (values) => {
            setLoading(true);
            try {
                let formData = new FormData();
                const authSvc = new AuthService();
                //file append
                formData.append("image", values.image, values.image.filename)

                //textdata
                formData.append('name', values.name)
                formData.append('email', values.email)
                formData.append('role', values.role)
                formData.append('password', values.password)

                let response = await authSvc.register(formData);
                if (response.status) {
                    toast.success("Your account has been registered. Check email for activation!")
                    setLoading(false)
                    navigate("/")
                }

            } catch (error) {
                console.log(error)
            }


        }

    })

    let loggedInUser = useSelector((root) => {
        return root.User?.loggedInUser
    })
    useEffect(() => {
        if (loggedInUser) {
            toast.info("you are already logged in !! ")
            navigate("/"+loggedInUser.role)
        }
    }
        , [loggedInUser])

    return (<>
        <div className="backcolor">
            <HeaderSection />

            <Container>
                <Row className="mx-5 my-4 formborder">
                    <Col lg={7}>
                        <img className="loginimage" height={710} width={700} src={registerImage} alt="" />
                        <img className="userimage" height={250} width={250}
                            src={
                                (formik.values.image && typeof formik.values.image !== "string")
                                    ? URL.createObjectURL(formik.values.image)
                                    : userImage
                            }
                            alt="" />
                    </Col>

                    <Col className="loginbackcolor" lg={5}>
                        {loading && (
                            <img src={loadingg} height={710} width={600} alt="" className="showimage" />
                        )}

                        <h3><SiGnuprivacyguard className="mb-2 me-2" />SIGN UP</h3>
                        <hr />

                        <Form className="form-format" onSubmit={formik.handleSubmit}>

                            <Form.Group className="mb-3">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    required
                                    onChange={formik.handleChange}
                                    placeholder="Enter Your Name..." />
                                <span className="text-danger">{formik.errors?.name}</span>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    placeholder="Email address"
                                    type="email"
                                    required
                                    onChange={formik.handleChange}
                                    name="email"
                                />
                                <span className="text-danger">{formik.errors?.email}</span>
                            </Form.Group>


                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    placeholder="New password"
                                    type="password"
                                    required
                                    onChange={formik.handleChange}
                                    name="password"
                                />
                                <span className="text-danger">{formik.errors?.password}</span>
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    placeholder="Re-enter password"
                                    type="password"
                                    required
                                    onChange={formik.handleChange}
                                    name="confirmPassword"
                                />
                                <span className="text-danger">{formik.errors?.confirmPassword}</span>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Select
                                    name="role"
                                    size="sm"
                                    onChange={formik.handleChange}
                                >
                                    <option>--Selecct Your Role</option>
                                    <option value={"seller"}>Seller</option>
                                    <option value={"customer"}>Customer</option>
                                </Form.Select>
                                <span className="text-danger">{formik.errors?.role}</span>
                            </Form.Group>

                            <Form.Group controlId="formFileSm" className="mb-3">
                                <Form.Label>Select Profile Picture</Form.Label>
                                <Form.Control
                                    type="file"
                                    size="sm"
                                    required
                                    accept="image/*"
                                    name="image"
                                    onChange={(e) => {
                                        let file = e.target.files[0];
                                        let ext = (file.name.split(".")).pop();
                                        if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'].includes(ext.toLowerCase())) {
                                            formik.setValues({
                                                ...formik.values,
                                                image: file
                                            })
                                        } else {
                                            formik.setErrors({
                                                ...formik.errors,
                                                image: "File format not supported"
                                            })
                                        }
                                    }}
                                />
                                <span className="text-danger">{formik.errors?.image}</span>
                            </Form.Group>


                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="I agree to the Terms and Conditions" />
                            </Form.Group>
                            <Button variant="success" type="submit">
                                <SiGnuprivacyguard className="mb-1" /> Sign Up
                            </Button>
                            <a className="signup" href="login">Sign In <LiaSignInAltSolid /></a>
                        </Form>

                    </Col>
                </Row>
            </Container>

        </div>

    </>
    )
}

export default RegisterPage