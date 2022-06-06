import React, { useContext } from 'react';
import Header from '../header/header';
import { slideInUp } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import { FormattedMessage } from "react-intl";
import { useState } from "react";

import { Context } from '../wrapper/Wrapper.js';
import styles from './ImageTranslation.module.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Logo from "../Logo/MutrajimStandAlone.png"


const animatedStyles = {
    slideInUp: {
      animation: 'x 5s',
      animationName: Radium.keyframes(slideInUp, 'slideInUp')
    }
  }

const ImageTranslation = () => {
    //Use uploaded file and extracted text from navigated page
    const context = useContext(Context);
    const location = useLocation();
    const {selectedFile, extractedText} = location.state
    console.log(selectedFile)
    console.log(extractedText)
    const [loading, setLoading] = useState(false);
    const objectUrl = URL.createObjectURL(selectedFile)
    //Calling Ml Api for extracted text
    var requestOptions = {
        headers: { "Content-Type": "application/json" },
      };
    const [MlData, setMlData] = useState([]);
    const GetMlValue = () => {
    setLoading(true);
    axios.post('http://localhost:9090/predict', JSON.stringify({ input: extractedText }), requestOptions)
        .then(response => response)
        .then(result => {
        // console.log(raw)
        const mdata = result.data['response']
        const len = mdata.length
        console.log(len)
        //filtering data to remove tags
        var filteredMData = mdata.slice(1, mdata.length - 1);
        //joining data to formulate a sentence  
        var str = filteredMData.join(' ');
        //Removing Non-Ascii characters from the string
        var ustr = str.normalize('NFD').replace(/[\u2580-\u259F]/g, '');;
        setMlData(ustr)
        console.log(ustr)
        setLoading(false);
        })
        .catch(error => setLoading(false));  
    }
    return (
        <div className = {styles.main}>
            <Header/>
            <select className = {styles.dropDown} value = {context.locale} onChange={context.selectLang}>
                <option value = "en">English</option>
                <option value = "ur">Urdu</option>
            </select> 
            <div className = {styles.container}>
                <div className = {styles.translateContainer} >
                    <div className = {styles.imageContainer}>
                        <img className={styles.image} src = {objectUrl} />
                    </div>

                    <div className = {styles.textContainer}>
                        <div className= {styles.textContainerText}>
                            <h1> 
                                { extractedText?
                                    <span>{extractedText}</span>
                                    :
                                    <FormattedMessage 
                                    id = "imageTranslation.textImage"
                                />} 
                            </h1>
                        </div>
                        <div className= {styles.textContainerSuggestion}>
                            <h1>
                            { extractedText?
                                    <span>{MlData}</span>
                                    :
                                    <FormattedMessage 
                                    id = "imageTranslation.suggestion"
                                />} 
                            </h1>
                        </div>
                    </div>
                </div>

                <StyleRoot>
                    <div className= {styles.animatedText} style={animatedStyles.slideInUp}>
                        <FormattedMessage
                            id = "imageTranslation.textExtraction"
                        /> 
                    </div>
                </StyleRoot>

                <div className= {styles.submit}>
                    <button onClick={GetMlValue} className= {styles.submitButton}>
                        Translate
                    </button>
                </div>

            </div>
            {loading && <div className={styles.loaderView}>
            <img className={styles.logoImg} src={Logo} />
            </div>}
        </div>
    )
}

export default ImageTranslation;