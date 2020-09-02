const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    name: {type: String, required: true, unique: true, trim: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    quantityAvailable: {type: Number, required: true},
    id: {type: Number, required: true, unique: true}   // this attribute is added to facilitate the order and inventory correspondance  
}, {
    timestamps: true,
})

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;

