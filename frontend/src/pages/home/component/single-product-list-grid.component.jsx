import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavLink } from "react-router-dom";
import { Col, Card, Badge } from "react-bootstrap";


const SingleProductListGrid = ({ product }) => {
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
    return (
      <>
      <Slider {...settings}>
        <Col sm={6} md={4} lg={3} className="mb-3">
          <Card style={{ marginRight: "30px" }}>
            <Card.Img variant="top" src={import.meta.env.VITE_IMAGE_URL+"/products/"+product.images[0]}></Card.Img>
            <Card.Body>
              <NavLink
                to={`/product/`+product.slug}
                style={{ textDecoration: "none", cursor: "pointer" }}
              >
                <h4
                  style={{
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  {product.name}
                </h4>
              </NavLink>
              <p>
                <span>NPR. {product.afterDiscount}</span>
                {
                  product.discount && <del className="mx-3 text-danger">Npr. {product.price}</del>
                }
              </p>
              <p>
                <NavLink to="/brand/apple" className={"me-3"}>
                  <Badge bg="info">{product.brand.name}</Badge>
                </NavLink>
  
                {
                  product.categories && product.categories.map((cat) => (
                      
                      <NavLink key={cat._id} to={`/category/${cat.slug}`} className={"me-3"}>
                          <Badge bg="warning">{cat.name}</Badge>
                      </NavLink>
                      
                  ))
                }
              </p>
              <NavLink
                to={`/product/`+product.slug}
                className={"btn btn-sm btn-warning text-white"}
              >
                View More
              </NavLink>
            </Card.Body>
          </Card>
        </Col>
        </Slider>
      </>
    );
  };
  
  export default SingleProductListGrid;