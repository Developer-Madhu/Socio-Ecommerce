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
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Page from './Pages/Page';
function App() {

  return (
    <MantineProvider>

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Page />} />
          <Route path='/reelshop' element={<Index />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="users" element={<Users />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/register' element={<Register />} />
        </Routes>
      </BrowserRouter>

    </MantineProvider>
  )
}

export default App
