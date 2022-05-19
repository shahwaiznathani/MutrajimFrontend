import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';

import English from '../en.json';
import Urdu from '../ur.json';

export const Context = React.createContext();

const local = navigator.language;

let lang;
if (local === 'en'){
  lang = English;
}
else{
  lang = Urdu;
}

const Wrapper = (props) => {
    //edited
    const [locale, setLocale] = useState ('en');
    const [messages, setMessages] = useState(English);

    function selectLang (e){
        const newLocale = e.target.value;
        setLocale(newLocale);
        if (newLocale === 'ur'){
            setMessages (Urdu);
        }
        else {
            setMessages (English);
        }
    }

    return(
        <Context.Provider value = {{locale, selectLang}}>
            <IntlProvider messages = { messages } locale = { locale }>
                {props.children}
            </IntlProvider>
        </Context.Provider>
    )
}

export default Wrapper;