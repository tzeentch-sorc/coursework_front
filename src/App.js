import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import BackDrop from './components/BackDrop/BackDrop'
import Home from './components/Home/Home'
import Notfound from './components/Notfound/Notfound'
import Lots from './components/Lots/Lots'
import {Route, Switch, Redirect} from "react-router-dom";

class App extends Component {
  state = {
      sideOpen: false
  };

  drawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return {sideOpen: !prevState.sideOpen}
        })
  };

  backdropClickHandler = () =>{
    this.setState({sideOpen: false});
  };

  render() {
      let backdrop;
      if(this.state.sideOpen){
          backdrop = <BackDrop click={this.backdropClickHandler}/>
      }

    return (
      <div className="app">
        <Navbar drawerClickHandler={this.drawerToggleClickHandler}/>
          <SideDrawer show={this.state.sideOpen} click={this.backdropClickHandler}/>
          {backdrop}
        <main className="app_main">
                <Switch>
                    <Route exact path="/" render={() => (
                            <Redirect to="/home"/>
                    )}/>
                    <Route path={"/home"} component={Home}/>
                    <Route path={"/lots"} component={Lots}/>
                    <Route path={"/login"} component={Home}/>
                    <Route path='/404' component={Notfound} />
                    <Redirect to={'/404'} />
                </Switch>
        </main>
      </div>
    );
  }
}

export default App;
