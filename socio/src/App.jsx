import { useState } from 'react'
import './App.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import HomePage from './HomePage';

function App() {

  return (
    <MantineProvider>
      <HomePage />
    </MantineProvider>
  )
}

export default App
