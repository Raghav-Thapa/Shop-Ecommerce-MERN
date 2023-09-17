import { Col, Container, Row } from "react-bootstrap"
// import image from "../../assets/images/aboutus-1.jpeg"
import { styled } from "styled-components"
const AboutBanner = styled.div`
    max-width: 100%
`
const AboutUs = () => {
    return (<>
        <AboutBanner>
            <img src="" className="img img-fluid"/>
        </AboutBanner>

        <Container className="my-5 bg-light p-3">
            <Row>
                <Col sm="12">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum harum, iste illum pariatur reiciendis dolor. Sed maxime assumenda, dolore consectetur neque qui pariatur mollitia quod, culpa, porro eligendi beatae nobis. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid repellat exercitationem enim quis non vero dolor illum omnis eius quas ex animi explicabo expedita neque, consectetur voluptatum architecto doloribus dolore.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum harum, iste illum pariatur reiciendis dolor. Sed maxime assumenda, dolore consectetur neque qui pariatur mollitia quod, culpa, porro eligendi beatae nobis. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem placeat ipsam, culpa eum vitae, ex officia, tempore nihil iste sit vel est. Labore modi doloremque consequuntur recusandae ad, tempore voluptatum!</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum harum, iste illum pariatur reiciendis dolor. Sed maxime assumenda, dolore consectetur neque qui pariatur mollitia quod, culpa, porro eligendi beatae nobis. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae rem reprehenderit reiciendis assumenda voluptates culpa possimus velit unde quibusdam. Error illum iusto blanditiis dolorem at et fuga enim sequi doloremque?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum harum, iste illum pariatur reiciendis dolor. Sed maxime assumenda, dolore consectetur neque qui pariatur mollitia quod, culpa, porro eligendi beatae nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, facere soluta earum consectetur exercitationem itaque, quos delectus eligendi iusto quae nulla eveniet rem nostrum sequi, quis neque culpa expedita et?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum harum, iste illum pariatur reiciendis dolor. Sed maxime assumenda, dolore consectetur neque qui pariatur mollitia quod, culpa, porro eligendi beatae nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit voluptatem laborum deserunt explicabo vero consectetur modi aperiam eos minus quam autem officia suscipit similique obcaecati corporis quos, accusamus minima necessitatibus.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum harum, iste illum pariatur reiciendis dolor. Sed maxime assumenda, dolore consectetur neque qui pariatur mollitia quod, culpa, porro eligendi beatae nobis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quod ab sint dicta. Quam voluptate aliquid illo fugit, repudiandae, ratione placeat expedita porro delectus necessitatibus voluptates error ipsa facere beatae.</p>
                </Col>
            </Row>
        </Container>
    </>)
}
export default AboutUs