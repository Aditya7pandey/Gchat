import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import {Routes,Route, Navigate} from "react-router-dom"
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast'

function App() {
  const {authUser,checkAuth,isCheckingAuth} = useAuthStore()
  useEffect(()=>{
    checkAuth()
  },[checkAuth]);
  
  console.log(authUser)

  if(isCheckingAuth && !authUser) return(
      <>
      <Loader className="animate-spin w-12 h-12 text-blue-500" />
      </>
  )
  return (
    <>
    <Navbar />    
    <Routes>
      <Route path='/' element={authUser?<HomePage />:<Navigate to="/login"/>} />
      <Route path='/signup' element={!authUser ?<SignUpPage />:<Navigate to="/" />} />
      <Route path='/login' element={!authUser ? <LoginPage />:<Navigate to="/" />} />
      <Route path='/settings' element={authUser ? <SettingsPage />:<Navigate to="/login" />} />
      <Route path='/profile' element={authUser ? <ProfilePage />:<Navigate to="/login" />} />
    </Routes>

    <Toaster />
    </>
  )
}

export default App
