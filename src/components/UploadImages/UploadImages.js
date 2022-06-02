import React, { useContext } from 'react';
import { useState } from "react";
import Select from 'react-select';
import { FormattedMessage } from "react-intl";
import ReactiveButton from 'reactive-button';
import { Context } from '../wrapper/Wrapper.js';
import { useNavigate } from 'react-router-dom';

import styles from './UploadImages.module.css';
import Header from '../header/header';
import uploadFilePicture from './upload.png';
import ImageTranslation from '../ImageTranslation/ImageTranslation.js';
import { createApiEndpoint, ENDPOINTS } from "../../api";
import axios from 'axios';


export default function UploadImages () {
    const navigate = useNavigate();
    const [state, setState] = useState('idle');
    const [selectedFile, setSelectedFile] = useState();
    const [Name, setFileName] = useState("");
    const [Type, setFileType] = useState("");
  
      

    const handleSubmit = (e) => {
    //   e.preventDefault();
      const data = new FormData();
      data.append('file', selectedFile);
      console.log(selectedFile);
      console.log(data);
      //Image translation api
     axios.post('http://127.0.0.1:5000/read', data)
        .then(response => response)
        .then(result => {
            console.log(JSON.stringify(result.data));
        })
        .catch(error => console.log('error', error));

    }
    const handleFileSelect = (event) => {
      setSelectedFile(event.target.files[0]);
      setFileName(event.target.files[0].name);
      setFileType(event.target.files[0].type);
    }

    const onClickHandler = () => {
        setState('loading');
        setTimeout(() => {
            setState('success');
        }, 2000);
        // navigate ("/home/ImageTranslation");
    }

    const context = useContext(Context);

    return (
        <div className= {styles.main}>
            <Header/>
            <select className = {styles.dropDown} value = {context.locale} onChange={context.selectLang}>
                <option value = "en">English</option>
                <option value = "ur">Urdu</option>
            </select> 
            <div className= {styles.top}>
                <h1 className= {styles.uploadFile}>
                    <FormattedMessage
                    id = "uploadImages.uploadImage"
                    /> 
                </h1>   

                <p className= {styles.fileSetting}>
                    <FormattedMessage
                    id = "uploadImage.imageSettings"
                    /> 
                </p>
                <div className = {styles.pictureBox}>
                    <img src = {uploadFilePicture} alt = "upload File" className = {styles.picture}/>
                    <p className= {styles.browseFile}>
                        <FormattedMessage
                            id = "uploadImage.image"
                        />    
                    </p>

                    <br/>
                    <input type="file" onChange = {handleFileSelect}/> 
                    <ReactiveButton
                        className = {styles.button} 
                        idleText={'Upload Files'}
                        buttonState={state}
                        onClick={()=> {onClickHandler(); handleSubmit();}}
                        loadingText={'Uploading'}
                        color={'#d09072'}
                    />

                </div>

            </div>
        </div>
    )
}