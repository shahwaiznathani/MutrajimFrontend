import React from 'react';
import Header from '../header/header';
import Box from '@mui/material/Box';
import {
    FormContainer,
    SubmitButton
  } from "./common";
import { Marginer } from "../marginer";
import styles from './keyPage.module.css';
import { useState } from "react";
import { createApiEndpoint, ENDPOINTS } from "../../api";
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import axios from 'axios';

export default function Keypage() {

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

    const [AllData, setAllData]= useState([]);
    const mydata = {SubDirectory:'FileStorage'};
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedValue, setSelectedValue]= useState('')
    //API to fetch JSON file data
    const callDisplayKey = () => {createApiEndpoint(ENDPOINTS.TRANSLATION).fetchAll(mydata).
        then(myresult => {console.log(myresult)
          console.log(myresult.data);
          setAllData(myresult.data); 
          }).
        catch(
          err => {
            console.log(err);
          }
         )}

    const [key, setKey] = useState('');
    const [value, setValue] = useState('');
    const data = {Key:key, Value:value};
    const saveKey = (data) => {
    const {id, key, value} = data;
    var obj = {KeyID:id , Key:key, Value:selectedValue}
    console.log(obj);

    // API to update value in Database
    createApiEndpoint(ENDPOINTS.TRANSLATION).update(obj.KeyID, obj).
    then(result => {console.log(result)
    console.log(result.data);
    toastMixin.fire({
      animation: true,
      title: 'Key Updated Successfully'
      });
    }).
  catch(
    err => {
      console.log(err);
    }
   )
  }
  const SelectItem = (id, key, value) => {
     setSelectedValue(value)
    //  console.log(value)
     setSelectedItem({id, key, value})
  }
  //API to update DB
  const GetUpdatedFile = () => {createApiEndpoint(ENDPOINTS.UPDATEDFILE).fetchAll().
    then(myresult => {console.log(myresult)
      console.log(myresult.data);
      }).
    catch(
      err => {
        console.log(err);
      }
     )}
    //this input is showing previous selection
    // API Work for ML integration
     var raw = JSON.stringify({
       'input': selectedValue
     });
     
     var requestOptions = {
       headers: {"Content-Type": "application/json"},
     };
     
    const [MlData, setMlData]= useState([]);
    const GetMlValue = () => axios.post('http://localhost:9090/predict',raw,requestOptions)
    .then(response => response)
    .then(result => {
      console.log()
      console.log(raw)
      const mdata = result.data['response']
      const len = result.data['response'].length
      // if(len==3){
      setMlData(mdata[1])
      // }
      // console.log(result.data['response'])
      // // setMlData(JSON.stringify(result.data))
      console.log(mdata)
    })
    .catch(error => console.log('error', error));

    return (
      
        <div className = {styles.main}>
            <Header/>
            <div className={styles.topContainer}>
                <div className= {styles.midContainer}>
                    <span className={styles.left}>
                    
                    <button onClick={callDisplayKey} type="submit" className={styles.showDataButton}>Load Data</button>
                        
                        <table className= {styles.table} >
                          <tr className={styles.element}>
                            
                            <th>Index</th>
                            <th className = {styles.key}>Key</th>
                            </tr>
                            {AllData.map(({keyID, key , value}, index) => (
                              <tr key={keyID} onClick={()=> {GetMlValue(); SelectItem(keyID, key, value);}} className={styles.element}> 
                              
                                <td>{index+1}</td>
                                <td>{key}</td>
                              </tr>
                            ))}

                          
                          </table>
                    </span>
 
                    <span className={styles.right}>
   
                        <div className={styles.rightbottom}>
                        <FormContainer onSubmit={(e)=> e.preventDefault()}>

                        <input value={selectedItem?.key || ''}disabled className = {styles.ToptextBox} onChange ={t => setKey(t.target.value)} type="text" placeholder="Key" />
                        <Marginer direction="vertical" margin="0.6em" />

                      <div className= {styles.suggestionText}>
                        {/* ML input box */}
                        <input value={MlData} disabled className = {styles.suggestion} onChange ={t => setMlData(t.target.value)} type="text" placeholder = "suggestion"></input>
                      </div>

                         <Marginer direction="vertical" margin="0.6em" />
                        <input value={selectedValue} className = {styles.BottomtextBox} onChange ={t => {setSelectedValue(t.target.value); }} type="text" placeholder="Value" />
                        <button onClick={() => saveKey(selectedItem)} className = {styles.saveButton} type="submit">Save</button>
                        <button onClick={GetUpdatedFile} className={styles.nextButton}><Link to = "/home/download" style={{ color: 'inherit', textDecoration: 'inherit'}}>Next</Link></button>
                        </FormContainer>
                        </div>
                    </span>
                </div>
            </div>
        </div>
    )
}