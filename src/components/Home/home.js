import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { FormattedMessage } from "react-intl";
 
import LanguageIcon from '@mui/icons-material/Language';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ImageIcon from '@mui/icons-material/Image';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SetupLanguage from "../setupLanguage/SetupLanguage";
import { Context } from '../wrapper/Wrapper.js';
 
import styles from './home.module.css';
import Header from '../header/header.js'


 
 
 
const Home = () =>{
    const context = useContext(Context);
    return (
        <div className = {styles.top}>
            <Header/>
            <select className = {styles.dropDown} value = {context.locale} onChange={context.selectLang}>
                <option value = "en">English</option>
                <option value = "ur">Urdu</option>
            </select> 
            <div>
                <div className={styles.midcontainer1}>
                    <FormattedMessage
                        id = "home.start"
                    />          
                </div>
                <div className={styles.midcontainer2}>
                    <FormattedMessage
                        id = "home.followSteps"
                    /> 
                </div>
            </div>
 
           
            <div className={styles.temp}>
                <Box component = "span" className={styles.box1}>
                    <div className = {styles.boxTop}>
                        <FormattedMessage
                            id = "home.setupLanguages"
                        /> 
                    </div>
 
                    <div className = {styles.boxUMid}>
                        <div className = {styles.icon}>
                            <LanguageIcon className={styles.langIcon} sx={{ fontSize: 120 }}/>
                        </div>
                    </div>
 
                    <div className = {styles.boxLMid}>
                        <FormattedMessage
                            id = "home.setupLanguageText"
                        /> 
                    </div>
 
                    <div className = {styles.boxBottom}>
                        <button className = {styles.bottomButton}><Link to='/home/setupLanguage' style={{ color: 'inherit', textDecoration: 'inherit'}}>
                            <FormattedMessage
                                id = "home.setupLanguages"
                            />     
                        </Link></button>
                    </div>
                </Box>
 
                <Box component = "span" className={styles.box2}>
                    <div className = {styles.boxTop}>
                        <FormattedMessage
                            id = "home.uploadFile"
                        /> 
                    </div>
 
                    <div className = {styles.boxUMid}>
                    <div className = {styles.icon}>
                        <CloudUploadIcon className={styles.langIcon} sx={{ fontSize: 120 }}/>
                    </div>
                    </div>
 
                    <div className = {styles.boxLMid}>
                        <FormattedMessage
                            id = "home.uploadFileText"
                        /> 
                    </div>
 
                    <div className = {styles.boxBottom}>
                    <button className = {styles.bottomButton}><Link to='/home/UploadFiles' style={{ color: 'inherit', textDecoration: 'inherit'}}>
                        <FormattedMessage
                            id = "home.uploadFile"
                        />     
                    </Link></button>
                    </div>
                </Box>
                <Box component = "span" className={styles.box2}>
                    <div className = {styles.boxTop}>
                        <FormattedMessage
                            id = "home.uploadImage"
                        /> 
                    </div>
 
                    <div className = {styles.boxUMid}>
                    <div className = {styles.icon}>
                        <ImageIcon className={styles.langIcon} sx={{ fontSize: 120 }}/>
                    </div>
                    </div>
 
                    <div className = {styles.boxLMid}>
                        <FormattedMessage
                            id = "home.uploadImageText"
                        /> 
                    </div>
 
                    <div className = {styles.boxBottom}>
                    <button className = {styles.bottomButton}><Link to='/home/UploadImages' style={{ color: 'inherit', textDecoration: 'inherit'}}>
                        <FormattedMessage
                            id = "home.uploadImage"
                        />     
                    </Link></button>
                    </div>
                </Box>

                <Box component = "span" className={styles.box2}>
                    <div className = {styles.boxTop}>
                        <FormattedMessage
                            id = "home.nextSteps"
                        /> 
                    </div>
 
                    <div className = {styles.boxUMid}>
                        <div className = {styles.icon}>
                            <GroupAddIcon className={styles.langIcon} sx={{ fontSize: 120 }}/>
                        </div>
                        <p>
                            <FormattedMessage
                                id = "home.recommendation"
                            /> 
                        </p><hr/>
                        <br/>
                        <p>
                            <FormattedMessage
                                id = "home.collaborate"
                            /> 
                        </p>
                        <p>
                            <FormattedMessage
                                id = "home.invite"
                            /> 
                        </p>
                        <br/>
                        <button className={styles.bottomButton}>
                            <FormattedMessage
                                id = "home.inviteCowerkers"
                            /> 
                        </button>
                        <br/>
 
                    </div>
 
                    {/* <div className = {styles.boxLMid}>
                       
                    </div> */}
 
                    {/* <div className = {styles.boxBottom}>
                        <Link to='/home/SetupLanguage' className={styles.bottomButton}>
                            <FormattedMessage
                                id = "home.setupEditor"
                            /> 
                        </Link>
                    </div> */}
                </Box>
            </div>
        </div>
    )
}
 
export default Home;