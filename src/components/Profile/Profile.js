import React from 'react'
import './Profile.css'
import {Growl} from 'primereact/growl';
import ExpertPage from "../ExpertPage/ExpertPage";
import AdminPage from "../AdminPage/AdminPage";
import UserPage from "../UserPage/UserPage";
import {setAuthorised, setUnAuth} from "../../actions/login";
import connect from "react-redux/es/connect/connect";
import {Link} from "react-router-dom";
import {Redirect, withRouter} from "react-router";
import Register from "../Register/Register";
import {Button} from "primereact/button";
import axios from "axios";
import {urlPort} from "../../index";


class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            active: 2,
            errorRoles: false,
        };

        this.renderAdmin = this.renderAdmin.bind(this);
        this.renderExpert = this.renderExpert.bind(this);
        this.renderUser = this.renderUser.bind(this);
        this.exit = this.exit.bind(this);
    }


    renderExpert(){
        return <ExpertPage/>;
    }

    renderAdmin(){
        return <AdminPage growl={this.growl}/>
    }

    renderUser(){
            return <UserPage/>
    }

    componentWillMount() {
        this.setState({role: this.props.role}, ()=>{this.renderPage()})
        axios.get(urlPort('/role'), {withCredentials: true}).then(
            res => {
                this.props.login(res.data);
            }).catch(
            err=>{
                alert(JSON.stringify(err));
                this.props.logout();
            }
        );
    }


    renderPage(){
        let tmp = [false, false, false, false];
        let array = this.props.role;
        if(array == null) {
            this.setState({errorRoles: true});
            return tmp;
        }
        array.forEach((elem)=>{
            switch (elem.role) {
                case 'ROLE_ADMIN':
                    tmp[0] = true;
                    break;
                case 'ROLE_EXPERT':
                    tmp[1] = true;
                    break;
                case 'ROLE_USER':
                    tmp[2] = true;
                    break;
                case 'ROLE_BANNED':
                    tmp[3] = true;
                    tmp[0] = false;
                    tmp[1] = false;
                    tmp[2] = false;
                    break;
                default: this.setState({errorRoles: true})
            }
        });
        return tmp;
    };

    exit(e){
        axios.get('http://localhost:10880/logout', {withCredentials: true}).then(
            res =>{ }
        ).catch(
            err => {this.props.logout()}
        )
    }


    render() {
        const rendering = this.renderPage();
        let rendered;
        switch (this.state.active) {
            case 0:
                rendered = this.renderAdmin();
                break;
            case 1:
                rendered = this.renderExpert();
                break;
            case 2:
                rendered = this.renderUser();
                break;
            default:
                rendered = "";
        }
        if(rendering[3]){
            return(
                <div className={'banned'}>
                    <h2>YOU ARE BANNED</h2>
                    <Link to={'/home'} onClick={this.exit}>Go home</Link>
                </div>
            );
        }
        if (!this.state.errorRoles){
            return (
                <div>
                    <Growl ref={(el) => this.growl = el}/>
                    <div className={"buttonPage"}>
                        {
                            rendering[0]?
                                <Button label={"as Admin"} className={"btn p-button-warning p-button-raised"}
                                        icon={"pi pi-eye"}
                                        onClick={e=>{this.setState({active: 0})}}/>
                                :""
                        }
                        {
                            rendering[1]?
                                <Button label={"as Expert"} className={"btn p-button-warning p-button-raised"}
                                        icon={"pi pi-images"}
                                        onClick={e=>{this.setState({active: 1})}}/>
                                :""
                        }
                        {
                            rendering[2]?
                                <Button label={"as User"} className={"btn p-button-warning p-button-raised"}
                                        icon={"pi pi-user"}
                                        onClick={e=>{this.setState({active: 2})}}
                                />
                                :""
                        }
                        <Button onClick={this.exit} className={"btn p-button-danger p-button-raised"} label={"Log Out"}/>
                    </div>
                    {
                              rendered
                    }
                    <div className={'goBack'} id={"myBtn"}>
                        <a href="#top">
                            <i className="pi pi-arrow-up"/>
                        </a>
                    </div>
                </div>
            );
        }
        else {
            //this.props.logout();
            return (
                <div>
                    <h2>Проблема с определением ролей. Попробуйте авторизоваться снова.</h2>
                    <Link to={'/home'}>Yankee, go home!</Link>
                </div>
            )
        }
    }
}

function mapStateToProps(state){
    return { isAuthorised: state.loginReducer.isAuthorised,
            role: state.loginReducer.role
    }
}

function mapDispatchToProps(dispatch){
    return {
        logout: ()=>dispatch(setUnAuth()),
        login: (res)=>dispatch(setAuthorised(res)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))