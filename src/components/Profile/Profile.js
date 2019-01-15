import React from 'react'
import './Profile.css'
import {TabView,TabPanel} from 'primereact/tabview';
import {DataTable} from 'primereact/datatable';
import {Column} from "primereact/column";
import {Growl} from 'primereact/growl';
import {Dialog} from 'primereact/dialog';
import connect from "react-redux/es/connect/connect";


class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            role: 'expert',
            activeIndex: 0,
            selectedUser: null,
            selectedLot: null,
            dialogVisible: false,
            users: [
                {
                    id: 3,
                    name: 'John3',
                    surname: 'Cena3',
                    email: '3qwe@qwe.ru'
                },{
                    id: 0,
                    name: 'John0',
                    surname: 'Cena0',
                    email: '0qwe@qwe.ru'
                },{
                    id: 1,
                    name: 'John1',
                    surname: 'Cena1',
                    email: '1qwe@qwe.ru'
                },{
                    id: 4,
                    name: 'John4',
                    surname: 'Cena4',
                    email: '1qwe@qwe.ru'
                },
                {
                    id: 2,
                    name: 'John2',
                    surname: 'Cena2',
                    email: '2qwe@qwe.ru'
                }
            ],
            banned:[
                {
                    id: 666,
                    name: 'Satan',
                    surname: '(Lucifer)',
                    email: '666@hell.com'
                },
            ]
        };

        this.setAdmin = this.setAdmin.bind(this);
        this.renderAdmin = this.renderAdmin.bind(this);
        this.setExpert = this.setExpert.bind(this);
        this.renderExpert = this.renderExpert.bind(this);
        this.setUser = this.setUser.bind(this);
        //this.renderUser = this.renderUser.bind(this);
        this.handleBan = this.handleBan.bind(this);
        this.handleUnBan = this.handleUnBan.bind(this);
        this.handleLot = this.handleLot.bind(this);
    }

    handleBan(e){
        this.setState({selectedUser: e.value.id}, ()=>{
            let array = this.state.users;
            let filtered = array.filter((elem, index, arr) => {

                return elem.id !== e.value.id;

            });

            this.setState({users: filtered}, ()=>{
                this.setState({banned: [...this.state.banned,e.value]})
            });

        });
        this.growl.show({severity: 'success', summary: 'Successful Ban', detail: 'You successfully purged the heretic with banhammer'});

    }

    handleUnBan(e){
        this.setState({selectedUser: e.value.id}, ()=>{
            let array = this.state.banned;
            let filtered = array.filter((elem, index, arr) => {

                return elem.id !== e.value.id;

            });

            this.setState({banned: filtered}, ()=>{
                this.setState({users: [...this.state.users,e.value]})
            });

        });
        this.growl.show({severity: 'info', summary: 'Successful unBan', detail: 'You successfully restored a faithful servant of the Emperor'});
    }

    handleLot(e){
        this.setState({selectedLot: e.value.id, dialogVisible: true})
    }

    setAdmin(){
        this.setState({role: 'admin'})
    }
    setExpert(){
        this.setState({role: 'expert'})
    }
    setUser(){
        this.setState({role: 'user'})
    }


    renderExpert() {
        return (
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
                <Dialog header="Godfather I" visible={this.state.dialogVisible}
                        style={{width: '50vw'}}
                        modal={true}
                        onHide={(e) =>
                            this.setState({dialogVisible: false})}
                >

                </Dialog>
            </div>
        );
    }

    renderAdmin(){
        return(
            <TabView activeIndex={this.state.activeIndex}
                     onTabChange={(e) =>
                         this.setState({activeIndex: e.index})}
                     className={'profile-main'}
            >
                <TabPanel header="Active Users" leftIcon='pi pi-check-circle'>
                    <DataTable value={this.state.users}
                               // responsive={true}
                               scrollable={true}
                               scrollHeight={"800px"}
                               selectionMode="single"
                               selection={this.state.selectedUser}
                               onSelectionChange={e =>
                                   this.handleBan(e)}
                               // loading={true}
                    >
                        <Column field="id" header="id" sortable={true}/>
                        <Column field="name" header="name" sortable={true}/>
                        <Column field="surname" header="surname" sortable={true}/>
                        <Column field="email" header="email" sortable={true}/>
                    </DataTable>
                </TabPanel>
                <TabPanel header="Banned Users" leftIcon='pi pi-minus-circle'>
                    <DataTable value={this.state.banned}
                               // responsive={true}
                               scrollable={true}
                               scrollHeight={"800px"}
                               selectionMode={"single"}
                               selection={this.state.selectedUser}
                               onSelectionChange={e =>
                                   this.handleUnBan(e)}
                        // loading={true}
                    >
                        <Column field="id" header="id" sortable={true}/>
                        <Column field="name" header="name" sortable={true}/>
                        <Column field="surname" header="surname" sortable={true}/>
                        <Column field="email" header="email" sortable={true}/>
                    </DataTable>
                </TabPanel>
            </TabView>
        );
    }




    render() {
        let renderPage = () => {
            switch (this.state.role) {
                case 'admin':
                    return this.renderAdmin();
                case 'expert':
                    return this.renderExpert();
                default: return <h2>NO ROLE SET</h2>
            }
        };

        return (
            <div>
                <Growl ref={(el) => this.growl = el} />
                <div style={{border: '1px solid black'}}>
                    Current Role: {this.state.role}<br/>
                    <button onClick={this.setAdmin}>setAdmin</button>
                    <button onClick={this.setExpert}>setExpert</button>
                    <button onClick={this.setUser}>setUser</button>
                </div>
                {/*<div className={'profile-main'}>*/}
                    {renderPage()}
                {/*</div>*/}
            </div>
        );
    }
}

function mapStateToProps(state){
    return { lots: state.lotListReducer.items}
}

function mapDispatchToProps(dispatch){
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);