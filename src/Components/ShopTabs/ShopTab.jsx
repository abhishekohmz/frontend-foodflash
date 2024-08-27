import React, { useState } from 'react'
import './ShopTab.css'
import { Link } from 'react-router-dom'

import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarToggler,
  MDBNavbarItem,
  MDBCollapse,
  MDBIcon,
} from 'mdb-react-ui-kit';



function ShopTab() {
  const [menu, setMenu] = useState("")
  const [openNavNoToggler, setOpenNavNoToggler] = useState(false);

  return (
    <div>

      <MDBNavbar expand='lg' light bgColor='light'>
        <MDBContainer>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarTogglerDemo01'
            aria-controls='navbarTogglerDemo01'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setOpenNavNoToggler(!openNavNoToggler)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse navbar open={openNavNoToggler}>
              <ul className="nav-menu">

                <li>
                  <MDBNavbarItem>
                    <Link className={menu === "fish" ? "active" : ""} onClick={() => setMenu("fish")} to={`/fish`}>Fish</Link>
                  </MDBNavbarItem>
                </li>



                <li>
                  <MDBNavbarItem>
                    <Link className={menu === "chicken" ? "active" : ""} onClick={() => setMenu("chicken")} to={`/chicken`}>Chicken</Link>
                  </MDBNavbarItem>
                </li>


                <li>
                  <MDBNavbarItem>
                    <Link className={menu === "mutton" ? "active" : ""} onClick={() => setMenu("mutton")} to={`/mutton`}>Mutton</Link>
                  </MDBNavbarItem>
                </li>

                <li>
                  <MDBNavbarItem>
                    <Link className={menu === "veg" ? "active" : ""} onClick={() => setMenu("veg")} to={`/veg`}>Veg</Link>
                  </MDBNavbarItem>
                </li>
              </ul>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </div>
  )
}

export default ShopTab
