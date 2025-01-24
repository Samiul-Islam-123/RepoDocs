import React from 'react'
import Layout from '../components/DashboardComponents/Layout'
import { Route, Routes } from 'react-router-dom'
import DashboardRoutes from '../components/DashboardComponents/DashboardRoutes'

function Dashboard() {
  return (
    <>
        <Layout>
            <DashboardRoutes />
        </Layout>
    </>
  )
}

export default Dashboard