import React from 'react';
import styles from './downloadPage.module.css';
import Header from '../header/header';

import { Marginer } from "../marginer";
import ArticleIcon from '@mui/icons-material/Article';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useState } from "react";
import { createApiEndpoint, ENDPOINTS } from "../../api";
import { UpdateDisabled } from '@mui/icons-material';

export default function DownloadPage() {
    // Delete API
    const DeleteDataTable = () => {createApiEndpoint(ENDPOINTS.DELETE).deleteAll().
        then(response => {
            console.log(response)
          }).
        catch(
          err => {
            console.log(err);
          }
         )}

    return(
        <div className={styles.main}>
            <Header/>

            <div className = {styles.mid}>
                <div className = {styles.text}>Congrats! Your file has been successfully Translated.</div>
                {/* <Marginer direction="vertical" margin="01em"/> */}
                <div className = {styles.text}>Thanks for choosing Mutrajim!</div>

                <div className = {styles.midBottom}>

                    <span className = {styles.leftButton}>
                        <div className = {styles.oFile}>Your Final Files</div>
                        {/* <div className = {styles.fileName}>File Name</div> */}
                        <div className = {styles.articleIcon1}><ArticleIcon sx={{ fontSize: 170 }} className={styles.articleIcon}/></div>
                        <button onClick={DeleteDataTable} className = {styles.downloadIcon}>
                            {/* Download API */}
                            <a href='http://localhost:12107/api/FileUpload/download?subDirectory=FileStorage'  style={{ color: 'inherit', textDecoration: 'inherit'}}>Download File</a>
                            <FileDownloadIcon sx={{ fontSize: 25 }}/>
                        </button>
                    </span>

                    {/*          Change in FYP 2        */}
                    {/* <span className = {styles.leftButton}>
                        <div className = {styles.oFile}>Your Original File</div>
                        <div className = {styles.fileName}>File Name</div>
                        <div className = {styles.articleIcon1}><ArticleIcon sx={{ fontSize: 150 }} className={styles.articleIcon}/></div>
                        <div className = {styles.downloadIcon}>
                            Download File
                            <FileDownloadIcon sx={{ fontSize: 25 }}/>
                        </div>


                    </span>
                    <span className = {styles.rightButton}>
                    <div className = {styles.oFile}>Your Translated File</div>
                        <div className = {styles.fileName}>File Name</div>
                        <div className = {styles.articleIcon1}><ArticleIcon sx={{ fontSize: 150 }} className={styles.articleIcon}/></div>
                        <div className = {styles.downloadIcon}>
                            Download File
                            <FileDownloadIcon sx={{ fontSize: 25 }}/>
                        </div>
                    </span> */}
                </div>
            </div>
        </div>
    )
}