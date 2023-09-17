import { FaFacebook, FaTwitter, FaShoppingCart, FaUserAlt } from "react-icons/fa"
import { IoIosNotifications } from "react-icons/io"
import { RiInstagramFill, RiWhatsappFill } from "react-icons/ri"
import "../../../assets/css/topbar.css"
import logo from "../../../assets/images/logo.png"
import * as React from 'react';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"


export const TopBarSection = () => {
    const cartQty = useSelector((root) => {
        let cartData = root.cart.cart
        let qty = 0;

        if(cartData) {
            cartData.map((item) => {
              qty += Number(item.qty)
            })
          }
          return qty;
        })


    return (
        <div className="topbar">
            <div className="icons container ">
                <FaFacebook className="marginright" />
                <FaTwitter className="marginright" />
                <RiInstagramFill className="marginright" />
                <RiWhatsappFill className="marginright" />
                <img src={logo} alt="" srcset="" className="image" />

                {/* <FaShoppingCart className="cart marginright" />(0) */}
                <Badge className="cart marginright" badgeContent={cartQty ?? 0} color="primary">
                    <NavLink to="/cart"><ShoppingCartIcon color="action" /></NavLink>
                </Badge>

                <IoIosNotifications className="notifi" />


                {/* <a href="/admin" className="adminn"><FaUserAlt /></a> */}

            </div>
        </div>
    )

}

