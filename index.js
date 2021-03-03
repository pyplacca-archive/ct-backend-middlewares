
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const server = express();
const PORT = process.env.PORT || 2021;

// apply all general-purpose middleware(s)
server.use(express.json());
// "custom" router middleware
server.use('/banks', routes.bankRouter)
server.use('/accounts', routes.accountRouter)

// connect our server to the mongodb database
mongoose.connect(process.env.MONGODB_URI, {
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
.catch(err => {
	console.log({MongooseErr: err})
	// handle database connection error
	console.log('Unable to connect database. Please check your internet connection')
})
