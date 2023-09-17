import { Container, Breadcrumb, Card, Row, Col, Form, Button } from "react-bootstrap"
import "../../../assets/css/register.page.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import AuthService from "../../auth/auth.service"
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom"
import "../../auth/loading.page.css"
import { useSelector } from "react-redux"
import noimage from "../../../assets/images/userimage.png"
import { FaPaperPlane, FaTrash, FaArrowLeft, FaRedo } from "react-icons/fa";



const RegisterPage = () => {
    const navigate = useNavigate()
    let [loading, setLoading] = useState(false);

    const registerSchema = Yup.object({
        name: Yup.string().min(3).required("Name is required"),
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
            image: null
        },
        validationSchema: registerSchema,
        onSubmit: async (values) => {
            setLoading(true);
            try {

                let formData = new FormData();
                const authSvc = new AuthService();

                // file append
                formData.append("image", values.image, values.image.filename)

                // text data 
                formData.append('name', values.name)
                formData.append('email', values.email)
                formData.append('role', values.role)
                formData.append('password', values.password)

                let response = await authSvc.register(formData)
                if (response.status) {
                    toast.success("Your account has been registered. Please Check your email for activation Process!")

                    navigate("/admin/user")
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
    })

    // let loggedInUser = useSelector((root) => {
    //   return root.User?.loggedInUser
    // })
    // useEffect(() =>{
    //   if(loggedInUser) {
    //     // 
    //     toast.info("You are already logged in!!!")
    //     navigate("/"+loggedInUser.role)
    //   }
    // }, [loggedInUser])


    return (
        <>

            <Container fluid className="px-4">

                <Row>
                    <Col sm={12} md={6}>
                        <h1 className="mt-4">
                            User Create Page
                        </h1>
                    </Col>
                    <Col md={6} sm={12} className="d-none d-md-block">
                        <NavLink className={"btn btn-sm btn-success mt-5 float-end"} to="/admin/brand">
                            <FaArrowLeft />Go To List
                        </NavLink>
                    </Col>
                </Row>

                <Breadcrumb className="mb-4">
                    <Breadcrumb.Item>
                        <NavLink to="/admin">Dashboard</NavLink>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item>
                        <NavLink to="/admin/user">UserListing</NavLink>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item active>User Create</Breadcrumb.Item>
                </Breadcrumb>


                <hr />
                <Card className="mb-4">
                    <Card.Body>
                        <Form onSubmit={formik.handleSubmit}>

                            <Form.Group className="mb-3">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    required
                                    size="sm"
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
                                    size="sm"
                                    onChange={formik.handleChange}
                                    name="email"
                                />
                                <span className="text-danger">{formik.errors?.email}</span>
                            </Form.Group>

                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Password: </Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        onChange={formik.handleChange}
                                        required
                                        size="sm"
                                        placeholder="Enter your Password..."
                                    />
                                    <span className="text-danger">{formik.errors?.password}</span>
                                </Col>

                            </Form.Group>

                            <Row>
                                <Col sm={12} md={10}>
                                    <Form.Group className="row mb-3">
                                        <Form.Label className="col-sm-4">
                                            Confirm Password:{" "}
                                        </Form.Label>
                                        <Col sm={8}>
                                            <Form.Control
                                                type="password"
                                                name="confirmPassword"
                                                onChange={formik.handleChange}
                                                required
                                                size="sm"
                                                placeholder="Re-type your password..."
                                            />
                                            <span className="text-danger">{formik.errors?.confirmPassword}</span>
                                        </Col>

                                    </Form.Group>

                                    <Form.Group className="row mb-3">
                                        <Form.Label className="col-sm-4">Role: </Form.Label>
                                        <Col sm={8}>
                                            <Form.Select
                                                name="role"
                                                size="sm"
                                                required
                                                onChange={formik.handleChange}
                                            >
                                                <option>-- Select Any One --</option>
                                                <option value={"seller"}>Seller</option>
                                                <option value={"customer"}>Customer</option>
                                            </Form.Select>
                                            <span className="text-danger">{formik.errors?.role}</span>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group className="row mb-3">
                                        <Form.Label className="col-sm-4">
                                            Profile Image:{" "}
                                        </Form.Label>
                                        <Col sm={8}>
                                            <Form.Control
                                                type="file"
                                                name="image"
                                                required
                                                accept="image/*"
                                                size="sm"
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
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col sm={12} md={2}>
                                    <img src={
                                        (formik.values.image && typeof formik.values.image !== "string")
                                            ? URL.createObjectURL(formik.values.image)
                                            : noimage
                                    } alt="" className="img img-fluid" />
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={{ offset: 3, span: 9 }}>
                                    <Button variant="danger" type="reset" className="me-3" size="sm">
                                        <FaTrash /> Cancel
                                    </Button>
                                    <Button disabled={loading} variant="success" type="submit" className="me-3" size="sm">
                                        <FaPaperPlane /> Register
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default RegisterPage;