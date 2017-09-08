import React, { Component } from 'react';
import Header from '../Header/Header';
import './dashboard.css'

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <Header title="Dashboard" />
                <div className="container">
                    <div className="me">
                        <div className="meContainer">
                            <img src={this.props.img} />
                            <div className="meName">
                                <h3> Marissa </h3>
                                <h3> Pouge </h3>
                                <button> Edit Profile </button>
                            </div>
                        </div>
                    </div>
                    <div className="message"> Welcome to Helo! Find recommended friends based on your similarities, and even search for them by name. The more you update your profile, the better recommendations we can make! </div>
                    <div className="recommended"> </div>
                </div>
            </div>

        );
    }
}