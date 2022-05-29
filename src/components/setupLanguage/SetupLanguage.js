import React, { useContext } from 'react';
import {Link} from 'react-router-dom';

import Header from '../header/header';
import styles from './SetupLanguage.module.css';
import setupLanguage from './setupLanguage.png'
import { useState } from "react";
import { createApiEndpoint, ENDPOINTS } from "../../api";
import { Context } from '../wrapper/Wrapper.js';

export default function SetupLanguage() {
    // API work to save languages
    const [sourceLanguage, setSourceLanguage] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('');
    const [sName, setsName] = useState('');
    const [tName, settName] = useState('');
    const [userId, SetUserId] = useState("");
    const [localeId, SetLocaleId] = useState("");
  
    //Post Locale Settings To Database
    const data = {SourceLanguage:sourceLanguage, TargetLanguage:targetLanguage, SourceLanguageName:sName, TargetLanguageName:tName};
    const myLanguagePage = () => {createApiEndpoint(ENDPOINTS.LOCALESET).create(data).
    then(res => {
      console.log(res);
      SetLocaleId(res.data.id)
      console.log(res.data.id)
    }).
    catch(err => console.log(err) )

}

    const context = useContext(Context);
    //update locale id in user table (FK)
    SetUserId(sessionStorage.getItem('UserId'))
    const patchdata = {UserId:userId, LocaleId:localeId};   
    createApiEndpoint(ENDPOINTS.PATCHLOCALEID).create(patchdata).
          then(res => {
            console.log(res.data);
          }).
          catch(err => console.log(err) ) 
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
                    <button onClick={myLanguagePage} className={styles.submitButton}><Link to='/home' style={{ color: 'inherit', textDecoration: 'none'}}>
                        Submit
                    </Link></button>
                </div>
                
                
            </div>
            
        </div>
    )
}