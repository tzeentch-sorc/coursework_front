import React from 'react'
import './AdminPage.css'
import connect from "react-redux/es/connect/connect";
import {TabPanel, TabView} from "primereact/tabview";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {ban, unban} from "../../actions/listAction";



class AdminPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            selectedUser: null,

        };

        this.handleBan = this.handleBan.bind(this);
        this.handleUnBan = this.handleUnBan.bind(this);
    }


    handleBan(e){
        this.setState({selectedUser: e.value}, ()=>
            {
                this.props.banUser(this.state.selectedUser);
                this.setState({selectedUser: null});
                this.props.growl.show({severity: 'success', summary: 'Successful Ban', detail: 'You successfully purged the heretic with banhammer'});
            }
        );

    }

    handleUnBan(e){
        this.setState({selectedUser: e.value}, ()=>
            {
                this.props.unBanUser(this.state.selectedUser);
                this.setState({selectedUser: null});
                this.props.growl.show({severity: 'info', summary: 'Successful unBan', detail: 'You successfully restored a faithful servant of the Emperor'});
            }
        );
    }

    render() {
        return(
            <TabView activeIndex={this.state.activeIndex}
                     onTabChange={(e) =>
                         this.setState({activeIndex: e.index})}
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
                    <DataTable value={this.props.banned}
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
        unBanUser:(user)=>dispatch(unban(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);