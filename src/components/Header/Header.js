import React, { Component } from 'react';
import home from './home.png';
import mag from './magnifying_glass.png';
import './Header.css';

export default class Header extends Component {
    render() {
        return (
            <div className="header_container">
                <div className="leftmost">
                    Helo
                    <img src={home} alt="home button" />
                    <img src={mag} mag="search" />
                </div>
            <div className="middle">
                    {this.props.title}
            </div>
                    Logout
            </div>
        );
    }
}