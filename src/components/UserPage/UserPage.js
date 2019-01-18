import React from 'react'
import './UserPage.css'
import {TabPanel, TabView} from "primereact/tabview";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";


class UserPage extends React.Component {
    constructor(props) {
        super(props);

        this.state ={
            activeIndex: 0
        }
    }


    render() {
        return (
            <div className={'UserPage'}>
                <h2>Welcome, USERNAME</h2>
                <hr/>
                <TabView activeIndex={this.state.activeIndex}
                         onTabChange={(e) =>
                             this.setState({activeIndex: e.index})}
                         className={'profile-main'}
                >
                    <TabPanel header="Sold">

                    </TabPanel>
                    <TabPanel header="Bought">

                    </TabPanel>
                    <TabPanel header="Deal">

                    </TabPanel>
                </TabView>
            </div>
        );
    }
}


export default UserPage;


