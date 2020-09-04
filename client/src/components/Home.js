import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import logo from '../icons/logo.svg';
import '../App.css';

class Home extends Component {

    state = {
        isValidEmail: true,
    }

    // handle button click event
    handleClick = (e) => {
        e.preventDefault();
        let valid = false;
        if (this.validateEmail(this.props.query)) {
            valid = true;  //email is valid
            if (e.target.name === 'newOrder') this.props.history.push('/create')
            else this.props.history.push('/view')
        }
        this.setState({ isValidEmail: valid })
    }

    // function to validate an email address
    validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    render() {
        const { query, handleChange } = this.props    //destructuring
        return (
            <div>
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-header">Welcome to Treez Order Service Portal</h1>
                <input
                    className='home-input'
                    type='text'
                    placeholder='Enter your email'
                    value={query}
                    onChange={(e) => handleChange(e.target.value)}
                />
                {!this.state.isValidEmail && <p>Please enter a valid email address!</p>}
                <div>
                    <Link
                        to='/create'
                        onClick={this.handleClick}>
                        <button id="home-btn" name="newOrder" className="btn btn-primary btn-lg">Create new order</button>
                    </Link>
                    <Link
                        to='/view'
                        onClick={this.handleClick}>
                        <button id="home-btn" name="viewOrder" className="btn btn-primary btn-lg">View orders</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default withRouter(Home);