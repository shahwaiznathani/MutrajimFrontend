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


export default function UploadImages () {
    const navigate = useNavigate();
    const [state, setState] = useState('idle');

    const onClickHandler = () => {
        setState('loading');
        setTimeout(() => {
            setState('success');
        }, 2000);
        navigate ("/home/ImageTranslation");
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
                    <p className= {styles.browseFile}><a href=" ">
                        <FormattedMessage
                            id = "uploadImage.image"
                        />    
                    </a></p>

                    <br/>
                    <ReactiveButton
                        className = {styles.button} 
                        idleText={'Upload Files'}
                        buttonState={state}
                        onClick={onClickHandler}
                        loadingText={'Uploading'}
                        color={'#d09072'}
                    />

                </div>

            </div>

            <select className = {styles.dropDown} value = {context.locale} onChange={context.selectLang}>
                <option value = "en">English</option>
                <option value = "ur">Urdu</option>
            </select> 
        </div>
    )
}