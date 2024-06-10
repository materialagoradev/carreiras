import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Aboutme from '../pages/Aboutme'
import Caifora from '../pages/Aboutme'
import Home from '../pages/Home'

const MyRoutes = () => {
  const isLogged = true

  return (
    <BrowserRouter>
      <Routes>
        {isLogged ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<Aboutme />} />
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default MyRoutes
