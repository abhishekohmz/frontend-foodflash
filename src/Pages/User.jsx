import React from 'react'
import './CSS/User.css'
import SidebarUser from '../Components/Sidebar&Dashboard/SidebarUser'
import { Col, Container, Row } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'



function User() {
  return (
    <Container className='user'>
      <Row>
        <Col sm={3} >
          <SidebarUser />
        </Col>
        <Col sm={9}>
          <div className="contents">
            <Outlet />
          </div></Col>
      </Row>
    </Container>
  )
}

export default User