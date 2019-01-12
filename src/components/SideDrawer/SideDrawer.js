import React  from 'react';
import Navelems from '../Navelems/Navelems'
import './SideDrawer.css';
const sideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if (props.show){
        drawerClasses = 'side-drawer open'
    }

    return(
        <div className={drawerClasses}>
            <Navelems handler={props.click}/>
        </div>
    )
};

export default sideDrawer;