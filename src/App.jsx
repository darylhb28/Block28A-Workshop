import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import MainSection from './components/MainSection'


function App() {
 
  return (
    <div id = "container">
      <NavBar />
      <MainSection />
    </div>
  )
}

export default App
