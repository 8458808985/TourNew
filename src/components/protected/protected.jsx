import React, { useEffect } from 'react'
import { Route, useNavigate } from 'react-router-dom';
// import { Route } from 'react-router-dom';
// import App from '../../../new1111/src/components/pages/Login_condition';


export const Protected = (children) => {
  
    const Component = children.Component
    const navigate = useNavigate();
    useEffect(()=>{
        let tokendata = localStorage.getItem('token');   
        if(tokendata == null) {
            navigate("/login")
        }
    },[])
  return (
    <>
     <Component/>
    </>
  )
}

// PrivateRouteComponent.js
// import React from 'react';

