import { NavLink } from "react-router-dom"
import { Col, Card } from "react-bootstrap"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BrandGridItem = ({brand}) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        // nextArrow: <NextArrow />,
        // prevArrow: <PrevArrow />,


    };
    return (<>

<Slider {...settings}>

        <Col sm={6} md={4} lg={3} className="mb-3">
            <Card style={{ marginRight: "30px" }}>

                <NavLink to={`/brand/${brand.slug}`}>
                    <Card.Img variant="top" src={import.meta.env.VITE_IMAGE_URL+"/brands/"+brand.image} />
                    <Card.Body>
                        <Card.Title style={{textDecoration:"none", color:"black"}} className="text-center">
                            {brand.name}</Card.Title>
                    </Card.Body>
                </NavLink>
            </Card>
        </Col>
        </Slider>

    </>)
}

export default BrandGridItem