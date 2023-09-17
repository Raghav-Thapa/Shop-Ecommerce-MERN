import { HeaderSection } from "../home/component/header.component"
import { Container, Form, Row, Col, Button, InputGroup } from "react-bootstrap"
import "../../assets/css/register.page.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { Auth } from "."


const ResetPage = () => {
    let [loading, setLoading] = useState();
    const navigate = useNavigate()

    const resetSchema = Yup.object({
        newPassword: Yup.string().min(8).max(30).required(),
        confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], "New Password and confirm Password does not match"),
    });

  

        const formik = useFormik ({
            initialValues: {
                email: localStorage.getItem("email"),
                newPassword: "",
                confirmNewPassword: "",
            },

            validationSchema: resetSchema,
            onSubmit: async (values) => {
                
                try {
                    setLoading(true);
                    
                    const response = await Auth.authSvc.resetPassword(
                        values.email,
                        values.newPassword
                        );

                   
                    toast.success(
                        "Password has been reset successfully. Please Login to continue"
                      );
                      navigate("/login")

                      setLoading(false);
            
    
                } catch (error) {
                    console.log(error)
                    setLoading(false)
                }
    
    
            }})


   
    return <>
    <HeaderSection/>

    <Form className="form-format" onSubmit={formik.handleSubmit}>

    <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    placeholder="New password"
                                    type="password"
                                    required
                                    onChange={formik.handleChange}
                                    name="newPassword"
                                    value={formik.values.newPassword}
                                />
                                <span className="text-danger">{formik.errors?.newPassword}</span>
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    placeholder="Re-enter password"
                                    type="password"
                                    required
                                    onChange={formik.handleChange}
                                    name="confirmNewPassword"
                                    value={formik.values.confirmNewPassword}
                                />
                                <span className="text-danger">{formik.errors?.confirmNewPassword}</span>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                            </Form>
    </>
}

export default ResetPage

