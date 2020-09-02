const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address!']
    },
    date: {type: Date, required: true},
    status: {type: String, required: true},
    detail: {
        productId: [{type: Number, unique: true, required: true}],
        productQuantiry = [{type: Number, required: true}]
    }
})