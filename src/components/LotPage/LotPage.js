import React from 'react';
import {setCurrentLot} from "../../actions/listAction";
import connect from "react-redux/es/connect/connect";
import './LotPage.css'
import Vangog from './../../resources/vangog.jpg'
import {Fieldset} from "primereact/fieldset";


class LotPage extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            lot: null
        }
    }

    componentWillMount() {
        window.scrollTo(0, 0);
        const {currentLot} = this.props;
        const {items} = this.props;
        const lot = items.find((item) =>{
            return item.id === currentLot;
        });
        this.setState({lot});

    }

    render() {
        const lot = this.state.lot;
        return(
            <div className={'LotPage'}>
                <h2>Lot #{lot.id} information</h2>
                <hr/>
                <div className={'lot-page-img-container'}>
                    <img src={Vangog} alt={""}/>
                </div>
                <hr/>
                <div>
                    <table className={"info"}>
                        <thead>
                        <tr>
                            <td>
                                Lot information:
                            </td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Author:</td>
                            <td>{lot.author}</td>
                        </tr>
                        <tr>
                            <td>Expiration Date:</td>
                            <td>{lot.expDate}</td>
                        </tr>
                        <tr>
                            <td>Seller:</td>
                            <td>{lot.seller}</td>
                        </tr>
                        <tr>
                            <td>Current bet:</td>
                            <td>{lot.bet}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <hr/>
                <Fieldset legend={lot.name}>
                    {lot.description}
                </Fieldset>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        currentLot: state.currentLotReducer.currentLot,
        items: state.lotListReducer.items
    }
}

function mapDispatchToProps(dispatch){
    return {
        setCurrentLot: (lotID) => {
            dispatch(setCurrentLot(lotID));
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LotPage);