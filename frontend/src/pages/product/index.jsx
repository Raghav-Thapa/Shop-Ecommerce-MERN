import { useCallback, useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import product from "../admin/product";
import { Col, Container, Row, Carousel, Badge, Form, Button  } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setCart, setCartAPI } from "../../reducer/product.reducer";

const ProductDetail = () => {
    const navigate = useNavigate();
    const params = useParams();
    let [loading, setLoading] = useState(true);
    let [detail, setDetail] = useState();

    let [qty, setQty] = useState(0);

    const loadProductDetail = useCallback(async() => {
        try {
            let response = await product.productSvc.getProductBySlug(params.slug);
            setDetail(response.result)
        } catch(exception) {
            toast.warn("Product detail cannot be fetched")
        } finally {
            setLoading(false)
        }
    }, [params])
    useEffect(() => {
        loadProductDetail()
    },[params])

    let loggedInuser = useSelector((root) => {
        return root.User.loggedInUser
    }) 

    const dispatch = useDispatch();

    const addToCart = (e) => {
        e.preventDefault();
        if(!loggedInuser){
            localStorage.setItem("redirect", '/product/'+detail.slug)
            toast.warn("Login first to create Cart")
            navigate("/login")
        }
        console.log(loggedInuser)

        let currentItem = {
            productId: detail._id,
            qty: Number(qty)
        }

        dispatch(setCart(currentItem))

        dispatch(setCartAPI(currentItem))

        toast.success("Your product has been added in the cart.")

    }
    return (<>
        <Container className="my-5 bg-light">
            {
                loading ? <>Loading...</> : <>
                    <Row>
                        <Col sm={12} md={4}>
                            <Carousel data-bs-theme="dark">
                                {
                                    detail && detail.images.map((item, index) => (
                                        <Carousel.Item key={index}>
                                        
                                            <img src={import.meta.env.VITE_IMAGE_URL+"/products/"+item} className="img img-fluid" />
                                        </Carousel.Item>
                                    ))
                                }
                            </Carousel>
                        </Col>
                        <Col sm={12} md={8}>
                            <h4>{detail.name}</h4>
                            <p>
                                <NavLink to="/brand/apple" className={"me-3"}>
                                    <Badge bg="info">{detail.brand.name}</Badge>
                                </NavLink>

                                {
                                    detail.categories && detail.categories.map((cat) => (
                                        
                                        <NavLink key={cat._id} to={`/category/${cat.slug}`} className={"me-3"}>
                                            <Badge bg="warning">{cat.name}</Badge>
                                        </NavLink>
                                        
                                    ))
                                }
                            </p>
                            <p>
                                <span>NPR. {detail.afterDiscount}</span>
                                {
                                    detail.discount && detail.discount > 0 ?  <del className="mx-3 text-danger">Npr. {detail.price}</del> : ""
                                }
                            </p>
                            ....
                            <Row>
                                <Col sm="6">
                                    <Form.Control
                                        type="number"
                                        name="qty"
                                        onChange={(e) => {
                                            setQty(e.target.value)
                                        }}
                                        required 
                                        size="sm"
                                        placeholder="Enter your quantity"
                                    ></Form.Control>
                                </Col>
                                <Col sm={6}>
                                    <Button variant="warning" className="text-white" size="sm" onClick={addToCart}>
                                        <FaPlus /> &nbsp;
                                        Add to Cart
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} dangerouslySetInnerHTML={{__html: detail.detail}}></Col>
                    </Row>
                </>
            }
        </Container>
    </>)
}

export default ProductDetail