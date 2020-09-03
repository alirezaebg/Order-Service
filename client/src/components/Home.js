import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import logo from '../icons/logo.svg';
import '../App.css';

class Home extends Component {

    state = {
        query: '',
        isValidEmail: true,
    }

    handleClick = (e) => {
        console.log(e.target)
        e.preventDefault();
        let valid = false;
        if (this.validateEmail(this.state.query)) {
            valid = true;  //email is valid
            this.props.history.push('/create');
        }
        this.setState({isValidEmail: valid});
    }

    validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    handleChange = (e) => {
        const query = e.target.value;
        this.setState({query})
    }

    render() {
        const { query } = this.state
        return (
            <div>
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-header">Welcome to Treez Order Service Portal</h1>
                <input
                    className = 'home-input'
                    type = 'text'
                    placeholder = 'Enter your email'
                    value = {query}
                    onChange = {this.handleChange}
                />
                {!this.state.isValidEmail && <p>Please enter a valid email address!</p>}
                <div>
                    <Link to='/create' onClick={this.handleClick}><button className="btn btn-primary btn-lg">Create new order</button></Link>
                    <Link to='/view'><button className="btn btn-primary btn-lg">View orders</button></Link>
                </div>
            </div>
        )
    }
}

export default Home;