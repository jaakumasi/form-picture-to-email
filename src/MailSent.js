import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { IoMdMail } from 'react-icons/io'

import 'bootstrap/dist/css/bootstrap.min.css'
import './mailsent.css'

export default function MailSent() {

    return (
        <div className='MailSent'>
            <Container className='col-lg-6 col-md-8 col-sm-12'>
                <Row>
                    <h2>EMAIL SENT SUCCESSFULLY</h2>
                    <h3>Account Under Review</h3>
                    <IoMdMail style={{ fontSize: '150%', color: 'green' }} />
                </Row>
            </Container>
        </div>
    )
}