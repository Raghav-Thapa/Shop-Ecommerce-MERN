import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { NavLink, useNavigate } from "react-router-dom"
import "../../../assets/css/header.css"
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux"
import category from "../../admin/category"
import brand from "../../admin/brand"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import SplitButton from 'react-bootstrap/SplitButton';


export const HeaderSection = () => {
    const loggedInUser = useSelector((roort) => {
        return roort.User.loggedInUser
    })

    const navigate = useNavigate()
    const logout = (e) => {
        e.preventDefault()
        localStorage.clear()
        // localStorage.removeItem("accessToken")
        // localStorage.removeItem("refreshToken")
        // localStorage.removeItem("user")
        // toast.success("Thank you for using")
        navigate("/login")
    }

    const [cats, setCats] = useState();
    const [brands, setBrands] = useState();

    const loadCategories = useCallback(async () => {
        let response = await category.categorySvc.listAllHomeCategories(20, 1);
        setCats(response.result)
    }, [])

    const loadBrands = useCallback(async () => {
        let response = await brand.brandSvc.listAllHomeBrands(20, 1);
        setBrands(response.result)
    }, [])

    useEffect(() => {
        loadCategories()
        loadBrands()
    }, [])


    const styles = {
        text: {
            marginLeft: '-25px',
            color: 'grey',

        },
    };

    return (
        <>
            <header>

                <Navbar expand="lg" bg="light" data-bs-theme="light">
                    <Container className="navs">
                        {/* <Navbar.Brand href="#home">My Website</Navbar.Brand> */}
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <NavLink to="/" className="marginright navv nav-link">HOME</NavLink>
                                <NavLink to="/about-us" className="marginright navv nav-link">ABOUT US</NavLink>

                                <NavDropdown title="CATEGORIES" id="categories" className="marginright navv">
                                    {
                                        cats && cats.map((cat, index) => (
                                            <NavLink key={index} to={`/category/${cat.slug}`} className={"dropdown-item"}>
                                                {cat.name}
                                            </NavLink>
                                        ))
                                    }

                                </NavDropdown>

                                <NavDropdown title="BRANDS" id="brands" className="marginright navv">

                                    {
                                        brands && brands.map((brand, index) => (
                                            <NavLink key={index} to={`/brand/${brand.slug}`} className={"dropdown-item"}>
                                                {brand.name}
                                            </NavLink>

                                        ))
                                    }

                                </NavDropdown>

                                {/* <Nav.Link href="#sale" className="marginright navv">SALE</Nav.Link> */}
                                <Nav.Link href="#contact" className="marginright navv">CONTACT US</Nav.Link>


                                <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                                    <li className="nav-item dropdown ">
                                        <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                                        <ul className="dropdown-menu dropdown-menu-end admin-menu" aria-labelledby="navbarDropdown">


                                            {
                                                loggedInUser ? <>
                                                    <li><NavLink className="dropdown-item" to={'/' + loggedInUser.role}>
                                                        {loggedInUser.name}
                                                    </NavLink></li></> :
                                                    <>
                                                        <li><NavLink className="dropdown-item" to="login">Login</NavLink></li>
                                                        <li><NavLink className="dropdown-item" to="signup">Sign Up</NavLink></li>
                                                    </>
                                            }


                                            <li><hr className="dropdown-divider" /></li>


                                            <li><a className="dropdown-item" onClick={logout} href="#!">Logout</a></li>
                                        </ul>
                                    </li>
                                </ul>

                                {
                                    loggedInUser ? <>
                                        <NavLink className="mt-2" to={'/' + loggedInUser.role} style={styles.text}> {loggedInUser?.name}</NavLink>
                                    </> :
                                        <>

                                        </>
                                }




                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
    )
}
