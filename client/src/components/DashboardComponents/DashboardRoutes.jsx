import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Generate from './Generate'
import Home from './Home'
import History from './History'
import Settings from './Settings'

function DashboardRoutes() {
  return (
    <>
        <Routes>
            <Route path='' element={<Home />} />
            <Route path='home' element={<Home />} />
            <Route path='generate' element={<Generate />} />
            <Route path='history' element={<History />} />
            <Route path='settings' element={<Settings />} />
            
        </Routes>
    </>
  )
}

export default DashboardRoutes