import React from 'react';
import {TabPanel, TabView} from "primereact/tabview";
import './Similar.css'
import {DataScroller} from 'primereact/datascroller';
import Lot from "../Lot/Lot";
import connect from "react-redux/es/connect/connect";


class Similar extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            activeIndex: 0,
            byGenre: null,
            byAuthor: null,
            byTech: null
        };
        this.itemTemplate = this.itemTemplate.bind(this);
        this.updateSimilar = this.updateSimilar.bind(this);
    }

    updateSimilar(items, currentLot){
        let newList = items.filter(
            item => (
                (currentLot.genre === item.genre) && JSON.stringify(currentLot) !== JSON.stringify(item)
            )
        );
        let listAuthor = items.filter(
            item => (
                (currentLot.author === item.author) && JSON.stringify(currentLot) !== JSON.stringify(item)
            )
        );
        let listTech = items.filter(
            item => (
                (currentLot.technique === item.technique) && JSON.stringify(currentLot) !== JSON.stringify(item)
            )
        );
        this.setState({byGenre: null, byAuthor: null, byTech: null}, ()=>this.setState({byGenre: newList, byAuthor: listAuthor, byTech:listTech}));

    }

    itemTemplate(item){
        if(!item){
            return;
        }

        return (
            <Lot
                lot={item}
                renderType={'lot-page'}
            />
        )
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.updateSimilar(nextProps.items, nextProps.currentLot)
    }

    componentWillMount() {
                this.updateSimilar(this.props.items, this.props.currentLot)
    }


    render() {
        return(
            <div>
                <TabView
                    activeIndex={this.state.activeIndex}
                    onTabChange={(e) =>{
                        this.updateSimilar(this.props.items, this.props.currentLot);
                        window.scrollTo(0, 1000);
                        this.setState({activeIndex: e.index})}
                    }
                >
                    <TabPanel header={'By genre'}>
                        <DataScroller
                            key={this.state.activeIndex}
                            value={
                                this.state.byGenre
                            }
                            itemTemplate={this.itemTemplate}
                            rows={6}
                            lazy={true}
                        />
                    </TabPanel>
                    <TabPanel header={'By author'}>
                        <DataScroller
                            key={this.state.activeIndex}
                            value={
                                this.state.byAuthor
                            }
                            itemTemplate={this.itemTemplate}
                            rows={6}
                            lazy={true}
                        />
                    </TabPanel>
                    <TabPanel header={'By technique'}>
                        <DataScroller
                            key={this.state.activeIndex}
                            value={
                                this.state.byTech
                            }
                            itemTemplate={this.itemTemplate}
                            rows={6}
                            lazy={true}
                        />
                    </TabPanel>
                </TabView>

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
    return { items: state.lotListReducer.items,
        currentLot: state.currentLotReducer.currentLot
    }
}

function mapDispatchToProps(dispatch){
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Similar);