import { Container, Breadcrumb, Card, Row, Col, Form, Button } from "react-bootstrap"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { FaArrowLeft, FaPaperPlane, FaRedo } from "react-icons/fa";
import { useFormik} from "formik";
import banner from "."
import * as Yup from "yup"
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { formtDate } from "../../../config/function";

const BannerEditForm = () => {
    const navigate = useNavigate();
    const params = useParams()

    const [detail, setDetail] = useState()

    const validationSchema = Yup.object({
        title: Yup.string().required(),
        link: Yup.string().url().nullable(),
        startDate: Yup.date().required(),
        endDate: Yup.date().min(Yup.ref('startDate')).required(),
        status: Yup.string().matches(/active|inactive/).required(),
        image: Yup.string().nullable(),
    })

    let formik = useFormik({
        initialValues:{
            title: "",
            link: "",
            startDate: "",
            endDate: "",
            status: "",
            image: {}

        },
        validationSchema: validationSchema,

         onSubmit:async (values) => {
            try{
                if(typeof values.image != 'object'){
                    delete values.image
                }
                // submit
                const response = await banner.bannerSvc.updateBanner(values, params.id)
                toast.success(response.msg)
                navigate('/admin/banner')

            } catch(error) {
                // TODO: Debug for error 
                toast.error("Cannot Edit banner. Retry again after reloading the page...")
            }
        }
    })

        const getBanneDetail = async () =>{
            try{
                let response = await banner.bannerSvc.getBannerById(params.id)
                setDetail(response.result);
            }catch(exception){
                toast.error("Banner cannot be fetched")
                navigate('/admin/banner')
            }
        }

        useEffect( () => {
            if(detail){
                formik.setValues({
                    title: detail.title,
                    link: detail.link,
                    startDate: detail.startDate,
                    endDate: detail.endDate,
                    status: detail.status,
                    image: detail.image
                })
            }
        },
         [detail])

    useEffect(() => {
        //get detail
        getBanneDetail()
    }, [])

    return (
        <>
            <Container fluid className="px-4">

                <Row>
                    <Col sm={12} md={6}>
                        <h1 className="mt-4">
                            Banner Edit Page
                        </h1>
                    </Col>
                    <Col md={6} sm={12} className="d-none d-md-block">
                        <NavLink className={"btn btn-sm btn-success mt-5 float-end"} to="/admin/banner">
                            <FaArrowLeft />Go To List
                        </NavLink>
                    </Col>
                </Row>

                <Breadcrumb className="mb-4">
                    <Breadcrumb.Item>
                        <NavLink to="/admin">Dashboard</NavLink>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item>
                        <NavLink to="/admin/banner">Banner Listing</NavLink>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item active>Banner Edit</Breadcrumb.Item>
                </Breadcrumb>

                <Card className="mb-4">
                    <Card.Body>
                        <Form onSubmit={formik.handleSubmit}>
                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Title:</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        placeholder="Enter Banner title..."
                                        required
                                        onChange={formik.handleChange}
                                        value={formik.values?.title}
                                        size="sm" />
                                    <span className="text-danger">{formik.errors?.title}</span>
                                </Col>
                            </Form.Group>

                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Link:</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="url"
                                        name="link"
                                        onChange={formik.handleChange}
                                        value={formik.values?.link}
                                        placeholder="Enter Banner link..."
                                        size="sm" />
                                    <span className="text-danger">{formik.errors?.link}</span>
                                </Col>
                            </Form.Group>

                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Date(Start-End):</Form.Label>
                                <Col sm={9}>
                                    <Row>
                                        <Col sm={6}>
                                            <Form.Control
                                                type="date"
                                                name="startDate"
                                                onChange={formik.handleChange}
                                                value={formik.values?.startDate? formtDate(formik.values.startDate) : ""}
                                                placeholder="Start Date"
                                                size="sm" />
                                                 <span className="text-danger">{formik.errors?.startDate}</span>
                                        </Col>
                                        <Col sm={6}>
                                            <Form.Control
                                                type="date"
                                                name="endDate"
                                                value={formik.values?.endDate ? formtDate(formik.values.endDate) : ""}
                                                placeholder="End Date"
                                                onChange={formik.handleChange}
                                                size="sm" />
                                                 <span className="text-danger">{formik.errors?.endDate}</span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Form.Group>

                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Status:</Form.Label>
                                <Col sm={9}>
                                    <Form.Select
                                    name="status"
                                    required
                                    onChange={formik.handleChange}
                                    value={formik.values?.status}
                                    size="sm">

                                        <option>--Select any one</option>
                                        <option value={'active'}>Publish</option>
                                        <option value={'inactive'}>Un-Publish</option>

                                    </Form.Select>
                                    <span className="text-danger">{formik.errors?.status}</span>
                                </Col>
                                </Form.Group>

                                <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Image:</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        placeholder="Enter Image"
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
                                        size="sm" />
                                     <span className="text-danger">{formik.errors?.image}</span>
                                </Col>
                            </Form.Group>

                            <Form.Group className="row mb-3">
                                <Col sm={{offset:3, span:9}}>
                                    <Button variant="success" type="submit" size="sm" className="me-4">
                                        <FaPaperPlane/>Submit
                                    </Button>
                                    <Button variant="danger" type="reset" size="sm">
                                        <FaRedo/>Cancel
                                    </Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>

        </>
    )
}

export default BannerEditForm