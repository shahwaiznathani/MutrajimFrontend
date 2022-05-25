import React from 'react';
import {Link} from 'react-router-dom';
import Header from '../header/header';
import { useState } from "react";
import { createApiEndpoint, ENDPOINTS } from "../../api";
 
import styles from './UploadFiles.module.css';
 
 export default function UploadFiles() {

    const [selectedFile, setSelectedFile] = useState();
    const [Name, setFileName] = useState("");
    const [Type, setFileType] = useState("");
    const [userId, SetUserId] = useState("");
    const [fileId, SetFileId] = useState("");

    const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append('file', selectedFile);
      console.log(selectedFile);
      console.log(formData);

     //upload file to directory
      createApiEndpoint(ENDPOINTS.FILEUPLOAD).create(formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {
              console.log(res);
      }).catch(err => console.log(err) )


      //post file data in file setiing
      const filedata = {name: Name, type: Type};
      createApiEndpoint(ENDPOINTS.FILESETTING).create(filedata).
            then(res => {
            console.log(res.data);
            }).
            catch(err => console.log(err) )     
      
      // put file data to translation table   
      const filepath = {SubDirectory:'FileStorgae'};   
      createApiEndpoint(ENDPOINTS.FILEDATAPUT).create(filepath).
            then(res => {
              console.log(res.data);
              SetFileId(res.data.FileId)
              console.log(res.data.FileId)
            }).
            catch(err => console.log(err) )    
    
      //update file id in user table (FK)
      SetUserId(sessionStorage.getItem('UserId'))
      const patchdata = {UserId:userId, FileId:fileId};   
      createApiEndpoint(ENDPOINTS.PATCHFILEID).create(patchdata).
            then(res => {
              console.log(res.data);
            }).
            catch(err => console.log(err) ) 
      }

    const handleFileSelect = (event) => {
      setSelectedFile(event.target.files[0]);
      setFileName(event.target.files[0].name);
      setFileType(event.target.files[0].type);
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
                        <select className= {styles.form1}  id = "dropdown" >
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
 
 
