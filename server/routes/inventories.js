const router = require('express').Router();

let Inventory = require('../models/inventory.model');

// read all inventory items
router.route('/').get((req, res) => {
    Inventory.find()
        .then(inventories => res.json(inventories))
        .catch(err => console.log(err));
})

// create an inventory item
router.route('/').post((req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const quantityAvailable = req.body.quantityAvailable;

    const newInventory = new Inventory({
        name,
        description,
        price,
        quantityAvailable,
    })

    newInventory.save()
    .then(() =>  res.json('New inventory added!'))
    .catch(err => console.log(err))   
})

// read a single inventory item
router.route('/:id').get((req, res) => {
    Inventory.findById(req.params.id)
    .then(inventory => res.json(inventory))
    .catch(err => console.log(err));
})

// update an inventory item
router.route('/:id').put((req, res) => {
    Inventory.findById(req.params.id)
    .then(inventory => {
        inventory.name = req.body.name;
        inventory.description = req.body.description;
        inventory.price = req.body.price;
        inventory.quantityAvailable = req.body.quantityAvailable;

        inventory.save()
        .then(() => res.json('Inventory was updated!'))
        .catch(err => console.log(err));
    })
    .catch(err =>  console.log(err));
})

// delete an inventory item
router.route('/:id').delete((req, res) => {
    Inventory.findByIdAndDelete(req.params.id)
    .then (() => res.json('Inventory has been deleted!'))
    .catch(err => console.log(err));
})


module.exports = router;
