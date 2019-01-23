import React from 'react'
import './UserPage.css'
import {TabPanel, TabView} from "primereact/tabview";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Link} from "react-router-dom";
import {Button} from "primereact/button";
import {setUnAuth} from "../../actions/login";
import {connect} from "react-redux";
import {urlPort} from "../../index";
import axios from 'axios';
import {setList} from "../../actions/listAction";
import {Lightbox} from "primereact/lightbox";
import Pict from "../../resources/pict.png";
import {Dialog} from "primereact/dialog";
import {FileUpload} from 'primereact/fileupload';
import {InputTextarea} from 'primereact/inputtextarea';
import {InputText} from 'primereact/inputtext';
import {Growl} from "primereact/growl";



class UserPage extends React.Component {
    constructor(props) {
        super(props);

        this.state ={
            activeIndex: 0,
            items: [],
            selectedLot: null,
            dialogVisible: false,
            author: '',
            desc: '',
            genre:'',
            name:'',
            technique:'',
            selectedImg: null
        };

        this.onRemove = this.onRemove.bind(this);
        this.uploadHandler = this.uploadHandler.bind(this);

    }

    uploadHandler = () => {
        const formData = new FormData();
        formData.append('file', this.state.selectedImg, this.state.selectedImg.name);
        formData.append('author', this.state.author);
        formData.append('description', this.state.desc);
        formData.append('genre', this.state.genre);
        formData.append('name', this.state.name);
        formData.append('technique', this.state.technique);
        axios.post(urlPort('/add/painting'), formData, {headers: {withCredentials: true, ContentType:'multipart/form-data'}})
            .then(res=> {
                this.growl.show({severity: 'success', summary: 'Successful upload', detail: 'Image uploaded'});
                var params = new URLSearchParams();
                params.append('paintingId', res.data.id);
                params.append('policy', 3);
                params.append('startPrice', 100);
                axios.post(urlPort('/add/lot'), params, {withCredentials: true}).then(
                    res=>this.growl.show({severity: 'success', summary: 'Successful lot creation', detail: 'Lot created. Now on expert verification'})
                ).catch(err => this.growl.show({severity: 'error', summary: 'Failure lot creation', detail: JSON.stringify(err.message), life: 20000}));
            })
            .catch(err => this.growl.show({severity: 'error', summary: 'Failure upload', detail: JSON.stringify(err), life: 20000}));
    };

    fileChangedHandler = (event) => {
        this.setState({selectedImg: event.target.files[0]})
    };

    handleLot(e){
        this.setState({selectedLot: e.value, dialogVisible: true})
    }

    renderContents(lot){
        //alert(JSON.stringify(lot));
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
                        <td>{lot.paintingByPainting.certificateByCertificate.id}</td>
                    </tr>
                    <tr>
                        <td>Expert:</td>
                        <td>{lot.paintingByPainting.certificateByCertificate.usersByExpert.username}</td>
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
            </div>
        );
    }


    componentWillMount() {
        this.loadInfo(this.state.activeIndex);
    }

    loadInfo(num){
                    let doThePost=true;
        let urlBase;
        switch (num) {
            case 0:
                urlBase = '/lots/selled';
                break;
            case 1:
                urlBase = '/lots/selling';
                break;
            case 2:
                urlBase = '/lots/owned';
                break;
            case 3:
                urlBase = '/lots/bought';
                break;
            case 4:
                urlBase = '/lots/history';
                break;
            case 5:
                doThePost = false;
                break;
        }
        if(doThePost)
        axios.get(urlPort(urlBase), {withCredentials: true})
            .then(res=>{
                this.props.setList(res.data);
                this.forceUpdate();
            });
    }


    onRemove(event){
        this.setState({dialogVisible: false});
        this.setState({selectedLot: null});
    }

    render(){
        const footer = (
            <div>
                <Button label="Close" icon="pi pi-times" onClick={this.onRemove} className="p-button-danger"/>
            </div>
        );
        const dataTableRender = (
            <DataTable value={this.props.items}
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
                <Column field="startPrice" header="startPrice" sortable={true}/>
                <Column field="paintingByPainting.id" header="idPainting" sortable={true}/>
                <Column field="paintingByPainting.name" header="name" sortable={true}/>
                <Column field="usersBySeller.id" header="Seller id" sortable={true}/>
                <Column field="usersBySeller.name" header="Seller name" sortable={true}/>
            </DataTable>
        );

        return (
            <div className={'UserPage'}>
                <Growl ref={(el) => this.growl = el}/>
                <h2>User page</h2>
                <hr/>
                <TabView activeIndex={this.state.activeIndex}
                         onTabChange={(e) =>
                             {
                                 this.setState({activeIndex: e.index})
                                 this.loadInfo(e.index);
                             }
                         }
                         className={'profile-main'}
                >
                    <TabPanel header="Sold">
                        {dataTableRender}
                    </TabPanel>
                    <TabPanel header="onMarket">
                        {dataTableRender}
                    </TabPanel>
                    <TabPanel header="Bought">
                        {dataTableRender}
                    </TabPanel>
                    <TabPanel header="Owned">
                        {dataTableRender}
                    </TabPanel>
                    <TabPanel header="History">
                        {dataTableRender}
                    </TabPanel>
                    <TabPanel header="Upload">

                        <h3>All fields are necessary, file should be less than 1MB</h3>
                        <hr/>
                        <input type="file" onChange={this.fileChangedHandler} accept="image/*"/>
                        <br/>
                        <hr/>
                        <br/>
                        <InputText className={'pict-info'} placeholder={"Painting name"} value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} />
                        <InputText className={'pict-info'} placeholder={"Author"} value={this.state.author} onChange={(e) => this.setState({author: e.target.value})} />
                        <InputText className={'pict-info'} placeholder={"Genre"} value={this.state.genre} onChange={(e) => this.setState({genre: e.target.value})} />
                        <InputText className={'pict-info'} placeholder={"Technique"} value={this.state.technique} onChange={(e) => this.setState({technique: e.target.value})} />
                        <br/>
                        <InputTextarea className={'desc-area'} placeholder={'Description'} rows={5} cols={30} value={this.state.desc} onChange={(e) => this.setState({desc: e.target.value})} />
                        <br/>
                        <Button label={"Upload"} onClick={this.uploadHandler}/>
                    </TabPanel>
                </TabView>
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
        );
    }
}


function mapStateToProps(state){
    return {
        isAuthorised: state.loginReducer.isAuthorised,
        items: state.lotListReducer.items
    }
}

function mapDispatchToProps(dispatch){
    return {
        logout: ()=>dispatch(setUnAuth()),
        setList: (list)=>dispatch(setList(list))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)


