import React from 'react'
import './AdminPage.css'
import connect from "react-redux/es/connect/connect";
import {TabPanel, TabView} from "primereact/tabview";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {ban, setBanned, setUsers, unban} from "../../actions/listAction";
import {urlPort} from "../../index";
import axios from "axios";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";



class AdminPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            selectedUser: this.props.users[0],
            dialogVisible: false,
            money: '',
            lotId: ''
        };

        this.handleBan = this.handleBan.bind(this);
        this.handleUnBan = this.handleUnBan.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.setBannedList = this.setBannedList.bind(this);
        this.setUsersList = this.setUsersList.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.makeExpert = this.makeExpert.bind(this);
        this.makeUnExpert = this.makeUnExpert.bind(this);
        this.handleAdmin = this.handleAdmin.bind(this);
        this.handleDeleteLot = this.handleDeleteLot.bind(this);
    }

    handleClick(e){
        this.setState({selectedUser: e.value, dialogVisible: true})
    }

    onRemove(event){
        this.setState({dialogVisible: false});
        this.setBannedList();
        this.setUsersList();
    }

    handleDeleteLot(e){
       let val = parseInt(this.state.lotId, 10);

        let propsGr = this.props;
        axios.get(urlPort('/admin/delete'), {withCredentials: true, params:{
                lotId: val
            }})
            .then(res=>{
                propsGr.growl.show({severity: 'success', summary: 'Successful', detail: 'Lot deleted'});
            }).catch(
            err =>{
                alert(JSON.stringify(err));
                propsGr.growl.show({severity: 'error', summary: 'Fail!', detail: 'Lot wasn`t deleted'});
            }
        );
    }

    makeExpert(e){
        let propsGr = this.props;
        this.setState({dialogVisible: false});
        axios.get(urlPort('/admin/addrole'), {withCredentials: true, params:{
                username: this.state.selectedUser.username,
                role: "ROLE_EXPERT"
            }})
            .then(res=>{
                this.setState({dialogVisible: false});
                //alert(JSON.stringify(res));
                propsGr.growl.show({severity: 'success', summary: 'Successful Recruit', detail: 'New expert recruited'});
                this.setUsersList();
            }).catch(
            err =>{
                //alert(JSON.stringify(err));
                propsGr.growl.show({severity: 'error', summary: 'Fail!', detail: 'We failed to recruit expert'});
            }
        );
    }

    makeUnExpert(e){
        let propsGr = this.props;
        this.setState({dialogVisible: false});
        axios.get(urlPort('/admin/deleterole'), {withCredentials: true, params:{
                username: this.state.selectedUser.username,
                role: "ROLE_EXPERT"
            }})
            .then(res=>{
                this.setState({dialogVisible: false});
                propsGr.growl.show({severity: 'success', summary: 'Разжалован', detail: 'Эксперт разжалован'});
                this.setUsersList();
            }).catch(
            err =>{
                //alert(JSON.stringify(err));
                propsGr.growl.show({severity: 'error', summary: 'Fail!', detail: 'Не получилось разжаловать'});
            }
        );
    }


    handleBan(e){
        let propsGr = this.props;
        axios.get(urlPort('/admin/ban'), {withCredentials: true, params:{
                username: this.state.selectedUser.username
            }})
            .then(res=>{
                this.setState({dialogVisible: false, selectedUser: this.props.users[0]});
                propsGr.growl.show({severity: 'success', summary: 'Successful Ban', detail: 'You successfully purged the heretic with banhammer'});
            }).catch(
            err =>{
                propsGr.growl.show({severity: 'error', summary: 'Cadia stands!', detail: 'We failed to purge one more heretic'});
            }
        );
        propsGr.banUser(this.state.selectedUser);

    }

    handleUnBan(e){
        let propsGr = this.props;
        this.setState({selectedUser: e.value}, ()=>
            {
                this.props.unBanUser(this.state.selectedUser);
                axios.get(urlPort('/admin/unban'), {withCredentials: true, params:{
                        username: this.state.selectedUser.username
                    }})
                    .then(res=>{
                        this.setState({selectedUser: null});
                        propsGr.growl.show({severity: 'success', summary: 'Герои не умирают', detail: 'Поруганная честь восстановлена!'});
                    }).catch(
                    err =>{
                        propsGr.growl.show({severity: 'error', summary: 'Провидение', detail: 'Не нам мешать ему'});
                    }
                );
            }
        );

    }

    componentWillMount() {
        this.setBannedList();
        this.setUsersList();
        this.renderButtons();
    }

    setBannedList(){
        axios.get(urlPort('/admin/banned'), {withCredentials: true}).then(
            res => {
                this.props.setBanned(res.data)
            }
        )
    }

    setUsersList(){
        axios.get(urlPort('/admin/normal'), {withCredentials: true}).then(
            res => {
                this.props.setUsers(res.data)
            }
        )
    }

    handleMoney(event) {
        this.setState({money: event.target.value});
    }

    handleId(event) {
        this.setState({lotId: event.target.value});
    }

    handleAddMoney(event) {
        let propsGr = this.props;
        let amount = parseInt(this.state.money ,10);
        axios.get(urlPort('/admin/money'), {withCredentials: true,
            params:{
                value: amount,
                username: this.state.selectedUser.username
            }
        }).then(
            res => {
                propsGr.growl.show({severity: 'success', summary: 'Алчность - грех', detail: 'Но кто не любит кликеры.'});
            }
        ).catch(err => {
            this.setState({dialogVisible: false});
            propsGr.growl.show({severity: 'error', summary: 'Бедность не порок', detail: 'Не в деньгах счастье'});
        });
    }

    handleAdmin(e){
        let propsGr = this.props;
        this.setState({dialogVisible: false});
        axios.get(urlPort('/admin/addrole'), {withCredentials: true, params:{
                username: this.state.selectedUser.username,
                role: "ROLE_ADMIN"
            }})
            .then(res=>{
                this.setState({dialogVisible: false});
                propsGr.growl.show({severity: 'success', summary: 'New Agent Smith', detail: 'New admin recruited'});
                this.setUsersList();
            }).catch(
            err =>{
                propsGr.growl.show({severity: 'error', summary: 'Fail!', detail: 'We failed to recruit admin'});
            }
        );
    }

    renderButtons(){
        let tmp = false;
        let array = this.state.selectedUser.roles;
        // alert(JSON.stringify(array));
        if(array != null) {
            array.forEach((elem) => {
                switch (elem.role) {
                    case 'ROLE_EXPERT':
                        tmp = true;
                        break;
                    default:
                        tmp = false;
                }
            });
        }
        this.setState({rendering: tmp})
    };

    render() {
        const footer = (
            <div>
                <Button label="Close" icon="pi pi-times" onClick={this.onRemove} className="p-button-danger"/>
            </div>
        );
        return(
            <div>
                <TabView activeIndex={this.state.activeIndex}
                         onTabChange={(e) =>
                             {
                                 this.setState({activeIndex: e.index}

                             )}}
                         className={'profile-main'}
                >
                    <TabPanel header="Users" leftIcon='pi pi-check-circle'>
                        <DataTable value={this.props.users}
                            // responsive={true}
                                   scrollable={true}
                                   scrollHeight={"800px"}
                                   selectionMode="single"
                                   selection={this.state.selectedUser}
                                   onSelectionChange={e =>
                                       this.handleClick(e)}
                            // loading={true}
                        >
                            <Column field="id" header="id" sortable={true}/>
                            <Column field="name" header="name" sortable={true}/>
                            <Column field="surname" header="surname" sortable={true}/>
                            <Column field="username" header="username" sortable={true}/>
                        </DataTable>
                    </TabPanel>
                    <TabPanel header="Banned Users" leftIcon='pi pi-minus-circle'>
                        <DataTable value={this.props.banned}
                            // responsive={true}
                                   scrollable={true}
                                   scrollHeight={"800px"}
                                   selectionMode={"single"}
                                   selection={this.state.selectedUser}
                                   onSelectionChange={e =>
                                        {
                                            this.handleUnBan(e)
                                        }
                                   }
                            // loading={true}
                        >
                            <Column field="id" header="id" sortable={true}/>
                            <Column field="name" header="name" sortable={true}/>
                            <Column field="surname" header="surname" sortable={true}/>
                            <Column field="username" header="username" sortable={true}/>
                        </DataTable>
                    </TabPanel>
                    <TabPanel header="Delete Lot" leftIcon='pi pi-minus'>
                        <h3>Delete lot by Id</h3>
                        <hr/>
                        <InputText value={this.state.lotId}
                                   onChange={event=>this.handleId(event)}
                                   placeholder={"Lot Id to be deleted"}
                                   style={{width: "100%", margin: '10px 0'}}
                                   keyfilter={"pnum"}

                        /><br/>
                        <Button className={"sett p-button-danger"} label="Delete" icon="pi pi-trash" onClick={e=>this.handleDeleteLot(e)} />
                    </TabPanel>
                </TabView>
                <Dialog header="User settings" visible={this.state.dialogVisible}
                        modal={true}
                        onHide={(e) =>
                            this.setState({dialogVisible: false})}
                        footer={footer}
                >
                    <p style={{textAlign: "center"}}>User id: #{this.state.selectedUser == null? "undefined" : this.state.selectedUser.id}</p>
                    <hr/>


                            <Button className={"sett"} label="Ban" icon=" pi pi-check" onClick={e=>this.handleBan(e)} />
                    {
                        this.state.rendering?
                            <Button className={"sett"} label="Make Expert" icon="pi pi-check" onClick={e=>this.makeExpert(e)} />
                            :<Button className={"sett"} label="unExpert" icon="pi pi-check" onClick={e=>this.makeUnExpert(e)} />
                    }
                            <Button className={"sett"} label="Make Admin" icon="pi pi-check" onClick={e=>this.handleAdmin(e)} />
                    <br/>
                    <hr/>

                    <InputText value={this.state.money}
                               onChange={event=>this.handleMoney(event)}
                               placeholder={"amount of money"}
                               style={{width: "100%", margin: '10px 0'}}
                               keyfilter={"pnum"}

                    /><br/>
                    <Button className={"sett"} label="Add Money" icon="pi pi-check" onClick={e=>this.handleAddMoney(e)} />
                </Dialog>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        users: state.userListReducer.users,
        banned: state.userListReducer.banned
    }
}

function mapDispatchToProps(dispatch){
    return {
        banUser: (user)=>dispatch(ban(user)),
        unBanUser:(user)=>dispatch(unban(user)),
        setUsers: (list)=>dispatch(setUsers(list)),
        setBanned: (list)=>dispatch(setBanned(list))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);