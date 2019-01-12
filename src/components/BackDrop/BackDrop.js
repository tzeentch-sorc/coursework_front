import React from 'react'
import './BackDrop.css'
const backdrop = props =>(
    <div className="backdrop" onClick={props.click}/>
);

export default backdrop;