import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import BackDrop from './components/BackDrop/BackDrop'
import Home from './components/Home/Home'
import Notfound from './components/Notfound/Notfound'
import Lots from './components/Lots/Lots'
import {Route, Switch, Redirect} from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import Register from "./components/Register/Register";
import LotPage from "./components/LotPage/LotPage";
import Profile from "./components/Profile/Profile";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {setAuthorised, setUnAuth} from "./actions/login";

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
      let isAuth = this.props.isAuthorised;
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
                    <Route exact path={"/home"} component={Home}/>
                    <Route exact path={"/login"} component={LoginPage}/>
                    <Route exact path={"/register"} component={Register}/>
                    <Route exact path='/404' component={Notfound} />

                    {!isAuth?
                        <Route exact path="/(lots|lot|profile)/" render={() => {
                            return <Redirect to="/login"/>
                        }}/> : ""
                    }

                    <Route exact path={"/lots"} component={Lots}/>
                    <Route exact path={"/lot"} component={LotPage}/>
                    <Route exact path={"/profile"} component={Profile}/>

                    <Redirect to={'/404'} />
                </Switch>
        </main>
      </div>
    );
  }
}

function mapStateToProps(state){
    return { isAuthorised: state.loginReducer.isAuthorised}
}
export default withRouter(connect(mapStateToProps)(App));
