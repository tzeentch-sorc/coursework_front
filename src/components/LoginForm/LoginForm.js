import React from 'react'
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import './LoginForm.css'
import {Button} from "primereact/button";
import axios from 'axios'
import {setAuthorised, setUnAuth} from "../../actions/login";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Growl} from "primereact/growl";
import {urlPort} from "../../index";

class LoginForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.handleChangeUname = this.handleChangeUname.bind(this);
        this.handleChangePword = this.handleChangePword.bind(this);
        this.Authorise = this.Authorise.bind(this);
        this.authGoogle = this.authGoogle.bind(this);
    }

    Authorise(event){
        event.preventDefault();
        const growlCtx =this.growl;
        var params = new URLSearchParams();
        params.append('username', this.state.username);
        params.append('password', this.state.password);
        axios.post(urlPort('/login'), params,{withCredentials: true})
            .then(
            res => {
                axios.get(urlPort('/role'), {withCredentials: true}).then( res=>
                    {
                        this.props.authOK(res.data);
                        let history = this.props.history;
                        history.push('/profile');
                    }
                ).catch(
                    err => {
                        this.props.authFail();
                        alert(JSON.stringify(err))
                        //growlCtx.show({severity: 'error', summary: 'Not authorised', detail: 'Not authorised'});
                    }
                )
            }
            ).catch(
                err=>{
                    this.props.authFail();
                    this.growl.show({severity: 'error', summary: 'Not authorised', detail: 'Not authorised'});
                }
        );

    }

    authGoogle() {
        window.location='http://localhost:10880/login/google';
    }

    handleChangeUname(event) {
        this.setState({username: event.target.value});
    }

    handleChangePword(event) {
        this.setState({password: event.target.value});
    }

    componentDidMount(){
        if(!this.props.isAuthorised)
            this.growl.show({severity: 'warn', summary: 'Not authorised', detail: 'You should log in before going there'});
    }



    render() {
        return(
            <div className={"l-form"}>
                <Growl ref={(el) => this.growl = el}/>
                <div>
                    <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-user"/>
                    </span>
                        <InputText value={this.state.username}
                                   onChange={this.handleChangeUname}
                                   placeholder="Email"
                                   className={"input"}
                        />
                    </div>
                    <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-key"/>
                    </span>
                        <Password
                            value={this.state.password}
                            onChange={this.handleChangePword}
                            feedback={false}
                            placeholder="Password"
                            className={"input"}
                        />
                    </div>
                    <Button onClick={this.Authorise} label="Login" className="p-button-success p-button-raised" />
                    <div onClick={this.authGoogle} className="fa fa-google"/>


                </div>
            </div>
        );
    }

}

function mapStateToProps(state){
    return { isAuthorised: state.loginReducer.isAuthorised}
}

function mapDispatchToProps(dispatch){
    return {
        authOK: (role)=>dispatch(setAuthorised(role)),
        authFail: ()=>dispatch(setUnAuth())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));