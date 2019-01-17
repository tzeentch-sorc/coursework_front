import React from 'react'
import './ExpertPage.css'
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dialog} from "primereact/dialog";
import connect from "react-redux/es/connect/connect";
import {changeLot} from "../../actions/listAction";


class ExpertPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedLot: null,
            dialogVisible: false
        };

        this.handleLot = this.handleLot.bind(this);
        this.onHide = this.onHide.bind(this);
    }

    onHide(event) {
        this.setState({dialogVisible: false});
    }

    handleLot(e){
        this.setState({selectedLot: e.value, dialogVisible: true})
    }

    handleChangeLot(e){

    }

    render() {
        const footer = (
            <div>
                <Button label="Submit" icon="pi pi-check" onClick={this.onHide} />
                <Button label="Cancel" icon="pi pi-times" onClick={this.onHide} className="p-button-danger"/>
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
                    {this.state.selectedLot !== null ? this.state.selectedLot.description : "NO LOT"}
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
        changeLot: (changed)=>dispatch(changeLot(changed))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpertPage);