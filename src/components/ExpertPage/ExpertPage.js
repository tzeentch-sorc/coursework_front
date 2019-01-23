import React from 'react'
import './ExpertPage.css'
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dialog} from "primereact/dialog";
import connect from "react-redux/es/connect/connect";
import {changeLot, rmLot, setList} from "../../actions/listAction";
import {InputText} from 'primereact/inputtext';
import axios from "axios";
import {urlPort} from "../../index";
import {Growl} from "primereact/growl";
import {Lightbox} from 'primereact/lightbox';
import Pict from '../../resources/pict.png'


class ExpertPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedLot: null,
            dialogVisible: false,
            certificate: '',
            lots: this.props.lots
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
        axios.post(urlPort('/expert/set'), {lotId: lot.id}, {withCredentials: true});
        this.setState({selectedLot: null});
    }

    onRemove(event){
        let lot = this.state.selectedLot;
        this.props.removeLot(lot);
        axios.post(urlPort('/expert/delete'), {paintingId: lot.paintingByPainting.id+''}, {withCredentials: true});
        this.setState({dialogVisible: false});
        this.setState({selectedLot: null});
    }

    handleLot(e){
        this.setState({selectedLot: e.value, dialogVisible: true})
    }

    componentWillMount() {
        axios.get(urlPort('/lots/expert'), {withCredentials: true})
            .then(res=> {
                res.data.forEach((elem) => {
                    let date = new Date(elem.startDate).toLocaleDateString();
                    let time = new Date(elem.startDate).toLocaleTimeString();
                    elem.startDate = date + ' ' + time;
                }
            );
                // alert(JSON.stringify(res.data));
                this.setState({lots: res.data});
                this.props.setExpertLots(res.data);

            })
            .catch(err => {
                alert(JSON.stringify(err));
            })
    }


    renderContents(lot){
        return(
            <div>
                <table className={"info"}>
                    <thead>
                    <tr>
                        <td colSpan={2}>
                            Lot name: "{lot.paintingByPainting.name}"
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Lot ID:</td>
                        <td>{lot.id}</td>
                    </tr>
                    <tr>
                        <td>Painting ID:</td>
                        <td>{lot.paintingByPainting.id}</td>
                    </tr>
                    {/*<tr>*/}
                        {/*<td>Image:</td>*/}
                        {/*<td>{lot.paintingByPainting.img}</td>*/}
                    {/*</tr>*/}
                    <tr>
                        <td>Author:</td>
                        <td>{lot.paintingByPainting.author}</td>
                    </tr>
                    <tr>
                        <td>Genre:</td>
                        <td>{lot.paintingByPainting.genre}</td>
                    </tr>
                    <tr>
                        <td>Technique:</td>
                        <td>{lot.paintingByPainting.technique}</td>
                    </tr>
                    <tr>
                        <td>Sertificate №:</td>
                        <td>{lot.certificate ? lot.certificate : <span style={{color: 'red'}}>NOT STATED</span>}</td>
                    </tr>
                    <tr>
                        <td>Seller email:</td>
                        <td>{lot.usersBySeller.username}</td>
                    </tr>
                    <tr>
                        <td>Seller surname:</td>
                        <td>{lot.usersBySeller.surname}</td>
                    </tr>
                    <tr>
                        <td>Starts date:</td>
                        <td>{lot.startDate}</td>
                    </tr>
                    </tbody>
                </table>
                <hr/>
                <Lightbox type={"images"} easing="ease-in" effectDuration="900ms" images={
                    [
                        {
                            source: lot.paintingByPainting.img,
                            thumbnail: Pict,
                            title: lot.paintingByPainting.name
                        }
                    ]
                }/>
                {/*{lot.certificate ? <span> IS ALREADY SET: {lot.certificate}</span> :*/}
                    {/*<span className="p-float-label">*/}
                        {/*<InputText id="in" value={this.state.certificate}*/}
                                   {/*keyfilter={'pint'}*/}
                                   {/*onChange={(e) => this.setState({certificate: e.target.value})}/>*/}
                        {/*<label htmlFor="in">Certificate №</label>*/}
                    {/*</span>*/}
                {/*}*/}
            </div>
        );
    }

    render() {

        const footer = (
            <div>
                <Button label="Accept" icon="pi pi-check" onClick={this.onSubmit} />
                <Button label="Delete" icon="pi pi-times" onClick={this.onRemove} className="p-button-danger"/>
            </div>
        );



        return(
            <div>
                <Growl ref={(el) => this.growl = el}/>
                <DataTable value={this.props.lots}
                           scrollable={true}
                           scrollHeight={"800px"}
                           selectionMode={"single"}
                           selection={this.state.selectedLot}
                           onSelectionChange={e =>
                               this.handleLot(e)}
                           className={"profile-main"}
                           responsive={true}
                >
                    <Column field="id" header="idLot" sortable={true}/>
                    {/*<Column field="startDate" header="startDate" sortable={true}/>*/}
                    <Column field="startPrice" header="startPrice" sortable={true}/>
                    <Column field="paintingByPainting.id" header="idPainting" sortable={true}/>
                    <Column field="paintingByPainting.name" header="name" sortable={true}/>
                    {/*<Column field="paintingByPainting.technique" header="technique" sortable={true}/>*/}
                    {/*<Column field="paintingByPainting.author" header="author" sortable={true}/>*/}
                    {/*<Column field="paintingByPainting.genre" header="genre" sortable={true}/>*/}
                    <Column field="usersBySeller.id" header="Seller id" sortable={true}/>
                    <Column field="usersBySeller.name" header="Seller name" sortable={true}/>
                    {/*<Column field="paintingByPainting.img" header="image" sortable={true}/>*/}
                    {/*<Column field="certificate" header="certificate" sortable={true}/>*/}
                    {/*<Column field="expDate" header="expDate" sortable={true}/>*/}
                    {/*<Column field="seller" header="seller" sortable={true}/>*/}
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
        removeLot: (deleted)=>dispatch(rmLot(deleted)),
        setExpertLots: (list)=>dispatch(setList(list))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpertPage);