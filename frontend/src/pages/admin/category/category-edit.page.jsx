import { Container, Breadcrumb, Card, Row, Col, Form, Button } from "react-bootstrap"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { FaArrowLeft, FaMinus, FaPaperPlane, FaPlus, FaRedo } from "react-icons/fa";
import { useFormik } from "formik";
import category from "."
import * as Yup from "yup"
import { toast } from "react-toastify";
import { useEffect, useState, useCallback } from "react";
import Select from 'react-select'
import brand from "../brand";


const CategoryEditForm = () => {
    const navigate = useNavigate();
    const [attributes, setAttributes] = useState()
    const [detail, setDetail] = useState()
    const params = useParams()

    const addAttribute = () => {
        let attr = {
            key: null,
            value: null
        }
        let allAttr = []
        if (attributes) {
            allAttr = [...attributes]
        }
        allAttr.push(attr);

        setAttributes(
            allAttr
        )
    }

    const [brands, setBrands] = useState()

    const getAllBrands = useCallback(async () => {
        try {
            let brandList = await brand.brandSvc.listAllBrands();
            let opts = brandList.result.map((brand) => {
                return { value: brand._id, label: brand.name }
            })
            setBrands(opts)
        } catch (exception) {
            // 
        }
    }, [])

    const [cats, setCats] = useState()

    const getAllCats = useCallback(async () => {
        try {
            let listCats = await category.categorySvc.listAllCategorys(100, 1)
            setCats(listCats.result)
        } catch (exception) {
            // 
        }
    }, [])


    useEffect(() => {
        getAllBrands()
        getAllCats()
    }, [])



    const removeAttribute = (index) => {
        let allAttrs = [...attributes]
        allAttrs.splice(index, 1)
        setAttributes(allAttrs)
    }
    const validationSchema = Yup.object({
        name: Yup.string().required(),
        parent: Yup.string(),
        status: Yup.string()
            .matches(/active|inactive/)
            .required(),
        brands: Yup.array(),
        attributes: Yup.array(),
        image: Yup.string().required(),
    })

    let formik = useFormik({
        initialValues: {
            name: "",
            parent: "",
            status: "",
            brands: [],
            attributes: [{ key: null, value: [] }],
            image: {},
        },
        validationSchema: validationSchema,

        onSubmit: async (values) => {
            try {
                if (typeof values.image != 'object') {
                    delete values.image
                }
                // submit
                values.brands = values.brands.map((item) => item.value)
                values.attributes = attributes;


                const response = await category.categorySvc.updateCategory(values, params.id)
                toast.success(response.msg)
                navigate('/admin/category')
            } catch (error) {
                // TODO: Debug for error 
                toast.error("Cannot create category. Retry again after reloading the page...")
            }
        }
    })

    const getCategoryDetail = async () => {
        try {
            let response = await category.categorySvc.getCategoryById(params.id)

            setDetail(response.result);
        } catch (exception) {
            toast.error("Category Cannot be fetched at this moment")
            navigate('/admin/category')
        }
    }

    useEffect(() => {
        if (detail) {
            formik.setValues({
                name: detail.name,
                parent: detail.parent?._id,
                status: detail.status,
                image: detail.image,
                brands: (detail.brands && detail.brands.length) ? (detail.brands.map((item) => ({ value: item._id, label: item.name }))) : null,
                attributes: detail.attributes,
            })
        }
    },
        [detail])

    useEffect(() => {
        //get detail
        getCategoryDetail()
    }, [])


    return (
        <>
            <Container fluid className="px-4">

                <Row>
                    <Col sm={12} md={6}>
                        <h1 className="mt-4">
                            Category Edit Page
                        </h1>
                    </Col>
                    <Col md={6} sm={12} className="d-none d-md-block">
                        <NavLink className={"btn btn-sm btn-success mt-5 float-end"} to="/admin/category">
                            <FaArrowLeft />Go To List
                        </NavLink>
                    </Col>
                </Row>

                <Breadcrumb className="mb-4">
                    <Breadcrumb.Item>
                        <NavLink to="/admin">Dashboard</NavLink>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item>
                        <NavLink to="/admin/category">Category Listing</NavLink>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item active>Category Edit</Breadcrumb.Item>
                </Breadcrumb>

                <Card className="mb-4">
                    <Card.Body>
                        <Form onSubmit={formik.handleSubmit}>
                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Name:</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        placeholder="Enter Category title..."
                                        required
                                        onChange={formik.handleChange}
                                        value={formik.values?.name}
                                        size="sm" />
                                    <span className="text-danger">{formik.errors?.title}</span>
                                </Col>
                            </Form.Group>

                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Sub-category Of:</Form.Label>
                                <Col sm={9}>
                                    <Form.Select
                                        name="parent"
                                        onChange={formik.handleChange}
                                        value={formik.values?.parent}
                                        size="sm">

                                        <option>--Select any one</option>
                                        {
                                            cats && cats.map((cat, index) => (
                                                <option value={cat._id}>{cat.name}</option>
                                            ))
                                        }
                                    </Form.Select>
                                    <span className="text-danger">{formik.errors?.parent}</span>
                                </Col>
                            </Form.Group>

                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Brands: </Form.Label>
                                <Col sm={9}>
                                    <Select options={brands} value={formik.values?.brands} isMulti name="brands"
                                        onChange={(selectedOpts) => {
                                            formik.setValues({
                                                ...formik.values,
                                                brands: selectedOpts
                                            })
                                        }} />
                                    <span className="text-danger">{formik.errors?.brands}</span>
                                </Col>
                            </Form.Group>


                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Atrributes: </Form.Label>
                                <Col sm={9}>

                                    {
                                        attributes && attributes.map((item, key) => (
                                            <Row className="mb-3" key={key}>
                                                <Col sm={5}>
                                                    <Form.Control
                                                        type="text"
                                                        size="sm" placeholder="Attribute Key"
                                                        value={item.key}
                                                        onChange={(e) => {
                                                            let allAttrs = [...attributes]
                                                            allAttrs[key].key = e.target.value
                                                            setAttributes(allAttrs)
                                                        }}
                                                    />
                                                </Col>
                                                <Col sm={5}>
                                                    <Form.Control
                                                        onChange={(e) => {
                                                            let allAttrs = [...attributes]
                                                            allAttrs[key].value = [e.target.value]
                                                            setAttributes(allAttrs)
                                                        }}
                                                        value={item.value}
                                                        type="text" size="sm" placeholder="Attribute value" />
                                                </Col>
                                                <Col sm={2}>
                                                    <Button size="sm" variant="danger" onClick={(e) => {
                                                        removeAttribute(key)
                                                    }}>
                                                        <FaMinus />
                                                    </Button>
                                                </Col>
                                            </Row>
                                        ))
                                    }

                                    <Row>
                                        <Col sm={12}>
                                            <Button variant="success" type="button" size="sm" onClick={addAttribute}>
                                                <FaPlus /> Add More
                                            </Button>
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
                                <Col sm={{ offset: 3, span: 9 }}>
                                    <Button variant="success" type="submit" size="sm" className="me-4">
                                        <FaPaperPlane />Submit
                                    </Button>
                                    <Button variant="danger" type="reset" size="sm">
                                        <FaRedo />Cancel
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

export default CategoryEditForm