import React, { useEffect } from 'react'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import JSForm from './JSForm'
import MailSent from './MailSent'

export default function App() {

    const navigate = useNavigate();

    useEffect(() => {
        navigate('/details-by-email', {replace: true});
    }, [])

    return (
        <div className='App'>
            <Routes>
                <Route path='/details-by-email' element={<Navigate replace to='/' />} />
                <Route path='/' element={<JSForm />} />
                <Route path='/mailsent' element={<MailSent />} />
            </Routes>
        </div>
    )
}