import React from 'react';


import './Navbar.css';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton'
import Navelems from '../Navelems/Navelems'
import {Link} from "react-router-dom";

const navbar = props =>(
  <div className="navbar">
      <nav className="navbar_nav">
          <div className="navbar_side-button">
              <DrawerToggleButton click={props.drawerClickHandler}/>
          </div>
          <Link to={"/home"}><div className="navbar_logo">IMPERIAL</div></Link>
          <div className="spacer"/>
          <div className="navbar_nav-items">
              <Navelems/>
          </div>
      </nav>
  </div>
);

export default navbar;