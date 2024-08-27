import React from 'react'
import './Footer.css'


import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit';

import logo from '../Assets/logo.PNG'

function Footer() {
  return (

    <>
    <MDBFooter bgColor='light' className='footer text-center text-lg-start text-muted'>
      <section className='footer-top d-flex justify-content-center justify-content-lg-between border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div className='d-flex align-items-center justify-content-center gap-4'>
          <p className='text-reset'>
            <MDBIcon color='secondary' fab icon='facebook-f' />
          </p>
          <p className='text-reset'>
            <MDBIcon color='secondary' fab icon='twitter' />
          </p>
          <p className='text-reset'>
            <MDBIcon color='secondary' fab icon='google' />
          </p>
          <p className='text-reset'>
            <MDBIcon color='secondary' fab icon='instagram' />
          </p>
          <p className='text-reset'>
            <MDBIcon color='secondary' fab icon='linkedin' />
          </p>
          <p className='text-reset'>
            <MDBIcon color='secondary' fab icon='github' />
          </p>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md={5} sm={4} className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <img src={logo} alt="" />
                Food Flash
              </h6>
              <p>
                Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit
                amet, consectetur adipisicing elit.
              </p>
            </MDBCol>

            <MDBCol className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
              <p>Fish</p>
              <p>Chicken</p>
              <p>Mutton</p>
              <p>Fruits</p>
              <p>Veg</p>
              <p>Easy to cook</p>
            </MDBCol>

            <MDBCol  className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>Pricing</p>
              <p>Settings</p>
              <p>Orders</p>
              <p>Help</p>
            </MDBCol>

            <MDBCol className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon color='secondary' icon='home' className='me-2' />
               Kannur, Kerala
              </p>
              <p>
                <MDBIcon color='secondary' icon='envelope' className='me-3' />
                www.foodflash@gmail.com
              </p>
              <p>
                <MDBIcon color='secondary' icon='phone' className='me-3' /> +91 XXXXXXXXXX
              </p>
              <p>
                <MDBIcon color='secondary' icon='print' className='me-3' /> +91 XXXXXXXXXX
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </MDBFooter>
    </>
  )
}

export default Footer