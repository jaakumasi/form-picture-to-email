import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

import 'bootstrap/dist/css/bootstrap.min.css'
import './jsform.css'

import bg from './background_img.jpg'

import countryData from './countries.json'


export default function JSForm() {

    const [options, setOptions] = useState([]);
    const [showSpinner, setShowSpinner] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setOptions(countryData.map((country, index) => <option key={index}>{country.name}</option>));
    }, [])

    async function validate(e) {
        e.preventDefault();
        let firstName = document.querySelector('.firstName').value;
        let lastName = document.querySelector('.lastName').value;
        let dateOfBirth = document.querySelector('.dateOfBirth').value;
        let phone = document.querySelector('.phone').value;
        let email = document.querySelector('.email').value;
        let currentWork = document.querySelector('.currentWork').value;
        let currentWorkStartDate = document.querySelector('.currentWorkStartDate').value;
        let ssn = document.querySelector('.ssn').value;
        let streetAddress = document.querySelector('.streetAddress').value;
        let city = document.querySelector('.city').value;
        let region = document.querySelector('.region').value;
        let zipCode = document.querySelector('.zipCode').value;
        let country = document.querySelector('.country').value;
        let driversLicense = document.querySelector('.driversLicense').value;

        // validate email format
        let regExp = new RegExp('[a-z0-9]+@[a-z]+[.][a-z]{2,3}');
        let result = regExp.test(email);

        if (!firstName || !lastName || !dateOfBirth || !phone || !email || !currentWork
            || !currentWorkStartDate || !ssn || !streetAddress || !city || !region
            || !zipCode || !country || !driversLicense) {
            alert('Please fill in all fields');
            return 0;
        }
        if (!result) {  // report error if email format is invalid
            alert('Email format is invalid')
            return 0;
        }
        else {
            e.target.disabled = true;
            setShowSpinner(true);
            try {
                const response = await fetch('https://form-details-to-email.herokuapp.com/form', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        firstName: firstName,
                        lastName: lastName,
                        dateOfBirth: dateOfBirth,
                        phone: phone,
                        email: email,
                        currentWork: currentWork,
                        currentWorkStartDate: currentWorkStartDate,
                        ssn: ssn,
                        streetAddress: streetAddress,
                        city: city,
                        region: region,
                        zipCode: zipCode,
                        country: country,
                        driversLicense: driversLicense
                    })
                });
                const data = await response.json();

                e.target.disabled = false;
                setShowSpinner(false);
                if (data.successful) {
                    navigate('/mailsent');
                }
                else {
                    alert('Mail could not be sent. Please try again !');
                }
            } catch (e) { console.log(e.message) }
        }
    }

    return (
        <div className='Form'>
            <Container className='col-lg-6 col-md-8 col-sm-12'>
                <div className='img_div'>
                    <img src={bg} />
                </div>
                <Form>
                    <Row className='row'>
                        <div className='label'>Name</div>
                        <span className='col-6'>
                            <Form.Control placeholder='First' name='firstName' className='firstName' />
                        </span>
                        <span className='col-6'>
                            <Form.Control placeholder='Last' name='lastName' className='lastName' />
                        </span>
                    </Row>
                    <Row className='row'>
                        <span className='col-6'>
                            <div className='label'>Date of birth</div>
                            <Form.Control type='date' placeholder='example@gmail.com' name='dateOfBirth' className='dateOfBirth' />
                        </span>
                    </Row>
                    <Row className='row'>
                        <span className='col-6'>
                            <div className='label'>Phone</div>
                            <Form.Control placeholder='### #### ####' name='phone' className='phone' />
                        </span>
                        <span className='col-6'>
                            <div className='label'>Email</div>
                            <Form.Control placeholder='example@gmail.com' name='email' className='email' />
                        </span>
                    </Row>
                    <Row className='row'>
                        <span className='col-12'>
                            <div className='label'>Current Work</div>
                            <Form.Control placeholder='### #### ####' name='currentWork' className='currentWork' />
                        </span>
                    </Row>
                    <Row className='row'>
                        <span className='col-7'>
                            <div className='label'>Date you Started Current Work</div>
                            <Form.Control type='date' placeholder='example@gmail.com' name='currentWorkStartDate' className='currentWorkStartDate' />
                        </span>
                    </Row>
                    <Row className='row'>
                        <span className='col-12'>
                            <div className='label'>Social Security Number</div>
                            <Form.Control placeholder='' name='ssn' className='ssn' />
                        </span>
                    </Row>
                    <Row>
                        <div className='label'>Residential Address</div>
                        <div className='col-12'><Form.Control placeholder='Street Address' name='streetAddress' className='streetAddress' /></div>
                    </Row>
                    <Row className='row address'>
                        <span className='col-6'>
                            <Form.Control placeholder='City' name='city' className='city' />
                        </span>
                        <span className='col-6'>
                            <Form.Control placeholder='Region' name='region' className='region' />
                        </span>
                    </Row>
                    <Row className='row address'>
                        <span className='col-6'>
                            <Form.Control placeholder='Postal / Zip Code' name='zipCode' className='zipCode' />
                        </span>
                        <span className='col-6'>
                            <Form.Select type placeholder='Region' name='country' className='country'>
                                {
                                    options
                                }
                            </Form.Select>
                        </span>
                    </Row>
                    <Row>
                        <div className='label'>Driver's License Number</div>
                        <div className='col-12'><Form.Control name='driversLicence' className='driversLicense' /></div>
                    </Row>
                    <div className='btn_div'>
                        {showSpinner ?
                            <Spinner animation='border' role='status' variant='primary' size='sm' className='spinner' /> : ''
                        }
                        <Button className='submit_btn' onClick={validate}>Submit</Button>
                    </div>
                </Form>
            </Container>
        </div>
    )
}