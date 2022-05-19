import React from 'react';
import {Link} from 'react-router-dom';
import Header from '../header/header';
import { useState } from "react";
import { createApiEndpoint, ENDPOINTS } from "../../api";
 
import styles from './UploadFiles.module.css';
 
 export default function UploadFiles() {

    const [selectedFile, setSelectedFile] = useState();

    const handleSubmit = (event) => {
      event.preventDefault();
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

            
    return (
        
        <div className = {styles.main}>
            <Header/>
            <div className={styles.mid}>
                <div>
                    <h1>Upload File</h1>
                    <br/>
                    <p>File & Settings</p>
                    <br/>
                    <br/>
                    <form classname = {styles.uploadForm}>
                        <p>File</p>
                        <input type="file" onChange = {handleFileSelect}/> 
                        <br/>
                        <p>Select the file you want to upload. We support all common file formats.</p>
                        <br/>
                        <p>Format</p>
                        <select className= {styles.form1}  id = "dropdown">
                            <option value="5">Simple JSON (.json)</option>
                            <option value="1">ARB (.arb)</option>
                            <option value="2">Ruby (.yml)</option>
                            <option value="3">Gettext (.po)</option>
                            <option value="4">.xml</option>
                        </select>
                    </form>
                </div>
                <button onClick={handleSubmit} className={styles.button}><Link to='/home/keyPage' style={{ color: 'inherit', textDecoration: 'inherit'}}>Upload</Link></button>
            </div>
        </div>
    )
}
 
 
