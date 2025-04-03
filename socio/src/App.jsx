import { useState } from 'react'
import './App.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import HomePage from './HomePage';
import { Navbar } from './Components/Navbar/Navbar';

function App() {

  return (
    <MantineProvider>
      <Navbar />
      <HomePage />
    </MantineProvider>
  )
}

export default App
