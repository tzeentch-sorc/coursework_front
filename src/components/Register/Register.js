import React from 'react';
import {Button} from "primereact/button";
import { withRouter } from 'react-router-dom'
import './Register.css'
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {FormErrors} from "../FormErrors/FormErrors";
import {Growl} from 'primereact/growl';


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
        this.showSuccess = this.showSuccess.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    showSuccess() {
        this.growl.show({life:5000,
            severity: 'success',
            summary: 'Success Message',
            detail: 'Order submitted'
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
                nameValid = value.length > 0;
                fieldValidationErrors.name = nameValid ? '': ' is empty';
                break;
            case 'surname':
                surnameValid = value.length > 0;
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
                this.state.passwordValid});
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


    onButtonClick(){
        let { history } = this.props;
        history.push('/login');
    }

    render() {
        return (
            <div className={'r-page'}>

                <Growl ref={(el) => this.growl = el}
                       onRemove={this.onButtonClick}
                />


                <div className={"r-form"}>
                    <h2>REGISTRATION</h2>
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
                                       keyfilter={"email"}
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
                        <Button onClick={this.showSuccess}
                                label="Register"
                                className="p-button-success p-button-raised"
                                disabled={!this.state.formValid ? "disabled" : ""}
                        />
                        <Button label="Google(Temp)"
                                className="p-button-success p-button-raised" />


                    <div className={'errorPanel'}>
                        <FormErrors formErrors={this.state.formErrors} />
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Register);
