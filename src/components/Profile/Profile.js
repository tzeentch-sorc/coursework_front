import React from 'react'
import './Profile.css'
import {Growl} from 'primereact/growl';
import ExpertPage from "../ExpertPage/ExpertPage";
import AdminPage from "../AdminPage/AdminPage";
import UserPage from "../UserPage/UserPage";


class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            role: 'user',

        };

        this.setAdmin = this.setAdmin.bind(this);
        this.renderAdmin = this.renderAdmin.bind(this);
        this.setExpert = this.setExpert.bind(this);
        this.renderExpert = this.renderExpert.bind(this);
        this.setUser = this.setUser.bind(this);
        this.renderUser = this.renderUser.bind(this);


    }

    setAdmin(){
        this.setState({role: 'admin'})
    }
    setExpert(){
        this.setState({role: 'expert'})
    }
    setUser(){
        this.setState({role: 'user'})
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


    render() {
        let renderPage = () => {
            switch (this.state.role) {
                case 'admin':
                    return this.renderAdmin();
                case 'expert':
                    return this.renderExpert();
                case 'user':
                    return this.renderUser();
                default: return <h2>NO ROLE SET</h2>
            }
        };

        return (
            <div>
               { <Growl ref={(el) => this.growl = el} />}
                <div style={{border: '1px solid black'}}>
                    Current Role: {this.state.role}<br/>
                    <button onClick={this.setAdmin}>setAdmin</button>
                    <button onClick={this.setExpert}>setExpert</button>
                    <button onClick={this.setUser}>setUser</button>
                </div>
                {/*<div className={'profile-main'}>*/}
                    {renderPage()}
                {/*</div>*/}
            </div>
        );
    }
}

export default Profile;