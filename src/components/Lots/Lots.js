import React from 'react'
import './Lots.css'
import Lot from '../Lot/Lot'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {Paginator} from 'primereact/paginator';

import {DataView, DataViewLayoutOptions} from 'primereact/dataview';
import {Dropdown} from "primereact/dropdown";

class Lots extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [
                {name: 'hello'},
                {name: 'a'},
                {name: 'hello2'},
                {name: 'hello3'},
                {name: 'hello12'},
                {name: 'hello23'},
                {name: 'hello12'},
                {name: 'hello134'},
                {name: 'hello2234'},
                {name: 'hello324354'},
                {name: 'hello12345'},
                {name: 'hello21234'}
            ],
            layout: 'list',
            first: 0,
            rows : 6,
            sortKey: null,
            sortOrder: null
        };
        this.itemTemplate = this.itemTemplate.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
    }

    onPageChange(event) {
        this.setState({
            first: event.first,
            rows: event.rows
        });
    }

    onSortChange(event) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.setState({
                sortOrder: -1,
                sortField: value.substring(1, value.length),
                sortKey: value
            });
        }
        else {
            this.setState({
                sortOrder: 1,
                sortField: value,
                sortKey: value
            });
        }
    }

    itemTemplate(item, layout) {
        return (
            <Lot name={item.name + '_' + layout} renderType={layout}/>
        )
    }

    renderHeader() {

        const sortOptions = [
            {label: 'Name(straight)', value: 'name'},
            {label: 'Name(gay)', value: '!name'}
        ];

        return(
                <div>
                    <div style={{textAlign: 'left', zIndex: -1}} >
                        <Dropdown options={sortOptions} value={this.state.sortKey} placeholder="Sort By" onChange={this.onSortChange} />
                    </div>
                    <div style={{textAlign: 'right', zIndex: -1}} >
                        <DataViewLayoutOptions className={"view-type"} layout={this.state.layout} onChange={(e) => this.setState({layout: e.value})} />
                    </div>
                </div>
        );
    }

    render(){
        const header = this.renderHeader();



        return(
            <div className={"lots-list-main"}>
                <div className={'header'}>
                    <h2>LOTS PAGE</h2>
                </div>
                <div className={'view-panel'}>
                    <DataView value={this.state.items}
                              layout={this.state.layout}
                              itemTemplate={this.itemTemplate}
                              className={'my-gallery'}
                              header={header}
                              paginatorPosition={'both'} paginator={true}
                              first={this.state.first}
                              onPage={(e) => this.setState({first: e.first, rows: e.rows})}
                              rows={this.state.rows}
                              paginatorTemplate={"RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"}
                              rowsPerPageOptions={[6,12]}
                              emptyMessage={"No available lots found"}
                              sortOrder={this.state.sortOrder}
                              sortField={this.state.sortField}
                    />
                </div>
                <div className={'goBack'} id={"myBtn"}>
                    <a href="#top">
                        <i className="pi pi-arrow-up"/>
                    </a>
                </div>
            </div>
        );
    }
}

export default Lots;