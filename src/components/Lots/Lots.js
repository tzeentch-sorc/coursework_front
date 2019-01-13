import React from 'react'
import './Lots.css'
import Lot from '../Lot/Lot'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import {DataView, DataViewLayoutOptions} from 'primereact/dataview';
import {Dropdown} from "primereact/dropdown";
import {connect} from "react-redux";

class Lots extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
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

    componentDidMount() {
        const { items} = this.props;
        this.setState({ items });
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
            <Lot
                id={item.id}
                name={item.name}
                author={item.author}
                expDate={item.expDate}
                seller={item.seller}
                bet={item.bet}
                description={item.description}

                 renderType={layout}/>
        )
    }

    renderHeader() {

        const sortOptions = [
            {label: 'Name(straight)', value: 'name'},
            {label: 'Name(gay)', value: '!name'}
        ];

        return(
                <div>
                    <div style={{textAlign: 'left', zIndex: -1, float:'left'}} >
                        <Dropdown options={sortOptions} value={this.state.sortKey} placeholder="Sort By" onChange={this.onSortChange} />
                    </div>
                    {/*<div className={"spacer"}/>*/}
                    <div style={{textAlign: 'right', zIndex: -1, margin:'0.5em'}} >
                        <DataViewLayoutOptions className={"view-type"} layout={this.state.layout} onChange={(e) => this.setState({layout: e.value})} />
                    </div>
                </div>
        );
    }

    render(){
        const header = this.renderHeader();



        return(
            <div className={"lots-list-main"}>
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

function mapStateToProps(state){
    return { items: state.lotListReducer.items}
}

function mapDispatchToProps(dispatch){
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lots);