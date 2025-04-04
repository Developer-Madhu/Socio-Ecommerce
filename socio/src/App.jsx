import { useState } from 'react'
import './App.css'
import HomePage from './HomePage';
import '@mantine/core/styles.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar';
import { MantineProvider } from '@mantine/core';
import Index from './Components/Index';

function App() {

  return (
    <MantineProvider>

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/reelshop' element={<Index />} />
        </Routes>
      </BrowserRouter>

    </MantineProvider>
  )
}

export default App
