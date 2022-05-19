import React, { useContext } from "react";
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
import Swal from "sweetalert2";
import { FormattedMessage } from "react-intl";
import { Context } from '../wrapper/Wrapper.js'; 

export function SignupForm(props) {

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



  const {switchToSignin } = useContext(AccountContext);
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const data = {UserName:userName, Email:email, Password:password, FullName:fullName};
  const mySignUp = () => {createApiEndpoint(ENDPOINTS.REGISTER).create(data).
    then(res => {
      console.log(res);
      success();
    }).
    catch(err => {
      console.log(err) 
      error();
    })}
  
    function success(e) {
      // clearing the values
      setEmail("");
      setPassword("");
      setUserName("");
      setFullName("");
  
      toastMixin.fire({
        animation: true,
        title: 'Signed Up Successfully'
        });
    }
  
    function error(e){
      // clearing the values
      setEmail("");
      setPassword("");
      setUserName("");
      setFullName("");
  
      toastMixin.fire({
        title: 'SignUp Failed',
        icon: 'error'
      });
    }


  return (
    <BoxContainer>
      <FormContainer>
        <Input onChange ={t => setFullName(t.target.value)}  type="text" placeholder = "fullname" value={fullName} />
        <Marginer direction="vertical" margin="0.6em" />
        <Input onChange ={t => setUserName(t.target.value)}  type="text" placeholder= "username" value={userName} />
        <Marginer direction="vertical" margin="0.6em" />
        <Input onChange ={t => setEmail(t.target.value)} type="text" placeholder= "Email" value={email}/>
        <Marginer direction="vertical" margin="0.6em" />
        <Input onChange ={t => setPassword(t.target.value)} type="password" placeholder= "password"  value={password} />
        <Marginer direction="vertical" margin="0.6em" />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton onClick={mySignUp} type="submit">
        <FormattedMessage
          id = "signup.signUp"
        /> 
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        <FormattedMessage
          id = "signup.alreadyAccount"
        /> 
        <BoldLink href="#" onClick={switchToSignin}>
          <FormattedMessage
            id = "signup.signIn"
          /> 
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}