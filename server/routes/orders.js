const express = require('express')
const router = express.Router()

let Order = require('../models/order.model');

// read all inventory items
router.route('/').get((req, res) => {
    Order.find()
        .then(inventories => res.json(inventories))
        .catch(err => console.log(err));
})

// create an inventory item
router.route('/').post((req, res) => {
    const email = req.body.email;
    const date = Date.parse(req.body.date);
    const status = req.body.status;
    const detail = {
        name: req.body.detail.name,
        quantity: req.body.detail.quantity
    };

    const newOrder = new Order({
        email,
        date,
        status,
        detail,
    })

    newOrder.save()
    .then(() =>  res.json('New order added!'))
    .catch(err => console.log(err))   
})

// read a single inventory item
router.route('/:id').get((req, res) => {
    Order.findById(req.params.id)
    .then(order => res.json(order))
    .catch(err => console.log(err));
})

// update an inventory item
router.route('/:id').put((req, res) => {
    Order.findById(req.params.id)
    .then(order => {
        order.email = req.body.email;
        order.date = Date.parse(req.body.date);
        order.status = req.body.status;
        order.detail.name = req.body.detail.name;
        order.detail.quantity = req.body.detail.quantity;

        order.save()
        .then(() => res.json('order was updated!'))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
})

// delete an inventory item
router.route('/:id').delete((req, res) => {
    Order.findByIdAndDelete(req.params.id)
    .then(() => res.json("oder has been deleted!"))
    .catch(err => console.log(err))
})


module.exports = router