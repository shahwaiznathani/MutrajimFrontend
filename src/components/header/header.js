import React, { useContext } from "react";
import {Link} from 'react-router-dom';
import { IntlProvider } from "react-intl"; 
import { FormattedMessage } from "react-intl";

import logo from "../Logo/GreyLogoFull.png"


import styles from './header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Context } from '../wrapper/Wrapper.js';
 
import {
    Menu,
    MenuItem,
    MenuButton,
    SubMenu
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

 
const menuClassName = ({ state }) =>
  state === "opening"
    ? styles.menuOpening
    : state === "closing"
    ? styles.menuClosing
    : styles.menu;
 
const menuItemClassName = ({ hover }) =>
hover ? styles.menuItemHover : styles.menuItem;

 
const Header = () =>{

    const context = useContext(Context);
    const logout = ()=>{
        console.log("removed token")
        localStorage.removeItem("token");
    }
    return (
            <div className = {styles.dashboard}>
                <span className = {styles.top}>

                    {/* <span className = {styles.appname}>
                        <h1>
                            <Link to='/home' style={{ color: 'inherit', textDecoration: 'inherit'}}>
                            <FormattedMessage
                                id = "header.title"
                            />
                            </Link>
                        </h1>
                    </span> */}
                   
                    <span className = {styles.referus}>
                        <button className={styles.btnprimary}>
                            <FormattedMessage
                                id = "header.referUs"
                            />
                        </button>
                    </span>
 
                    <span className = {styles.jobs}>
                        <Link to = "/home/keyPage"><button className={styles.btnprimary}>
                        <FormattedMessage
                                 id = "header.translate"
                            />
                        </button></Link>
                    </span>
 
                    <span className = {styles.midname}>
                        <Link to =  "/home">
                            <img src = {logo} alt = "Logo" className = {styles.logo}/>
                        </Link>
                    </span>
 
 
                    <span className = {styles.invite}>
                    <Link to='/home/InvitePeople' style={{ color: 'inherit', textDecoration: 'inherit'}}><button className={styles.btnprimary}>
                        <FormattedMessage
                                id = "header.invitePeople"
                            />
                        </button></Link>
                    </span>
 
                    <span className = {styles.help}>
                        <Menu
                            transition
                            menuClassName={menuClassName}
                            menuButton={<MenuButton className={styles.btnprimary}><FormattedMessage
                            id = "header.help"
                        /></MenuButton>}>
 
                            <MenuItem className={styles.menuItem}><FormattedMessage
                                id = "header.documentation"
                            /></MenuItem>
                            <MenuItem className={styles.menuItem}><FormattedMessage
                                id = "header.support"
                            /></MenuItem>                
                       
                        </Menu>
                    </span>
 
                    <span className = {styles.user}>
                        <Menu
                            transition
                            menuClassName={menuClassName}
                            menuButton={<MenuButton className={styles.btnprimary}>
                                {/* <FormattedMessage
                                    id = "header.user"
                                /> */}
                                {sessionStorage.getItem('UserName')}
                            </MenuButton>}>
                           
                            <MenuItem className={styles.menuItem}><FormattedMessage
                                id = "header.profileSetting"
                            /></MenuItem>
                            <MenuItem className={styles.menuItem}><FormattedMessage
                                id = "header.myAccounts"
                            /></MenuItem>                
                            <MenuItem onClick={logout} className={styles.menuItem}><Link to='/' style={{ color: 'inherit', textDecoration: 'inherit'}}><FormattedMessage
                                id = "header.logout"
                            /></Link></MenuItem>
                        </Menu>
                    </span>
                </span>
            </div>
    )
}
 
export default Header;