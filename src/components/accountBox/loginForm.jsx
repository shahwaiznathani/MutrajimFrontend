import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Switch } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { Context } from '../wrapper/Wrapper.js';


import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { useState } from "react";
import { createApiEndpoint, ENDPOINTS } from "../../api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export function LoginForm(props) {

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

  const { switchToSignup } = useContext(AccountContext);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const data = { UserName: userName, Password: password };
  const myLogin = () => {
    createApiEndpoint(ENDPOINTS.LOGIN).create(data).
      then(result => {
        console.log(result);
        sessionStorage.setItem('UserName', userName);
        sessionStorage.setItem('UserId', result.data.id);
        localStorage.setItem("token", result.data.token);
        console.log(userName)
        //stroing user id and name in session storage
        console.log(sessionStorage.getItem('UserName'))
        console.log(sessionStorage.getItem('UserId'))
        console.log(result.data);
        console.log(result.status);
        if (result.status === 200) {
          console.log(result, 'result');
          success();
        }
        // else if(result.status !== 200){
        //   error();
        // }
      }).
      catch(
        err => {
          console.log(err);
          error();
          //alert('Invalid User'); 
        }

      )
  }

  const success = () => {
    toastMixin.fire({
      animation: true,
      title: 'Signed In Successfully'
    });
    navigate('/home');
  }

  const error = () => {
    toastMixin.fire({
      title: 'Wrong Password',
      icon: 'error'
    });
  }


  const context = useContext(Context);

  return (
    <BoxContainer>
      <FormContainer>
        <Input onChange={t => setUserName(t.target.value)} type="text" placeholder="username" />
        <Marginer direction="vertical" margin="0.6em" />
        <Input onChange={t => setPassword(t.target.value)} type="password" placeholder="password" value={password} />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <BoldLink href="#">
        <FormattedMessage
          id="login.forgetPass"
        />
      </BoldLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton onClick={myLogin} type="submit">
        <FormattedMessage
          id="login.signIn"
        />
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        <FormattedMessage
          id="login.noAccount"
        />
        {" "}
        <BoldLink href="#" onClick={switchToSignup}>
          <FormattedMessage
            id="login.signUp"
          />
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );

}