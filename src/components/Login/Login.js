import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import logo from './logo.png';

export default class Login extends Component {
    render() {
        return (
            
            <div className="login_background">
                <div className="login_box">
                    <img src={logo} alt="logo" />
                    <h1>Helo</h1>
                    <Link to="/dashboard">Login</Link></div>
            </div>
        );
    }
}
