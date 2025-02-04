import React, { useEffect } from 'react'
import Layout from '../components/DashboardComponents/Layout'
import { Route, Routes, useNavigate } from 'react-router-dom'
import DashboardRoutes from '../components/DashboardComponents/DashboardRoutes'
import { useSocket } from '../context/SocketContext'

function Dashboard() {

  // const {bolts} = useSocket();
  // const navigate = useNavigate();
  
  // useEffect(() => {
  //   if(bolts <= 0){
  //     alert("You have run out of bolts! Please recharge or purchase more.");
  //     navigate('/')
  //   }
  // },[bolts])

  return (
    <>
        <Layout>
            <DashboardRoutes />
        </Layout>
    </>
  )
}

export default Dashboard