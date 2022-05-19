import React, { useState, useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FormattedMessage } from "react-intl";
import { IntlProvider } from "react-intl"; 

import { LoginForm } from "./loginForm";
import { AccountContext } from "./accountContext";
import { SignupForm } from "./signupForm";
import styles from './index.module.css';
import logo from '../Logo/ForPpt2.png';
import { Context } from '../wrapper/Wrapper.js';
import {
  Menu,
  MenuItem,
  MenuButton,
  SubMenu
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

const BoxContainer = styled.div`
  width: 20%;
  min-height: 80%;
  display: flex;
  flex-direction: column;
  background-color: rgba( 255,255, 255, 0.1); /* transparent white */
   color:white;
  border-radius: 30px;
  position: relative;
  overflow: hidden;
  @media screen and (max-width: 600px) { 
      width: 280px;
      min-height: 550px;
      position: relative;
      overflow: hidden;
      display: flex;
  flex-direction: column;
  border-radius: 19px;
  }
`;

const TopContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 5em;
`;

const BackDrop = styled(motion.div)`
  width: 160%;
  height: 550px;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  transform: rotate(60deg);
  top: -290px;
  left: -70px;
  background: linear-gradient(0deg, #DC9573, #DC9573), 
  linear-gradient(0deg, rgba(232, 174, 147, 0.2), 
  rgba(232, 174, 147, 0.2)), 
  #D09072;
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
  margin: 0;
`;

const SmallText = styled.h5`
  color: #fff;
  font-weight: 500;
  font-size: 11px;
  z-index: 10;
  margin: 0;
  margin-top: 7px;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1.8em;
`;

const backdropVariants = {
  expanded: {
    width: "233%",
    height: "1050px",
    borderRadius: "20%",
    transform: "rotate(60deg)",
  },
  collapsed: {
    width: "160%",
    height: "550px",
    borderRadius: "50%",
    transform: "rotate(60deg)",
  },
};

const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 30,
};

const AccountBox = (props) => {

  const context = useContext(Context);

  console.log("Hello123");
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState("signin");

  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {  
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  };

  const switchToSignup = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signup");
    }, 400);
  };

  const switchToSignin = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signin");
    }, 400);
  };

  const contextValue = { switchToSignup, switchToSignin };

  return (
    <div className = {styles.mainBox}>

        <select className = {styles.dropDown} value = {context.locale} onChange={context.selectLang}>
          <option value = "en">English</option>
          <option value = "ur">Urdu</option>
        </select> 
    
    <div className = {styles.textbox}>
      <div className = {styles.bigName}>
        <FormattedMessage
          id = "login.name"
        />
      </div>
      <div className = {styles.smalltext}>
        <FormattedMessage
          id = "login.moto"
        />  
      </div>
    </div>
    
    <div className = {styles.backdrop}> 
      <img src = {logo} alt = "Logo" className = {styles.picturebox}/>
    </div>
      <AccountContext.Provider value={contextValue} className = "Hello">
          <BoxContainer>
          <TopContainer>
            <BackDrop
              initial={false}
              animate={isExpanded ? "expanded" : "collapsed"}
              variants={backdropVariants}
              transition={expandingTransition}>


            </BackDrop>           
            {active === "signin" && (
              <HeaderContainer>
                <HeaderText>
                  <FormattedMessage
                    id = "login.Welcome"
                  />
                </HeaderText>
                <HeaderText>
                  <FormattedMessage
                    id = "login.Back"
                  />  
                </HeaderText>
                <SmallText>
                  <FormattedMessage
                    id = "login.SmallText"
                  />
                </SmallText>
              </HeaderContainer>
            )}
            {active === "signup" && (
              <HeaderContainer>
                <HeaderText>
                  <FormattedMessage
                    id = "signup.create"
                  />  
                </HeaderText>
                <HeaderText>
                  <FormattedMessage
                    id = "signup.account"
                  />
                </HeaderText>
                <SmallText>
                  <FormattedMessage
                    id = "signup.smallText"
                  />
                </SmallText>
              </HeaderContainer>
            )}
          </TopContainer>
          <InnerContainer>
            {active === "signin" && <LoginForm />}
            {active === "signup" && <SignupForm />}
          </InnerContainer>
        </BoxContainer>
      </AccountContext.Provider>
    </div> 

  );
}

export default AccountBox;