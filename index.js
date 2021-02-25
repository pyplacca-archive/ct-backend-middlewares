
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bankRouter = require('./routes/bankRoutes');

const server = express();
const PORT = process.env.PORT || 2021;

// apply all general-purpose middleware(s)
server.use(express.json());
server.use('/banks', bankRouter) // "custom" router middleware

// connect our server to the mongodb database
mongoose.connect(process.env.MONGDB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
})
.then(() => {
	// start our server after a successful connection to our database
	server.listen(PORT, () => {
		console.log(`Server is running at port ${PORT}...`)
	});
})
.catch(() => {
	// handle database connection error
	console.log('Unable to connect database. Please check your internet connection')
})
