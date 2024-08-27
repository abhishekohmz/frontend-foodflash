import React, { useEffect, useState } from 'react'
import './SidebarUser.css'
import { Link, useLocation } from 'react-router-dom'


function SidebarUser() {

  const location = useLocation()
  const[menu,setMenu]=useState('dashboard')

  useEffect(()=>{
    const currentPath=location.pathname

    if (currentPath.includes('/customer/account/dashboard')) {
      setMenu('dashboard');
    } else if (currentPath.includes('/customer/account/edit')) {
      setMenu('information');
    } else if (currentPath.includes('/customer/account/address')) {
      setMenu('addressbook');
    } else if (currentPath.includes('/customer/account/orders')) {
      setMenu('orders');
    } else {
      setMenu('dashboard');
    }
  },[location])


  return (
    <>
      <div className='sidebar'>
        <h6>MY ACCOUNT</h6>
        <ul className='custormer-account'>
          <li>
            <Link to={'/customer/account/dashboard'} className={menu === 'dashboard' ? 'active' : ''}>
              Account Dashboard
            </Link>
          </li>

          <li>
            <Link to={'/customer/account/edit'} className={menu === 'information' ? 'active' : ''}>
              Account Information
            </Link>
          </li>

          <li>
            <Link to={'/customer/account/address'} className={menu === 'addressbook' ? 'active' : ''} >
              Address Book
            </Link>
          </li>

          <li>
            <Link to={'/customer/account/orders'} className={menu === 'orders' ? 'active' : ''}>
              My Orders
            </Link>
          </li>

          <li>
            <Link className={menu === 'logout' ? 'active' : ''} onClick={()=>{sessionStorage.clear();window.location.replace('/')}}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default SidebarUser