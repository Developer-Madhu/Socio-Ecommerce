import { useState } from 'react'
import './App.css'
import HomePage from './HomePage';
import '@mantine/core/styles.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar';
import { MantineProvider } from '@mantine/core';
import Index from './Components/Index';
import AdminLayout from './Components/Admin/AdminLayout';
import Products from './Components/Admin/Products';
import Orders from './Components/Admin/Orders';
import { Users } from 'lucide-react';
import Analytics from './Components/Admin/Analytics';
import Dashboard from './Components/Admin/Dashboard';

function App() {

  return (
    <MantineProvider>

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/reelshop' element={<Index />} />
          <Route path="/admin" element={<AdminLayout />} />
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/analytics" element={<Analytics />} />
        </Routes>
      </BrowserRouter>

    </MantineProvider>
  )
}

export default App
