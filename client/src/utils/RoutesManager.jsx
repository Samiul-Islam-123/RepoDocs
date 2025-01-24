import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import Dashboard from '../pages/Dashboard'
import Generate from '../components/DashboardComponents/Generate'
import { Settings } from '@mui/icons-material'

function RoutesManager() {
  return (
    <>
        <Routes>
            <Route exact path='/' element={<LandingPage />} />
            <Route exact path='/dashboard/*' element={<Dashboard/>} />
            
        </Routes>
    </>
  )
}

export default RoutesManager