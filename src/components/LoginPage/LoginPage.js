import React from 'react';
import {Button} from "primereact/button";
import { withRouter } from 'react-router-dom'
import LoginForm from "../LoginForm/LoginForm";
import './LoginPage.css'


class LoginPage extends React.Component{

    onButtonClick(){
        let { history } = this.props;
        history.push('/register');
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className={'l-page'}>

                <LoginForm history={this.props.history}/>
                <hr/>
                <div>
                    <p>
                        Don`t have account? Register now!
                    </p>
                    <Button onClick={this.onButtonClick.bind(this)}
                            label={"Register"}
                            className={"p-button-raised register"}
                    />
                </div>
            </div>
        );
    }
}

export default withRouter(LoginPage);

