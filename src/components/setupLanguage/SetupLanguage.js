import React, { useContext } from 'react';
import {Link} from 'react-router-dom';

import Header from '../header/header';
import styles from './SetupLanguage.module.css';
import setupLanguage from './setupLanguage.png'
import { useState } from "react";
import { createApiEndpoint, ENDPOINTS } from "../../api";
import { Context } from '../wrapper/Wrapper.js';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function SetupLanguage() {
    
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

    // API work to save languages
    const [sourceLanguage, setSourceLanguage] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('');
    const [sName, setsName] = useState('');
    const [tName, settName] = useState('');
    var uid = '';
    var lid = 0;
    const data = {SourceLanguage:sourceLanguage, TargetLanguage:targetLanguage, SourceLanguageName:sName, TargetLanguageName:tName};
    const postLanguageSettings = () => {
        //Post Locale Settings To Database
        if(sourceLanguage !== '' && targetLanguage !== '' && sName !== '' && tName !== ''){
            createApiEndpoint(ENDPOINTS.LOCALESET).create(data).
            then(res => {
            console.log(res);
            uid = sessionStorage.getItem('UserId')
            lid = Number(res.data.settingId);
            console.log(Number(res.data.settingId));
            console.log(uid);
            console.log("User Id  "+ uid + "Locale Id " + lid);  
            //Patch Locale Id to User Table
            createApiEndpoint(ENDPOINTS.PATCHLOCALEID).create({UserId:uid, LocaleId:lid}).
                then(res => {
                    console.log(res.data);
                }).
                catch(err => console.log(err) ) ;  
        
            }).
            catch(err => console.log(err) );
            success();
        }
        else{
            error();
        }
} 
    const success = () => {
        toastMixin.fire({
        animation: true,
        title: 'Locale Updated!'
        });
        navigate('/home');
    }

     const error = () => {
        toastMixin.fire({
        title: 'Insert all fields to continue!',
        icon: 'error'
        });
    }


    // const context = useContext(Context);
    
    return (
        <div className = {styles.top}>
            <Header/>
            <div className= {styles.mainContainer}>
                <div className= {styles.heading}>
                    Connect to world by localizing your content
                </div>
                <img className = {styles.setupLanguageImage} src={setupLanguage} alt="Setup Language" />

                <div className = {styles.sourceFormContainer}>
                    <div className = {styles.defaultLocale}>
                        Set the default locale for this project.
                    </div>
                    {/* Source Language Form */}
                    <form className = {styles.sourceForm}>
                        <label className= {styles.setupLabel}>Select Language</label>
                        <select className = {styles.dropDown} onChange ={t => setSourceLanguage(t.target.value)}>
                            <option value = " " selected disabled hidden>Select an option</option>
                            <option value = "en">English</option>
                            <option value = "ur">Urdu</option>
                        </select> 
                        <label className= {styles.setupLabel}>Name</label>
                        <input className= {styles.setupInput} onChange ={t => setsName(t.target.value)} name="role" placeholder='Enter Name'/>
                    </form>
                </div>

                <div className = {styles.destFormContainer}>
                    <div className = {styles.destLocale}>
                        Set the languages you want to translate to
                    </div>
                    {/* Destination Language Form */}
                    <form className = {styles.destForm}>
                        <label className= {styles.setupLabel}>Select Language</label>
                        <select className = {styles.dropDown} onChange ={t => setTargetLanguage(t.target.value)}>
                            <option value = " " selected disabled hidden>Select an option</option>
                            <option value = "en">English</option>
                            <option value = "ur">Urdu</option>
                        </select> 
                        <label className= {styles.setupLabel}>Name</label>
                        <input className= {styles.setupInput} onChange ={t => settName(t.target.value)} name="role" placeholder='Enter Name'/>
                    </form>
                </div>

                <div className= {styles.submitButtonContainer}>
                    <button onClick={()=>{postLanguageSettings();}} className={styles.submitButton}><Link to='' style={{ color: 'inherit', textDecoration: 'none'}}>
                        Submit
                    </Link></button>
                </div>
                
                
            </div>
            
        </div>
    )
}