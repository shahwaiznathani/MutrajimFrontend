import React, { Component, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

//Components
import AccountBox from "./components/accountBox/index";
import Header from './components/header/header';
import Home from './components/Home/home';
import SetupLanguage from './components/setupLanguage/SetupLanguage';
import UploadFiles from './components/uploadFile/UploadFiles';
import Keypage from './components/keyPage/keyPage';
import DownloadPage from './components/downloadPage/downloadPage';
import { Navigate } from 'react-router-dom';
import InvitePeople from './components/invitePeople/InvitePeople';
import UploadImages from './components/UploadImages/UploadImages';
import ImageTranslation from './components/ImageTranslation/ImageTranslation';

// fucntion for protected routes
const ProtectedRoute = ({ Element, token }) => {
  useEffect(()=>{
  },[token])
    console.log(token, 'auth before render');
        if (token == "" || token == undefined) {
            return <Navigate to={"/"} />
        } else {
            console.log("authorized");
            return <Element />
        }
}

class Abc extends Component {
    componentDidMount(){
        var token = localStorage.getItem("token");
        console.log(token, "tokken");
        this.setState({token});
    }
    render() {
        console.log("hello");
        return (
            // <Routes>
            //     <Route exact path='/' element={<AccountBox />} />
            //     {/* applied protected routes here */}
            //     <Route exact path='/home' element={<ProtectedRoute token={this.state?.token} Element={Home} />} />
            //     <Route path='/home/setupLanguage' element={<ProtectedRoute token={this.state?.token} Element={SetupLanguage} />} />
            //     <Route path='home/UploadFiles' element={<ProtectedRoute token={this.state?.token} Element={UploadFiles} />} />
            //     <Route path='home/keyPage' element={<ProtectedRoute token={this.state?.token} Element={Keypage} />} />
            //     <Route path='home/download' element={<ProtectedRoute token={this.state?.token} Element={DownloadPage} />} />
            //     <Route path ='home/InvitePeople' element={<ProtectedRoute token={this.state?.token} Element={InvitePeople} />} />
            //     <Route path='home/UploadImage' element={<ProtectedRoute token={this.state?.token} Element={UploadImages} />} />
            //     <Route path ='home/ImageTranslation' element={<ProtectedRoute token={this.state?.token} Element={ImageTranslation} />} />

            // </Routes>
            <Routes>
                    <Route exact path = '/' element = {<AccountBox/>}/>
                    {/* <Route path = '/home/Landing' element={<Landing/>}/> */}
                    <Route exact path = '/home' element = {<Home/>}/>
                    <Route path = '/home/setupLanguage' element = {<SetupLanguage/>}/>
                    <Route path = 'home/UploadFiles' element = {<UploadFiles/>}/>
                    <Route path = 'home/UploadImages' element = {<UploadImages/>}/>
               
                    <Route path = 'home/keyPage' element = {<Keypage/>}/>
                    <Route path = 'home/download' element = {<DownloadPage/>}/>
                    <Route path = 'home/InvitePeople' element = {<InvitePeople/>}/>
                    <Route path = 'home/ImageTranslation' element = {<ImageTranslation/>}/>
            </Routes>
        )
    }
}

export default Abc;