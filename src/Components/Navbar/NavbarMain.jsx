import React, { useContext, useState } from 'react'
import './NavbarMain.css'

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import logo from '../Assets/logo.PNG'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext';

import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { serverUrl } from '../../service/serverUrl';




function NavbarMain() {

    const [topRightModal, setTopRightModal] = useState(false);

    const toggleOpen = () => setTopRightModal(!topRightModal);



    const { getTotalCartItems, category, cartItems, removeCart } = useContext(ShopContext)


    const allItems = [];

    category.forEach(category => {
        category.category_items.forEach(item => {
            allItems.push(item);
        });
    });

    const itemSubtotals = allItems.map(item => cartItems[item.id] > 0 ? cartItems[item.id] * item.offer_price : 0);
    const totalItemSubtotal = itemSubtotals.reduce((acc, curr) => acc + curr, 0);

    const hasItemsInCart = allItems.some(item => cartItems[item.id] > 0);



    const formatPackGram = (value) => {
        if (value === 1) {
            return 'pack';
        } else if (value === 500) {
            return 'g';
        } else {
            return `${value}g`;
        }
    };

    return (
        <>

            <div className='navbar-fixed-top'>
                <Navbar className="navbar-1">
                    <Container className='navbar-1-container'>
                        <Navbar.Brand className='navbar-mail-phone'>
                            <p>97XXXXXX00</p>
                            <p>|</p>
                            <p>customer@foodflash.com</p>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Container>
                </Navbar>
                {/* navbar2 */}
                <Navbar className="navbar-2">
                    <Container className='navbar-2-container'>
                        <Navbar.Brand className='navbar2-logo'>
                            <Link to={'/'}> <img src={logo} alt="" /></Link>
                            <div className="search-box header">
                                <form>
                                    <div className='search-form'>
                                        <input type="text" id="search" className="input-text" placeholder="Find your products" />
                                        <button type="submit" title="Search" className="button"><i className="fa-solid fa-magnifying-glass"></i></button>
                                    </div>
                                </form>
                            </div>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="navbar-2-div">
                            <Navbar.Text>
                                <div className="navbar-2-cart-profile">

                                    {
                                        sessionStorage.getItem('auth-token')
                                            ?
                                            <Link to={'/customer/account'} style={{ textDecoration: "none" }}>
                                                <button className='nav2-btn'><i className="fa-regular fa-user"></i></button>
                                            </Link>
                                            :
                                            <Link to={'/customer/account/login'} style={{ textDecoration: "none" }}>
                                                <button className='nav2-btn'><i className="fa-regular fa-user"></i></button>
                                            </Link>

                                    }


                                    <button className='nav2-btn' onClick={toggleOpen}><i className="fa-solid fa-cart-shopping"></i></button>
                                    <div className="nav-cart-count">{getTotalCartItems()}</div>

                                    <MDBModal
                                        animationDirection='top'
                                        open={topRightModal}
                                        tabIndex='-1'
                                        onClose={() => setTopRightModal(false)}
                                    >

                                        <MDBModalDialog position='top-right' side='true'>
                                            <MDBModalContent>
                                                <MDBModalHeader>
                                                    {
                                                        hasItemsInCart ?
                                                            <MDBModalTitle>There is <span>{getTotalCartItems()} item</span> in your cart.</MDBModalTitle>
                                                            :
                                                            <MDBModalTitle>You have no items in your shopping cart.</MDBModalTitle>

                                                    }
                                                    <MDBBtn
                                                        color='none'
                                                        className='btn-close btn-close-white'
                                                        onClick={toggleOpen}
                                                    ></MDBBtn>
                                                </MDBModalHeader>
                                                {
                                                    hasItemsInCart ?
                                                        <MDBModalBody>
                                                            {
                                                                hasItemsInCart ? (
                                                                    allItems.map((item) => {
                                                                        if (cartItems[item.id] > 0) {
                                                                            const subtotal = cartItems[item.id] * item.offer_price
                                                                            return (
                                                                                <div key={item.id} className='addtocart'>
                                                                                    <img src={`${serverUrl}/images/${item.image}`} alt="" />
                                                                                    <div>
                                                                                        <h5>{item.product_name}</h5>
                                                                                        <p>Price:₹{subtotal}.00</p>
                                                                                        <p>Qty :{cartItems[item.id]} item /{formatPackGram(item.pack_gram)}</p>
                                                                                    </div>

                                                                                    <button onClick={() => removeCart(item.id)}><i className="fa-solid fa-trash"></i></button>
                                                                                </div>

                                                                            );
                                                                        }
                                                                        return null;
                                                                    })
                                                                ) : <></>
                                                            }
                                                        </MDBModalBody>
                                                        :
                                                        <></>
                                                }






                                                {
                                                    hasItemsInCart ?
                                                        <MDBModalFooter>

                                                           <h6>Sub Total: ₹{totalItemSubtotal}</h6>
                                                            <div className='links'>
                                                            <Link to={'/cart'} style={{ textDecoration: "none" }}>
                                                                <button className='my-custom-class' onClick={toggleOpen}>
                                                                    My cart
                                                                </button>

                                                            </Link>
                                                            <Link to={'/checkout'}>
                                                                <button className='my-custom-class' onClick={toggleOpen}>
                                                                    Checkout
                                                                </button>
                                                            </Link>
                                                            </div>
                                                        </MDBModalFooter>
                                                        :
                                                        <></>

                                                }

                                            </MDBModalContent>
                                        </MDBModalDialog>


                                    </MDBModal>



                                </div>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>

        </>
    )
}

export default NavbarMain