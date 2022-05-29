import React, { useContext } from 'react';
import Header from '../header/header';
import { slideInUp } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import { FormattedMessage } from "react-intl";
import { useState } from "react";

import { Context } from '../wrapper/Wrapper.js';
import styles from './ImageTranslation.module.css';
import test123 from './test123.png'

const animatedStyles = {
    slideInUp: {
      animation: 'x 5s',
      animationName: Radium.keyframes(slideInUp, 'slideInUp')
    }
  }

const ImageTranslation = () => {
    const context = useContext(Context);
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
                        <img className={styles.image} src = {test123} />
                    </div>

                    <div className = {styles.textContainer}>
                        <div className= {styles.textContainerText}>
                            <h1>
                                <FormattedMessage
                                    id = "imageTranslation.textImage"
                                /> 
                            </h1>
                        </div>
                        <div className= {styles.textContainerSuggestion}>
                            <h1>
                                <FormattedMessage
                                    id = "imageTranslation.suggestion"
                                /> 
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
                    <button className= {styles.submitButton}>
                        <FormattedMessage
                            id = "imageTranslation.nextButton"
                        /> 
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ImageTranslation;