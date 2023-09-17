import { Container, Row, Col, Button, Card } from "react-bootstrap"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import category from "../admin/category"
import product from "../admin/product"
import brand from "../admin/brand";
import { useCallback, useEffect, useState } from "react";

import { BannerSection } from "./component/banner.component"
import { NavLink } from "react-router-dom";
import CategoryGridItem from "./component/category-grid-list.component";
import SingleProductListGrid from "./component/single-product-list-grid.component";
import BrandGridItem from "./component/brand-grid-list.component";

export const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, backgroundColor: "#bf9959", borderRadius: "50%" }}
            onClick={onClick}
        >
            Next
        </div>
    );
};

export const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, backgroundColor: "#bf9959", borderRadius: "50%" }}
            onClick={onClick}
        >
            Prev
        </div>
    );
};

const HomePage = () => {

    const [cats, setCats] = useState();

    const loadCategories = useCallback(async () => {
        let response = await category.categorySvc.listAllHomeCategories(20, 1);
        setCats(response.result)
    }, [])

    const [productList, setProductList] = useState();

    const loadProducts = useCallback(async() => {
        let response = await product.productSvc.listHomeProducts(24, 1)
        setProductList(response.result)
      }, [])

    const [brandList, setBrandList] = useState();

    const loadBrands = useCallback(async() => {
        let response = await brand.brandSvc.listAllHomeBrands(20.1)
        setBrandList(response.result)
      }, [])

    useEffect(() => {
        loadCategories()
        loadProducts()
        loadBrands()
    }, [])

    const catSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,


    };

    const brandSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,


    };

    const prodSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,


    };

    return (
        <>

            <BannerSection />

            <Container fluid className="my-5 bg-light">
                <Row className="p-3">
                    <Col><h4 style={{ color: "#bf9959" }} className="text-center">CATEGORY LIST</h4></Col>
                </Row>

                <Row className="my-3 bg-light">
                    <div style={{ padding: "40px" }} >
                        <Slider {...catSettings}>

                            {
                                cats && cats.map((category, index) => (
                                    <CategoryGridItem key={index} category={category}>
                                        
                                    </CategoryGridItem>
                                ))
                            }
                        </Slider>
                    </div>
                </Row>
            </Container>

            <Container fluid className="my-5 bg-light">
                <Row className="p-3">
                    <Col><h4 style={{ color: "#bf9959" }} className="text-center">BRANDS</h4></Col>
                </Row>

                <Row className="my-3 bg-light">
                    <div style={{ padding: "40px" }} >
                        <Slider {...brandSettings}>

                            {
                                brandList && brandList.map((brand, index) => (
                                    <BrandGridItem key={index} brand={brand}>
                                        
                                    </BrandGridItem>
                                ))
                            }
                        </Slider>
                    </div>
                </Row>
            </Container>

            <Container fluid className="my-5 bg-light">
                <Row className="p-3">
                    <Col><h4 style={{ color: "#bf9959" }} className="text-center">JUST FOR YOU</h4></Col>
                </Row>

                <Row className="my-3 bg-light">
                    <div style={{ padding: "40px" }} >
                        <Slider {...prodSettings}>

                            {
                               productList && productList.map((prod, index) => (
                                <SingleProductListGrid 
                                  key={index}
                                  product={prod}
                                />
                                ))
                            }
                        </Slider>
                    </div>
                </Row>
            </Container>

        </>
    )
}

export default HomePage