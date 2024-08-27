import React, { useContext } from 'react'
import './Dashboard.css'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'



function Dashboard() {


    const {userData}=useContext(ShopContext)
    console.log(userData);

  return (
    <div className='dashboard'>
        <h1>My Dashboard</h1>
        <h6>Hello {`${userData.user.first_name} ${userData.user.last_name}`}</h6>
        <p>From your My Account Dashboard you have the ability to view a snapshot of your recent account activity and update your account information. Select a link below to view or edit information.</p>

        <div className="account-information">
            <h6>ACCOUNT INFORMATION</h6>
            <Row>
                <Col md={6}>
                    <div>
                        <div className="contact-information">
                            <h5>CONTACT INFORMATION</h5>
                        </div>
                        <hr />
                        <div>
                            <p>{`${userData.user.first_name} ${userData.user.last_name}`}</p>
                            <p>+91 {userData.user.mobile}</p>
                            <p>{userData.email}</p>
                            <Link to={'/customer/account/edit'}><p>Change Password</p></Link>
                        </div>
                    </div>
                </Col>
                
            </Row>

            <Row>
                <Col>
                    <div>
                        <div className="addressbook">
                            <h5>ADDRESS BOOK</h5>
                            <Link to={'/customer/account/address'}><h5>MANAGE ADDRESS BOOK</h5></Link>
                        </div>
                        <hr />
                        <div className='shipping-billing'>
                            <div>
                                <h5>Default Billing Address</h5>
                                {
                                    <p>You have not set a default billing address.</p>
                                    }
                                <Link o={'/customer/account/address'}><p>Edit Address</p></Link>
                            </div>

                            <div>
                                <h5>Default Shipping Address</h5>
                                <p>You have not set a default shipping address.</p>
                                <Link o={'/customer/account/address'}><p>Edit Address</p></Link>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
           
        </div>

    </div>
  )
}

export default Dashboard