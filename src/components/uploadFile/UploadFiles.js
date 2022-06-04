import React, { Component, state } from 'react';
import { useState } from "react";
import Select from 'react-select';
import { FormattedMessage } from "react-intl";
import ReactiveButton from 'reactive-button';
import { Context } from '../wrapper/Wrapper.js';

import styles from './UploadFiles.module.css';
import Header from '../header/header';
import uploadFilePicture from './upload.png';
import { createApiEndpoint, ENDPOINTS } from "../../api";
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const options = [
    { value: 'json', label: 'Simple JSON (.json)' },
    // { value: 'arb', label: 'ARB (.arb)' },
    // { value: 'yml', label: 'Ruby (.yml)' },
    // { value: 'po', label: 'Gettext (.po)' },
    // { value: 'xml', label: '.xml' }
]



export default function UploadFiles () {

    //Notifier Settings
    const navigate = useNavigate();
    var toastMixin = Swal.mixin({
        toast: true,
        icon: 'success',
        title: 'General Title',
        animation: false,
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });

    const [selectedFile, setSelectedFile] = useState();
    const [Name, setFileName] = useState("");
    const [Type, setFileType] = useState("");

    const handleSubmit = (e) => {
    //   e.preventDefault();
      const formData = new FormData();
      formData.append('file', selectedFile);
      console.log(selectedFile);
      console.log(formData);
      if(Type === "application/json"){
            //Upload File To Directory
            createApiEndpoint(ENDPOINTS.FILEUPLOAD).create(formData, {
                headers: {
                "Content-Type": "multipart/form-data"
                }
                }).then(res => {
                        console.log(res);
                }).catch(err => console.log(err) );

            //post file data in file setiing
            const filedata = {name: Name, type: Type};
            createApiEndpoint(ENDPOINTS.FILESETTING).create(filedata).
                then(res => {
                    var uid = sessionStorage.getItem('UserId');
                    var fid = res.data.fileID;
                    console.log(res.data.fileID);
                    //Patch Locale Id to User Table
                    createApiEndpoint(ENDPOINTS.PATCHFILEID).create({UserId:uid, FileId:fid}).
                        then(res => {
                            console.log(res.data);
                        }).
                        catch(err => console.log(err) ) ;  
                    success();    
                    onClickHandler();
                }).
                catch(err => console.log(err) )  

        
            //Exract file data and add to database
            createApiEndpoint(ENDPOINTS.FILEDATAPUT).create().
                then(res => {
                console.log(res.data);
                }).
                catch(err => console.log(err) )    
        }
        else{
            error();
        }
      
    }

    const handleFileSelect = (event) => {
      setSelectedFile(event.target.files[0]);
      setFileName(event.target.files[0].name);
      setFileType(event.target.files[0].type);
      console.log(event.target.files[0])
    }



    const [state, setState] = useState('idle');

    const onClickHandler = () => {
        setState('loading');
        setTimeout(() => {
            setState('success');
        }, 2000);
    }

    const success = () => {
        toastMixin.fire({
        animation: true,
        title: 'File Upload Successful!'
        });
        navigate('/home/keyPage');
    }

     const error = () => {
        toastMixin.fire({
        title: 'File format not supported!',
        icon: 'error'
        });
    }

    return (
        <div className= {styles.main}>
            <Header/>
            <div className= {styles.top}>
                <h1 className= {styles.uploadFile}>
                    <FormattedMessage
                    id = "uploadFiles.uploadFile"
                    /> 
                </h1>

                <p className= {styles.fileSetting}>
                    <FormattedMessage
                    id = "uploadFiles.fileSettings"
                    /> 
                </p>
                <div className = {styles.pictureBox}>
                    <img src = {uploadFilePicture} alt = "upload File" className = {styles.picture}/>

                    <input type="file" onChange = {handleFileSelect}/> 
                   

                    <p className= {styles.uploadMessage}>
                        <FormattedMessage  
                            id = "uploadFiles.fileUpload"
                          />
                    </p>

                    <Select className = {styles.selectFormat} options={options} />

                    <ReactiveButton shadow
                        className = {styles.button} 
                        idleText={'Upload Files'}
                        buttonState={state}
                        onClick={()=> {handleSubmit();}}
                        loadingText={'Uploading'}
                        color={'#D09072'}
                    />

                </div>

            </div>
        </div>
    )
}