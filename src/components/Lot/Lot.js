import React from 'react'
import Pict from '../../resources/pict.png';
import {ScrollPanel} from 'primereact/scrollpanel';
import './Lot.css'
import {withRouter} from "react-router-dom";
import {setCurrentLot} from "../../actions/listAction";
import {connect} from "react-redux";
class Lot extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event){
        this.props.setCurrentLot(this.props.id);
        let { history } = this.props;
        history.push('/lot');

    }


    render() {
            return (
                <div style={{ padding: '.5em' }} className={"lot " + this.props.renderType} onClick={this.handleClick}>
                    <img src={Pict} alt=""/>
                    <div className={"lot-details"}>

                            <table>
                                <tbody className={"fonts"}>
                                <tr>
                                    <td>
                                        Name:
                                    </td>
                                    <td className={'val'}>
                                        {this.props.name}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Author:
                                    </td>
                                    <td className={'val'}>
                                        {this.props.author}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Exp Date:
                                    </td>
                                    <td className={'val'}>
                                        {this.props.expDate}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        <ScrollPanel className={"description"} style={{width: '100%', height: '80px', margin: 0}}>
                            {this.props.description}
                        </ScrollPanel>
                    </div>
                </div>

            );


    }

}

function mapStateToProps(state){
    return { currentLot: state.currentLotReducer.currentLot}
}

function mapDispatchToProps(dispatch){
    return {
        setCurrentLot: (lotID) => {
            dispatch(setCurrentLot(lotID));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Lot));

