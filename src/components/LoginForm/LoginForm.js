import React from 'react'
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import './LoginForm.css'
import {Button} from "primereact/button";

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
    }

    Authorise(event){
        let history = this.props.history;
        history.push('/profile');
    }

    handleChangeUname(event) {
        this.setState({username: event.target.value});
    }

    handleChangePword(event) {
        this.setState({password: event.target.value});
    }

    render() {
        return(
            <div className={"l-form"}>
                <form>
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
                    <Button label="Google(Temp)" className="p-button-success p-button-raised" />
                </form>
            </div>
        );
    }

}

export default LoginForm;
