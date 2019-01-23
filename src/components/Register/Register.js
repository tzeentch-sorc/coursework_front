import React from 'react';
import {Button} from "primereact/button";
import { withRouter } from 'react-router-dom'
import './Register.css'
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {FormErrors} from "../FormErrors/FormErrors";
import {Growl} from 'primereact/growl';
import axios from "axios";
import {registryFail, registrySuccess} from "../../actions/login";
import connect from "react-redux/es/connect/connect";
import {urlPort} from "../../index";

class Register extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            name:'',
            surname:'',
            username: '',
            password: '',
            formErrors: {email: '', password: '', name: '', surname:''},
            emailValid: false,
            passwordValid: false,
            nameValid: false,
            surnameValid: false,
            formValid: false
        };
        this.handleChangeUname = this.handleChangeUname.bind(this);
        this.handleChangePword = this.handleChangePword.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeSname = this.handleChangeSname.bind(this);
        this.Submit = this.Submit.bind(this);
        this.onSuccessRedirect = this.onSuccessRedirect.bind(this);
    }



    Submit() {
        let params = new URLSearchParams();
        params.append('mail', this.state.username);
        params.append('password', this.state.password);
        params.append('name', this.state.name);
        params.append('surname', this.state.surname);
        this.setState(
            {
                name:'',
                surname:'',
                username: '',
                password: '',
                emailValid: false,
                passwordValid: false,
                nameValid: false,
                surnameValid: false,
                formValid: false
            }
        );
        axios.post(urlPort('/signUp'), params).then(
            res => {
                if(res.status === 200){
                    this.props.regOK();
                    this.growl.show({life:4000,
                        severity: 'success',
                        summary: 'Successful Registration',
                        detail: 'Redirect on login page in a few seconds...'
                    });
                }
            }
        ).catch(err=>{
            this.props.regFail();
            this.growl.show({life:15000,
                severity: 'error',
                summary: 'Oops... It`s a ' + err.response.status + ' code error',
                detail: err.response.data
            });
        });


    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let nameValid = this.state.nameValid;
        let surnameValid = this.state.surnameValid;
        switch(fieldName) {
            case 'username':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 3;
                fieldValidationErrors.password = passwordValid ? '': ' is too short';
                break;
            case 'name':
                nameValid = value.length >= 1;
                fieldValidationErrors.name = nameValid ? '': ' is empty';
                break;
            case 'surname':
                surnameValid = value.length >= 1;
                fieldValidationErrors.surname = surnameValid ? '': ' is empty';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid,
            nameValid: nameValid,
            surnameValid: surnameValid
        }, this.validateForm);
    }
    validateForm() {
        this.setState({formValid: this.state.emailValid &&
                this.state.passwordValid &&
                this.state.nameValid &&
                this.state.surnameValid});
    }

    handleChangeUname(event) {
        // this.setState({emailCorrect: this.validateEmail(event.target.value)});
        let value = event.target.value;
        this.setState({username: value},
            ()=>{this.validateField('username', value)}


        );
    }

    handleChangePword(event) {
        let value = event.target.value;
        this.setState({password: value},
            ()=>{this.validateField('password', value)}
            );
    }

    handleChangeName(event) {
        let value = event.target.value;
        this.setState({name: value},
            ()=>{this.validateField('name', value)}
        );
    }

    handleChangeSname(event) {
        let value = event.target.value;
        this.setState({surname: value},
            ()=>{this.validateField('surname', value)}
        );
    }


    onSuccessRedirect(){
        if(this.props.regResult) {
            let {history} = this.props;
            history.push('/login');
        }
    }

    render() {
        return (
            <div className={'r-page'}>
                <Growl ref={(el) => this.growl = el} onRemove={this.onSuccessRedirect}/>
                <div className={"r-form"}>
                    <h2>REGISTRATION</h2>
                    <h4>Please, fill all the spaces</h4>
                    <form>
                        <div className={"namesBorder"}>
                            <p>
                                Enter your name & surname:
                            </p>
                            <span className="p-float-label">
                                <InputText id="name" value={this.state.name}
                                           onChange={this.handleChangeName}
                                           className={"names"}
                                           keyfilter={"alpha"}
                                />
                                <label htmlFor="name">Name</label>
                            </span>
                            <span className="p-float-label">
                                <InputText id="surname" value={this.state.surname}
                                           onChange={this.handleChangeSname}
                                           className={"names"}
                                           keyfilter={"alpha"}
                                />
                                <label htmlFor="surname">Surname</label>
                            </span>
                        </div>
                        <div>
                            <p>Enter an email:</p>
                        </div>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"/>
                            </span>
                            <InputText value={this.state.username}
                                       onChange={this.handleChangeUname}
                                       placeholder="Email"
                                       className={"input"}
                                       // keyfilter={"email"}
                            />
                        </div>
                        <div>
                            <p>Enter a password:</p>
                        </div>
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-key"/>
                            </span>
                            <Password
                                value={this.state.password}
                                onChange={this.handleChangePword}
                                feedback={true}
                                placeholder="Password"
                                className={"input"}
                                promptLabel={"Enter password"}
                            />
                        </div>
                    </form>
                        <Button onClick={this.Submit}
                                label="Register"
                                className="p-button-success p-button-raised"
                                disabled={!this.state.formValid ? "disabled" : ""}
                        />


                    <div className={'errorPanel'}>
                        <FormErrors formErrors={this.state.formErrors} />
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return { regResult: state.loginReducer.regResult}
}

function mapDispatchToProps(dispatch){
    return {
        regOK: ()=>dispatch(registrySuccess()),
        regFail: ()=>dispatch(registryFail())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));
