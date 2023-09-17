import { Outlet, NavLink  } from "react-router-dom"
import { HeaderSection } from "../home/component/header.component"
import { TopBarSection } from "../home/component/topbar.component"
import { Navbar, Container, Col, NavDropdown, Nav, ListGroup, Row } from "react-bootstrap";
import { styled } from "styled-components";
import logo from "../../assets/images/logo.png"

const FooterComponent = styled.section`
    background-color: #dddddd
    min-height: 500px
`

const HomePageLayout = () => {
    return(
        <>
        <TopBarSection/>
        <HeaderSection/>

        <Outlet/>

        <Navbar expand="lg" className="bg-body-tertiary">
        <FooterComponent>

            <Container className="py-5 mx-5">
                <Row>
                    <Col sm={12} md={4}>
                        <img src={logo} style={{width: "70%"}} className="img img-fluid"></img>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, hic earum, dolorum aut similique, obcaecati alias nihil asperiores ipsum aliquam provident nesciunt perferendis consequatur ea et voluptatum deleniti doloremque veniam?
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam nisi qui adipisci porro iste nam ex? Non provident minus facilis suscipit quia id. Accusantium eaque magni itaque nihil iusto quae?
                            
                        </p>
                    </Col>
                    <Col sm={12} md={4}>
                        <h4>Quick Actions</h4>
                        <hr/>
                        <ListGroup>
                            <ListGroup.Item>
                                <NavLink className="nam-link" to="/about-us">
                                    About Us
                                </NavLink>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <NavLink className="nam-link" to="/privacy-policy">
                                    Privacy Policy
                                </NavLink>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <NavLink className="nam-link" to="/terms-and-conditions">
                                    Terms and Conditions
                                </NavLink>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <NavLink className="nam-link" to="/delivery-policy">
                                    Delivery Policy
                                </NavLink>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <NavLink className="nam-link" to="/feedback-link">
                                    Feedback Links
                                </NavLink>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col sm={12} md={4}>
                        <h4>Where we are</h4>

                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.713119781052!2d85.32620194886643!3d27.695260255687835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a4ead6b4d1%3A0xa7a2e08cc13ac414!2z4KSf4KSC4KSVIOCkquCljeCksOCkuOCkvuCkpiDgpJjgpYHgpK7gpY3gpKTgpYAg4KS44KSh4KSVLCBLYXRobWFuZHUgNDQ2MDA!5e0!3m2!1sen!2snp!4v1694423864462!5m2!1sen!2snp"
                         width="500" 
                         height="300" 
                         style={{border: "0px"}} 
                         allowfullscreen="" 
                         loading="lazy" 
                         referrerpolicy="no-referrer-when-downgrade">

                         </iframe>

                    </Col>
                </Row>
            </Container>

        </FooterComponent>
      </Navbar>
        
        
        <footer></footer>
        </>
    )
}

export default HomePageLayout
