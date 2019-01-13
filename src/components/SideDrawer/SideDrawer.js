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
            <div className={"side-drawer_logo"}>
                <span>
                    THE IMPERIAL AUCTION HOUSE
                </span>
            </div>
            <Navelems handler={props.click}/>
        </div>
    )
};

export default sideDrawer;