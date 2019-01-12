import React  from 'react';
import './Notfound.css'
import Aquila from '../../resources/aquila.jpg'
const notFound = props => (
    <div className={'msg'}>
        <h1>
            +++Oops... It seems that page does not exist+++
        </h1>
        <h2>
            +++Report this issue to your regiment commissar+++
        </h2>
        <hr/>
        <img src={Aquila} alt={""}/>
    </div>

);

export default notFound;