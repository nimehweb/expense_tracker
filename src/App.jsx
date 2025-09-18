import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import { Routes, Route } from 'react-router-dom'


function App() {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/history' element={<History />} />
    </Routes>
  )
}

export default App
