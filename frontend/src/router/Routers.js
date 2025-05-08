import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from './../pages/Home';
import Rents from './../pages/Rents';
import RentProperty from './../pages/RentProperty';
import RentDetails from './../pages/RentDetails';
import SearchResultList from './../pages/SearchResultList';
import Login from './../pages/Login';
import Register from './../pages/Register';
import Profile from '../pages/Profile';
import About from '../pages/About';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../pages/Dashboard/Dashboard';
import EditRent from '../pages/Dashboard/EditRent';
import MyPropertyDetails from '../pages/Dashboard/MyPropertyDetails';

const Routers = () => {
  return (
    <Routes>
      {/* Public Routes */}
        <Route path='/' element={<Navigate to='/home'/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/rents' element={<Rents/>} />
        <Route path='/rent-property' element={<RentProperty/>} />
        <Route path='/rents/:id' element={<RentDetails/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/rents/search' element={<SearchResultList/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/about' element={<About/>} />

        {/* Private Routes */}
        <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path='/dashboard/edit/:id' element={<PrivateRoute><EditRent /></PrivateRoute>} />
        <Route path='/dashboard/property/:id' element={<PrivateRoute><MyPropertyDetails /></PrivateRoute>} />
    </Routes>
  )
}

export default Routers;