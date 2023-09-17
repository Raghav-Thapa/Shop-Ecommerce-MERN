import { Container, Card, Breadcrumb, Row, Col } from "react-bootstrap";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {FaArrowLeft} from "react-icons/fa";
import product from ".";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import ProductForm from "./product-form.component";

const ProductEditForm = () => {
    const navigate = useNavigate();
    const params = useParams()

    const [detail, setDetail] = useState()

    const handleSubmit = async(values) => {
        try{
            if(typeof values.image !== 'object'){
                delete values.image
            }

            const response = await product.productSvc.updateProduct(values, params.id)
            toast.success(response.msg)
            navigate('/admin/product')
        } catch(error) {
            // TODO: Debug for error 
            toast.error("Cannot create product. Retry again after reloading the page...")
        }
    }

    const getProductDetail = async () => {
        try {
            let response = await product.productSvc.getProductById(params.id)
            setDetail(response.result);
        } catch(exception){
            toast.error("Product Cannot be fetched at this moment")
            navigate('/admin/product')
        }
    }
    useEffect(() => {
        // get Detail
        getProductDetail()
    }, [])

    return (<>
        <Container fluid className="px-4">
            <Row>
                <Col sm={12} md={6}>
                    <h1 className="mt-4">Product Edit Page</h1>
                </Col> 
                <Col md={6} sm={12} className="d-none d-md-block">
                    <NavLink className={"btn btn-sm btn-success mt-5 float-end"} to ="/admin/product">
                        <FaArrowLeft/>    Go To List
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
                <Breadcrumb.Item active>Product Edit</Breadcrumb.Item>
            </Breadcrumb>

            <Card className="mb-4">
                <Card.Body>
                    {detail && <ProductForm 
                        submitAction={handleSubmit}
                        detail={{
                            name: detail.name,
                            detail: detail.detail, 
                            categories: detail.categories.map((cat) => { return {value: cat._id, label: cat.name} }),
                            price: detail.price, 
                            brand: {value: detail.brand._id, label: detail.brand.name},
                            discount: detail.discount, 
                            isFeatured: detail.isFeatured, 
                            sellerId: {value: detail.sellerId._id, label: detail.sellerId.name},
                            attributes: detail.attributes,
                            status: detail.status, 
                            images: detail.images
                        }}
                    />}
                </Card.Body>
            </Card>
        </Container>
    </>)
}

export default ProductEditForm;