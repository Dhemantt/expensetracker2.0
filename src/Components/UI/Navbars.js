import React from "react";
import { Button, Container, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import { useDispatch } from "react-redux";
import { Authsliceactions } from "../Store/Authslice";


const Navbars = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout=(e)=>{
        e.preventDefault()

        dispatch(Authsliceactions.logoutHandler())
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        navigate('/')
    }
    return (
        <>
            <Navbar bg='light' >
                <Container>
		        <Nav className="me-auto">
                    <Link style={{ color: "black",textDecoration:'none'}} to='/'>Home</Link>
                    <Link style={{ color: "black",textDecoration:'none',paddingLeft:20  }} to="/profile">Profile</Link>
                    <Link style={{ color: "black",textDecoration:'none',paddingLeft:20  }}>Product</Link>
                    <Link style={{ color: "black",textDecoration:'none',paddingLeft:20  }}>AboutUs</Link>
                    <Button style={{ marginLeft:"250%" }} variant="outline-danger"  onClick={logout}>Logout</Button>
                </Nav>    

                </Container>
            </Navbar>
        </>
    )
}

export default Navbars;