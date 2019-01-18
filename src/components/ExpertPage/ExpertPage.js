import React from 'react'
import './ExpertPage.css'
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dialog} from "primereact/dialog";
import connect from "react-redux/es/connect/connect";
import {changeLot, rmLot} from "../../actions/listAction";
import {InputText} from 'primereact/inputtext';


class ExpertPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedLot: null,
            dialogVisible: false,
            certificate: ''
        };

        this.handleLot = this.handleLot.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    onSubmit(event) {
        let lot = this.state.selectedLot;
        lot.certificate = this.state.certificate;
        this.props.changeLot(lot);
        this.setState({dialogVisible: false});
        this.setState({selectedLot: null});
    }

    onRemove(event){
        let lot = this.state.selectedLot;
        this.props.removeLot(lot);
        this.setState({dialogVisible: false});
        this.setState({selectedLot: null});
    }

    handleLot(e){
        this.setState({selectedLot: e.value, dialogVisible: true})
    }

    renderContents(lot){
        return(
            <div>
                <table className={"info"}>
                    <thead>
                    <tr>
                        <td>
                            Lot name: "{lot.name}"
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Author:</td>
                        <td>{lot.author}</td>
                    </tr>
                    <tr>
                        <td>Genre:</td>
                        <td>{lot.genre}</td>
                    </tr>
                    <tr>
                        <td>Technique:</td>
                        <td>{lot.technique}</td>
                    </tr>
                    <tr>
                        <td>Sertificate №:</td>
                        <td>{lot.certificate ? lot.certificate : <span style={{color: 'red'}}>NOT STATED</span>}</td>
                    </tr>
                    <tr>
                        <td>Seller:</td>
                        <td>{lot.seller}</td>
                    </tr>
                    <tr>
                        <td>Current bet:</td>
                        <td>{lot.bet}</td>
                    </tr>
                    <tr>
                        <td>Expiration Date:</td>
                        <td>{lot.expDate}</td>
                    </tr>
                    </tbody>
                </table>
                {lot.certificate ? <span> IS ALREADY SET: {lot.certificate}</span> :
                    <span className="p-float-label">
                        <InputText id="in" value={this.state.certificate}
                                   onChange={(e) => this.setState({certificate: e.target.value})}/>
                        <label htmlFor="in">Certificate №</label>
                    </span>
                }onHide
            </div>
        );
    }

    render() {

        const footer = (
            <div>
                <Button label="Submit" icon="pi pi-check" onClick={this.onSubmit} />
                <Button label="Delete" icon="pi pi-times" onClick={this.onRemove} className="p-button-danger"/>
            </div>
        );



        return(
            <div>
                <DataTable value={this.props.lots}
                           scrollable={true}
                           scrollHeight={"800px"}
                           selectionMode={"single"}
                           selection={this.state.selectedLot}
                           onSelectionChange={e =>
                               this.handleLot(e)}
                           className={"profile-main"}
                >
                    <Column field="id" header="id" sortable={true}/>
                    <Column field="name" header="name" sortable={true}/>
                    <Column field="author" header="author" sortable={true}/>
                    <Column field="technique" header="technique" sortable={true}/>
                    <Column field="certificate" header="certificate" sortable={true}/>
                    <Column field="expDate" header="expDate" sortable={true}/>
                    <Column field="seller" header="seller" sortable={true}/>
                </DataTable>
                <Dialog header="Lot Information" visible={this.state.dialogVisible}
                        // style={{width: '50vw'}}
                        modal={true}
                        onHide={(e) =>
                            this.setState({dialogVisible: false})}
                        footer={footer}
                >
                    {this.state.selectedLot !== null ? this.renderContents(this.state.selectedLot) : "NO LOT FOUND"}


                </Dialog>
            </div>
        )
    }
}

function mapStateToProps(state){
    return { lots: state.lotListReducer.items}
}

function mapDispatchToProps(dispatch){
    return {
        changeLot: (changed)=>dispatch(changeLot(changed)),
        removeLot: (deleted)=>dispatch(rmLot(deleted))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpertPage);