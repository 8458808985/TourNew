import React from 'react'
import Header1 from '../layout/header/Header1'
import { Outlet } from 'react-router-dom'
import FooterOne from '../layout/footers/FooterOne'


const AboutUs = ({props}) => {
  return (
    <div>
      <Header1/>
      <Outlet />
      <FooterOne/>
      
    </div>
  )
}

export default AboutUs
