import React, { useContext, useEffect, useState } from 'react'
import './Addressbook.css'
import { Col, Row } from 'react-bootstrap'
import { ShopContext } from '../../Context/ShopContext'
import { Link } from 'react-router-dom'



function Addressbook() {

  const { userData } = useContext(ShopContext)

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
    <div className='address-book'>
      <h1>Add New Address</h1>
      <div className="form">
        <h5>CONTACT INFORMATION</h5>

        <Row>
          <Col lg={5}>
            <div className='first_name'>
              <label htmlFor="first_name">First Name *</label>
              <input type="text" id='first_name' onChange={handleInput} value={formData.first_name} name='first_name' />
            </div>
            <div className="telephone">
              <label htmlFor="telephone">Telephone *</label>
              <input type="tel" id='telephone' onChange={handleInput} value={formData.telephone} name='telephone' />
            </div>

          </Col>
          <Col lg={5}>
            <div className='last_name'>
              <label htmlFor="last_name">Last Name *</label>
              <input type="text" id='last_name' onChange={handleInput} value={formData.last_name} name='last_name' />
            </div>
          </Col>
        </Row>

        <h5>ADDRESS</h5>

        <Row>
          <Col lg={6}>
            <div className='street-address'>
              <div className='street-address-data'>
                <label htmlFor="street_address">Street Address *</label>
                <input type="text" id='street_address' onChange={handleInput} value={formData.address} name='address' />
              </div>
            </div>

            <div className='land-mark'>
              <label htmlFor="land_mark">Land Mark</label>
              <input type="text" id='land_mark' onChange={handleInput} value={formData.landmark} name='landmark'/>
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg={5}>
            <div className='postal-code'>
              <label htmlFor="postal_code">Postal Code *</label>
              <input type="tel" id='postal_code' onChange={handleInput} value={formData.postal_code} name='postal_code' />
            </div>

            <div className='alt-phone-number'>
              <label htmlFor="alternate_phone">Alternate Phone Number *</label>
              <input type="tel" id='alternate_phone' onChange={handleInput} />
            </div>
          </Col>
        </Row>

        <div className='save'>
          <Link to={'/customer/account'}>Back</Link>
          <div>
            <button>Save Address</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Addressbook