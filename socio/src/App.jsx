import { useState } from 'react'
import './App.css'
import HomePage from './HomePage';
import '@mantine/core/styles.css';
import Navbar from './Components/Navbar/Navbar';
import { MantineProvider } from '@mantine/core';

function App() {

  return (
    <MantineProvider>
      <Navbar />
      <HomePage />
    </MantineProvider>
  )
}

export default App
