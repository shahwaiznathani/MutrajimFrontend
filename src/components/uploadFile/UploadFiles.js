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


const options = [
    { value: 'arb', label: 'ARB (.arb)' },
    { value: 'yml', label: 'Ruby (.yml)' },
    { value: 'po', label: 'Gettext (.po)' },
    { value: 'xml', label: '.xml' },
    { value: 'json', label: 'Simple JSON (.json)' }
]



export default function UploadFiles () {


    const [selectedFile, setSelectedFile] = useState();

    const handleSubmit = (event) => {
    //   event.preventDefault();
      const formData = new FormData();
      formData.append('file', selectedFile);
      console.log(selectedFile);
      console.log(formData);
     //const data = {formFiles:selectedFile};
      createApiEndpoint(ENDPOINTS.FILEUPLOAD).create(formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {
              console.log(res);
      }).catch(err => console.log(err) )

      const filepath = {SubDirectory:'FileStorgae'};
      createApiEndpoint(ENDPOINTS.FILEDATAPUT).create(filepath).
            then(res => {
              console.log(res.data);
            }).
            catch(err => console.log(err) )    
         }

    const handleFileSelect = (event) => {
      setSelectedFile(event.target.files[0]);
      console.log(event.target.files[0])
    }



    const [state, setState] = useState('idle');

    const onClickHandler = () => {
        setState('loading');
        setTimeout(() => {
            setState('success');
        }, 2000);
        handleSubmit();
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
                    {/* <input className= {styles.browseFile}>
                        <FormattedMessage
                            id = "uploadFiles.file"
                        />    
                    </input> */}
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
                        onClick={onClickHandler}
                        loadingText={'Uploading'}
                        color={'#D09072'}
                    />

                </div>

            </div>
        </div>
    )
}