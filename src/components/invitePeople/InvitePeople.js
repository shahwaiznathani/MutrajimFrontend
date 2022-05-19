import React from 'react'
import Header from '../header/header';
import { useState } from "react";
import styles from './InvitePeople.module.css';
import invitePeople from "./invitePeople.png";
import { createApiEndpoint, ENDPOINTS } from "../../api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const InvitePeople = () => {

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
    }});
    
    const success = () => {
      toastMixin.fire({
        animation: true,
        title: 'Invitation Sent'
      });
      navigate('/home');
    }
  
    const error = () => {
      toastMixin.fire({
        title: 'Invalid Details',
        icon: 'error'
      });
    }

    const [email, Setemail] = useState('');
    const [body, SetBody] = useState('');

    //API NOT WORKING
    const data = {ToEmail:email, Subject:'Invite To Mutrajim', Body:body};
    const SendEmailAPI = () => {createApiEndpoint(ENDPOINTS.EMAIL).create(data).
      then(res => {
        console.log(res);
        if (res.status === 200) {
          console.log(res, 'result');
          success();
        }
      }).
      catch(err => {
        console.log(err);
        error(); 
      })}

    return (
        <div className={styles.top}>
            <Header/>
            <div className = {styles.mainContainer} >
                <div className = {styles.formContainer}>
                    <form className= {styles.formMid}> 
                        <label className= {styles.nameLabel}>Email</label>
                        <input onChange ={t => Setemail(t.target.value)} className= {styles.inviteInput} name="name" type = "email"/>
                        <label className= {styles.nameLabel}>Role</label>
                        <input onChange ={t => SetBody(t.target.value)} className= {styles.inviteInput} name="role" />
                        <button onClick={(e)=> {e.preventDefault(); SendEmailAPI();}} className= {styles.submitButton}>Invite</button>
                    </form>
                </div>
                <img className = {styles.invitePeopleImage} src={invitePeople} alt="Invite People" />
            </div>

        </div>
    )
}

export default InvitePeople;
