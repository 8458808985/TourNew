import FooterOne from '@/components/layout/footers/FooterOne'
import Header1 from '@/components/layout/header/Header1'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Refund_policy = () => {
    return (
        <div>

            <Header1 />
            <Outlet />
            <FooterOne />
        </div>
    )
}

export default Refund_policy
