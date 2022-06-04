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
import Logo from "../Logo/MutrajimStandAlone.png"
import {Spinner} from "react-bootstrap";

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

  const [AllData, setAllData] = useState([]);
  const mydata = { SubDirectory: 'FileStorage' };
  const [selectedItem, setSelectedItem] = useState({});
  const [selectedValue, setSelectedValue] = useState('');
  const [loading, setLoading] = useState(false);
  //API to fetch JSON file data
  const callDisplayKey = () => {
    createApiEndpoint(ENDPOINTS.TRANSLATION).fetchAll(mydata).
    then(myresult => {
      console.log(myresult)
      console.log(myresult.data);
      setAllData(myresult.data);
    }).
    catch(
      err => {
        console.log(err);
      }
    )
  }

  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const data = { Key: key, Value: value };
  const saveKey = (data) => {
    const { id, key, value } = data;
    var obj = { KeyID: id, Key: key, Value: selectedValue }
    console.log(obj);

    // API to update value in Database
    createApiEndpoint(ENDPOINTS.TRANSLATION).update(obj.KeyID, obj).
      then(result => {
        console.log(result)
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
    console.log(id,key,value,'id key and value')
    setSelectedValue(value)
    setSelectedItem({ id, key, value })
  }
  //API to update DB
  const GetUpdatedFile = () => {
    createApiEndpoint(ENDPOINTS.UPDATEDFILE).fetchAll().
    then(myresult => {
      console.log(myresult)
      console.log(myresult.data);
    }).
    catch(
      err => {
        console.log(err);
      }
    )
  }

  //API Work for ML integration and its parsing
  var raw = JSON.stringify({
    'input': selectedValue
  });

  var requestOptions = {
    headers: { "Content-Type": "application/json" },
  };

  const [MlData, setMlData] = useState([]);
  const GetMlValue = (value) => {
    setLoading(true);
    axios.post('http://localhost:9090/predict', JSON.stringify({ input: value }), requestOptions)
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

    <div className={styles.main}>
      <Header />
      <div className={styles.topContainer}>
        <div className={styles.midContainer}>
          <span className={styles.left}>

            <button onClick={callDisplayKey} type="submit" className={styles.showDataButton}>Load Data</button>

            <table className={styles.table} >
              <tr className={styles.element}>

                <th>Index</th>
                <th className={styles.key}>Key</th>
              </tr>
              {AllData.map(({ keyID, key, value }, index) => (
                <tr key={keyID} onClick={() => { GetMlValue(value); SelectItem(keyID, key, value); }} className={styles.element}>

                  <td>{index + 1}</td>
                  <td>{key}</td>
                </tr>
              ))}


            </table>
          </span>

          <span className={styles.right}>

            <div className={styles.rightbottom}>
              <FormContainer onSubmit={(e) => e.preventDefault()}>

                <input value={selectedItem?.key || ''} disabled className={styles.ToptextBox} onChange={t => setKey(t.target.value)} type="text" placeholder="Key" />
                <Marginer direction="vertical" margin="0.6em" />

                {/* <div className= {styles.suggestionText}> */}
                {/* ML input box */}
                <div className={styles.suggestionView} onClick={(e)=>{
                  console.log(e.target,"e")
                  setSelectedValue(MlData);
                }}>
                <input  value={MlData} disabled className={styles.suggestion} onChange={t => setMlData(t.target.value)} type="text" placeholder="suggestion"></input>
                </div>
                {/* </div> */}

                <Marginer direction="vertical" margin="0.6em" />
                <input value={selectedValue} className={styles.BottomtextBox} onChange={t => { setSelectedValue(t.target.value); }} type="text" placeholder="Value" />
                <button onClick={() => saveKey(selectedItem)} className={styles.saveButton} type="submit">Save</button>
                <button onClick={GetUpdatedFile} className={styles.nextButton}><Link to="/home/download" style={{ color: 'inherit', textDecoration: 'inherit' }}>Next</Link></button>
              </FormContainer>
            </div>
          </span>
        </div>
      </div>
      {loading && <div className={styles.loaderView}>
        <img className={styles.logoImg} src={Logo} />
      </div>}
    </div>
  )
}