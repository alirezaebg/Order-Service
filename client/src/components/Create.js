import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"


class Create extends Component {

    state = {
        itemQuery: '',
        inventory: '',
        numberQuery: 0,
        numLeft: 0,
        items: [],
        quantity: []
    }

    // updates the state when user types an item
    handleChange = (query) => {
        this.setState({
            itemQuery: query,
            numLeft: 0
        })
    }

    // updates the state when user enter the quantity
    handleQuantityChange = (query) => {
        if (query >= 0 && query <= this.state.numLeft) {
            this.setState({
                numberQuery: query
            })
        }
    }

    // handle form submission when user searches for an item
    handleItemSubmit = (e) => {
        e.preventDefault();
        axios.get('http://localhost:5000/inventories/')
            .then(response => {
                const filtered = response.data.filter(item => {
                    let name = item.name;
                    return name.toLowerCase() === this.state.itemQuery.toLowerCase()
                })
                this.setState({
                    numLeft: filtered[0].quantityAvailable,
                    inventory: filtered[0],
                })

            })
            .catch((error) => {
                console.log(error);
            })
    }

    // handle form submission when user searches for an item
    handleAddSubmit = (e) => {
        e.preventDefault();

        this.setState(currState => ({
            items: [...currState.items, this.state.itemQuery],
            quantity: [...currState.quantity, this.state.numberQuery]
        }))

        const inventory = {
            name: this.state.inventory.name,
            description: this.state.inventory.description,
            price: this.state.inventory.price,
            quantityAvailable: this.state.numLeft - this.state.numberQuery
        }

        axios.put('http://localhost:5000/inventories/' + this.state.inventory._id, inventory)
            .then(response => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //handle order submit
    handleOrderSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.items);
        //code for creating a new order
    }

    render() {
        return (
            <div className='create-div'>
                <h1>Create New Order</h1>
                <form onSubmit={this.handleItemSubmit}>
                    <div className='order-div'>
                        <label>1. What are you looking for?</label>
                        <div id="add-order">
                            <input
                                className="order-input"
                                type="text"
                                placeholder="ex. guitar, piano, keyboard, ..."
                                value={this.state.itemQuery}
                                onChange={(e) => this.handleChange(e.target.value)}
                            />
                            <button id="find-item-btn" className="btn btn-primary">Find</button>
                        </div>
                        <p>{this.state.numLeft > 0 && this.state.itemQuery.length >= 3 && (
                            `There are currently ${this.state.numLeft} available!`
                        )}</p>
                    </div>
                </form>
                <form onSubmit={this.handleAddSubmit}>
                    <div className='order-div'>
                        <label>2. Enter the quantity</label>
                        <div id="add-order">
                            <input
                                className="order-input"
                                type="number"
                                placeholder="type a number"
                                value={this.state.numberQuery}
                                onChange={(e) => this.handleQuantityChange(e.target.value)}
                            />
                            <button id="add-order-btn" className="btn btn-primary">Add</button>
                        </div>

                    </div>
                </form>
                <form onSubmit={this.handleOrderSubmit}>
                    <div className='order-btn-div'>
                        <Link to='/'>
                            <button className='custom-back'>back to homepage</button>
                        </Link>
                        <button id="place-order" className="btn btn-primary">Place order</button>
                    </div>
                </form>



            </div>

        )
    }
}

export default Create