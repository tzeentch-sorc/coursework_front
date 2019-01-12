import React from 'react';
import {Link} from "react-router-dom";

const navelems = props => {
    return(
        <ul className="navelems">
            <li><Link to={'/home'} onClick={props.handler}>Home</Link></li>
            <li><Link to={'/lots'} onClick={props.handler}>Auction</Link></li>
            <li><Link to={'/login'} onClick={props.handler}>Login</Link></li>
        </ul>
    );
};
export default navelems;