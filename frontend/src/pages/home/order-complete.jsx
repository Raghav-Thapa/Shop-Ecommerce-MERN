import { Container } from "react-bootstrap"
import order from "../../assets/images/order.gif"
import * as React from 'react';
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";


const OrderComplete = () => {
    return(<>
        <Container fluid className="bg-dark" >
            <img src={order} style={{width:"800px" }}></img>
           <NavLink to="/"><Button size="large" style={{marginLeft:"200px", width:"300px", height:"100px", borderRadius:"0px 50px 0px 50px "}}  variant="contained">Shop More</Button></NavLink>
        </Container>
    </>)
}

export default OrderComplete