import React from 'react';
import {Link} from "react-router-dom";
import connect from "react-redux/es/connect/connect";

const navelems = props => {
    return(
        <ul className="navelems">
            <li><Link to={'/home'} onClick={props.handler}>Home</Link></li>
            <li><Link to={'/lots'} onClick={props.handler}>Auction</Link></li>
            {!props.isAuthorised ?
                <li><Link to={'/login'} onClick={props.handler}>Login</Link></li>
                :
                <li><Link to={'/profile'} onClick={props.handler}>Profile</Link></li>
            }
        </ul>
    );
};

function mapStateToProps(state){
    return { isAuthorised: state.loginReducer.isAuthorised}
}

function mapDispatchToProps(dispatch){
    return {}

}

export default connect(mapStateToProps, mapDispatchToProps)(navelems);