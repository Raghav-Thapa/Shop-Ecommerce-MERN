import { HeaderSection } from "../home/component/header.component"
import { Container, Form, Row, Col, Button, InputGroup } from "react-bootstrap"
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi"
import { Auth } from "./"
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const ForgetPage = () => {
    let [loading, setLoading] = useState(false);
    let navigate = useNavigate()

    const forgetSchema = Yup.object({
      email: Yup.string().email().required(),
    });

    const formik = useFormik({
        initialValues: {
          email: "",
        },

        validationSchema: forgetSchema,

        onSubmit: async (values) => {
          setLoading(true);
          try {
            const response = await Auth.authSvc.forgetPassword(values.email);
    
            localStorage.setItem("email", values.email);
    
            if (response.status === true) {
              toast.success(response.msg);
              navigate("/")

            } else {
              toast.error(response.msg || "Something went wrong.");
            }
          } catch (error) {
            toast.error("Error occurred. Please try again later.");
          }
          setLoading(false);
        },
      });

    return <>
    <HeaderSection/>

    <Form className="form-format" onSubmit={formik.handleSubmit}>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1"><HiOutlineMail /></InputGroup.Text>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        onChange={formik.handleChange}
                                        name="email"
                                        value={formik.values.email}

                                    />
                                </InputGroup>
                                <span className="text-danger">{formik.errors?.email}</span>
                            </Form.Group>
                            <Button variant="primary"
                            disabled= {loading} type="submit">
                                Submit
                            </Button>
                            </Form>
    </>
}

export default ForgetPage