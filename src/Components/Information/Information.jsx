import React, { useContext, useEffect, useState } from 'react'
import './Information.css'
import { Col, Row } from 'react-bootstrap'
import { ShopContext } from '../../Context/ShopContext'
import { Link } from 'react-router-dom'



function Information() {
    const { userData} = useContext(ShopContext)

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        address: "",
        telephone: "",
        landmark: "",
        mobile:"",
        email:"",
        postal_code: "",
      });

      const handleInput = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };


    useEffect(() => {
        if (userData && userData.user) {
          setFormData({
            first_name: userData.user.first_name || "",
            last_name: userData.user.last_name || "",
            address: userData.user.address || "",
            telephone: userData.user.telephone || "",
            landmark: userData.user.landmark || "",
            postal_code: userData.user.postal_code || "",
            email:userData.user.email,
            mobile:userData.user.mobile
          });
        }
      }, [userData]);
    

    return (
        <div className='information'>
            <h1>Edit Account Information</h1>

            <div className="form">
                <h5>ACCOUNT INFORMATION</h5>

                <Row>
                    <Col lg={5}>
                        <div className='first_name'>
                            <label htmlFor="first_name">First Name *</label>
                            <input type="text" id='first_name' onChange={handleInput}  value={formData.first_name} name='first_name' />
                        </div>
                        <div className="mobile">
                            <label htmlFor="mobile">Mobile *</label>
                            <div className='mobile-data'>
                                <p>+91</p>
                                <input type="tel" id='mobile' value={`${formData.mobile}`} disabled />
                            </div>
                        </div>
                        <div className='email'>
                            <label htmlFor="email">Email *</label>
                            <input type="email" id='email' onChange={handleInput} value={formData.email} name='email' />
                        </div>

                    </Col>
                    <Col lg={5}>
                        <div className='last_name'>
                            <label htmlFor="last_name">Last Name *</label>
                            <input type="text" id='last_name' onChange={handleInput} value={formData.last_name} name='last_name' />
                        </div>
                    </Col>
                </Row>
                
                <div className='save'>
                <Link to={'/customer/account'}>Back</Link>
                <div>
                        <button>SAVE</button>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Information