const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');

require('dotenv').config();

// express app
const app = express();
const port = process.env.PORT || 5000;   // in case of deployment falls back on PORT

// middlewares
app.use(cors());
app.use(express.json());

// database connection
const db_uri = process.env.ATLAS_URI;
mongoose.connect(db_uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connection to the Mongodb database established successfully!");
})

// routes
const inventoriesRouter = require('./routes/inventories');
const ordersRouter = require('./routes/orders');

app.use('/inventories', inventoriesRouter);
app.use('/orders', ordersRouter);

// spin up the server
app.listen(port, () => {
   console.log(`server is up and running on port ${port}`); 
})

