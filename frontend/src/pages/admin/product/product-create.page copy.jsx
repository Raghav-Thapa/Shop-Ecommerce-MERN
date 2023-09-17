import { Container, Breadcrumb, Card, Row, Col, Form, Button } from "react-bootstrap"
import { NavLink, useNavigate } from "react-router-dom"
import { FaArrowLeft, FaPaperPlane, FaMinus, FaRedo, FaPlus } from "react-icons/fa";
import { useFormik } from "formik";
import product from "."
import * as Yup from "yup"
import { toast } from "react-toastify";
import Select from 'react-select'
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import category from "../category";
import brand from "../brand";
import user from "../user"



import { TextAreaInput } from "../../../components/from.components";


const ProductCreateForm = () => {
    const navigate = useNavigate();

    const[categories, setCategories] = useState();
    const[brands, setBrands] = useState();
    const[sellers, setSellers] = useState();

    let loggedinUser = useSelector((root) => {
        return root.User.loggedInUser;
    })



    const loadCategories = useCallback(async() => {
        try{
            let allCats = await category.categorySvc.listAllCategorys();
            if(allCats){
               let catOps = allCats.result.map((item) => {
                    return{
                        value: item._id,
                    label:item.name                    }
                })
                setCategories(catOps)
            }

        }catch(exception){
            console.log(exception)
        }
    }, [])

    const loadBrands = useCallback(async() => {
        try{
            let allBrands = await brand.brandSvc.listAllBrands()
            if(allBrands){
               let brandOps = allBrands.result.map((user) => {
                    return{
                        value: user._id,
                    label:user.name                    }
                })
                setBrands(brandOps)
            }

        }catch(exception){
            console.log(exception)
        }
    }, [])

    const loadSellers = useCallback(async() => {
        try{
            let allSellers = await user.userSvc.listAllUsers()
            if(allSellers){
               let sellerOps = allSellers.result.map((item) => {
                    return{
                        value: item._id,
                    label:item.name }
                })
                setSellers(sellerOps)
            }

        }catch(exception){
            console.log(exception)
        }
    }, [])

    useEffect(() =>{
        loadCategories()
        loadBrands()
        loadSellers()
    } ,[])

    const [attributes, setAttributes] = useState()

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

    const removeAttribute = (index) => {
        let allAttrs = [...attributes]
        allAttrs.splice(index, 1)
        setAttributes(allAttrs)
    }

    const validationSchema = Yup.object({
        name: Yup.string().required(),
        status: Yup.string()
            .matches(/active|inactive/)
            .required(),
        detail: Yup.string().required(),
        categories: Yup.array().of(Yup.object()).nullable().default(null),
        attributes: Yup.array().of(Yup.object()).nullable().default(null),
        price: Yup.number().min(1).required(),
        discount: Yup.number().min(0).max(99).nullable().default(0),
        isFeatured: Yup.boolean().default(false),
        brand: Yup.object().nullable().default(null),
        sellerId: Yup.object().nullable().default(loggedinUser?._id),
        images: Yup.array()
    })

   
    let formik = useFormik({
        initialValues: {
            name: "",
            detail: "",
            categories: null,
            attributes: "",
            price: "",
            discount: 0,
            isFeatured: false,
            brand: null,
            sellerId: loggedinUser?._id,
            status: "inactive",
            images: [],

        },
        validationSchema: validationSchema,

        onSubmit: async (values) => {
            try {
                values.categories = (values.categories.map((cat) => cat.value)).join(",");
                values.brand = values.brand.value
                values.sellerId = values.sellerId?.value ?? null
                values.attributes = JSON.stringify(attributes);

                const formData = new FormData();
                console.log(values.images);

                if(values.images){
                    values.images.map((image) => {
                      if(typeof image === 'object'){
                        formData.append('images', image, image.filename)
                      }

                    })
                    delete values.images;

                  }

                  Object.keys(values).map((field) => {
        
                    formData.append(field, values[field])
                  })


                const response = await product.productSvc.createProduct(values)
                toast.success(response.msg)
                // navigate('/admin/product')
                
            } catch (error) {
                // TODO: Debug for error 
                toast.error("Cannot create product. Retry again after reloading the page...")
            }
        }

    })

    return (
        <>
            <Container fluid className="px-4">

                <Row>
                    <Col sm={12} md={6}>
                        <h1 className="mt-4">
                            Product Create Page
                        </h1>
                    </Col>
                    <Col md={6} sm={12} className="d-none d-md-block">
                        <NavLink className={"btn btn-sm btn-success mt-5 float-end"} to="/admin/product">
                            <FaArrowLeft />Go To List
                        </NavLink>
                    </Col>
                </Row>

                <Breadcrumb className="mb-4">
                    <Breadcrumb.Item>
                        <NavLink to="/admin">Dashboard</NavLink>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item>
                        <NavLink to="/admin/product">Product Listing</NavLink>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item active>Product Create</Breadcrumb.Item>
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
                                        placeholder="Enter Product title..."
                                        required
                                        onChange={formik.handleChange}
                                        value={formik.values?.name}
                                        size="sm" />
                                    <span className="text-danger">{formik.errors?.name}</span>
                                </Col>
                            </Form.Group>

                            <TextAreaInput
                                label="Detail"
                                name="detail"
                                value={formik.values?.detail}
                                changeEvent={(data) => {
                                    if (data) {
                                        formik.setValues({
                                            ...formik.values,
                                            detail: data
                                        })
                                    }
                                }}
                                placeholder="Enter Detail..."
                                error={formik.errors?.detail}
                            />

                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Categories:</Form.Label>
                                <Col sm={9}>
                                    <Select
                                        options={categories}
                                        isMulti
                                        name="categories"
                                        value={formik.values?.categories}
                                        onChange={(selectedOpts) => {
                                            formik.setValues({
                                                ...formik.values,
                                                categories: selectedOpts
                                            })
                                        }} />
                                    <span className="text-danger">{formik.errors?.categories}</span>
                                </Col>
                            </Form.Group>

                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Price:</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="number"
                                        name="price"
                                        placeholder="Enter Product price..."
                                        required
                                        onChange={formik.handleChange}
                                        value={formik.values?.price}
                                        size="sm" />
                                    <span className="text-danger">{formik.errors?.price}</span>
                                </Col>
                            </Form.Group>

                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Discount:</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="number"
                                        name="discount"
                                        placeholder="Enter Product discount..."
                                        onChange={formik.handleChange}
                                        value={formik.values?.discount}
                                        size="sm" />
                                    <span className="text-danger">{formik.errors?.discount}</span>
                                </Col>
                            </Form.Group>

                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Brand:</Form.Label>
                                <Col sm={9}>
                                    <Select
                                        options={brands}
                                        name="brand"
                                        value={formik.values?.brand}
                                        onChange={(selectedOpts) => {
                                            formik.setValues({
                                                ...formik.values,
                                                brand: selectedOpts
                                            })
                                        }} />
                                    <span className="text-danger">{formik.errors?.brand}</span>
                                </Col>
                            </Form.Group>

                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Featured:</Form.Label>
                                <Col sm={9}>
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch"
                                        label={formik.values.isFeatured ? "No" : "Yes"}
                                        onChange={(e) => {
                                            formik.setValues({
                                                ...formik.values,
                                                isFeatured: e.target.checked
                                            })
                                        }}
                                    />
                                    <span className="text-danger">{formik.errors?.isFeatured}</span>
                                </Col>
                            </Form.Group>



                            <Form.Group className="row mb-3">
                                <Form.Label className="col-sm-3">Seller:</Form.Label>
                                <Col sm={9}>
                                    <Select
                                        options={sellers}
                                        name="sellerId"
                                        value={formik.values?.sellerId}
                                        onChange={(selectedOpts) => {
                                            formik.setValues({
                                                ...formik.values,
                                                sellerId: selectedOpts
                                            })
                                        }} />
                                    <span className="text-danger">{formik.errors?.sellerId}</span>
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
                                <Form.Label className="col-sm-3">Images:</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        multiple
                                        placeholder="Enter Image"
                                        onChange={(e) => {
                                            let files = Object.values(e.target.files);

                                            let images = [];
                                            let errors = [];
                                            files.map((image) => {

                                                let ext = (image.name.split(".")).pop();
                                                if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'].includes(ext.toLowerCase())) {
                                                    images.push(image)

                                                } else {
                                                    errors.push("file format not supported")
                                                }
                                            })
                                            if (errors.length) {
                                                formik.setErrors({
                                                    ...formik.errors,
                                                    images: errors.join("\n")
                                                })
                                            } else {
                                                formik.setValues({
                                                    ...formik.values,
                                                    images: images
                                                })
                                            }

                                        }}
                                        size="sm" />
                                    <span className="text-danger">{formik.errors?.images}</span>
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

export default ProductCreateForm