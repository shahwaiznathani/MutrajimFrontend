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
import axios from 'axios';
import Logo from "../Logo/MutrajimStandAlone.png"
import Swal from "sweetalert2";


export default function UploadImages () {

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

    const [state, setState] = useState('idle');
    const [selectedFile, setSelectedFile] = useState();
    const [loading, setLoading] = useState(false);
    // const [extractedText, setExtractedText] = useState('');
      

    const handleSubmit = (e) => {

      const data = new FormData();
      data.append('file', selectedFile);
      console.log(selectedFile);
      console.log(data);
      setLoading(true);  
      //Image translation api
      axios.post('http://127.0.0.1:5000/read', data)
        .then(response => response)
        .then(result => {
            console.log(JSON.stringify(result.data));
            // setExtractedText(JSON.stringify(result.data));
            setLoading(false);
            success(result.data);    
            onClickHandler();  
        })
        .catch(error => console.log('error', error));
    }
    const handleFileSelect = (event) => {
      setSelectedFile(event.target.files[0]);
      
    }

    const onClickHandler = () => {
        setState('loading');
        setTimeout(() => {
            setState('success');
        }, 2000);
    }

    const success = (extractedText) => {
        toastMixin.fire({
        animation: true,
        title: 'File Upload Successful!'
        });
        navigate('/home/ImageTranslation', {state: {selectedFile, extractedText}});
    }

     const error = () => {
        toastMixin.fire({
        title: 'File format not supported!',
        icon: 'error'
        });
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
                    <div className = {styles.uploadImagesButton}>
                        <input type="file" onChange = {handleFileSelect}/> 
                        <div className= {styles.buttonDiv}>
                            <ReactiveButton
                                className = {styles.button} 
                                idleText={'Upload Files'}
                                buttonState={state}
                                onClick={()=> { handleSubmit();}}
                                loadingText={'Uploading'}
                                color={'#d09072'}
                            />
                        </div>
                    </div>

                </div>

            </div>
            {loading && <div className={styles.loaderView}>
            <img className={styles.logoImg} src={Logo} />
            </div>}
        </div>
    )
}