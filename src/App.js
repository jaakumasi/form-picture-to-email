import React, { useEffect } from 'react'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import JSForm from './JSForm'

export default function App() {

    const navigate = useNavigate();

    return (
        <div className='App'>
            <Routes>
                <Route path='/' element={<JSForm />} />
            </Routes>
        </div>
    )
}