const express = require('express');
const mongoose = require('mongoose');
const bankRouter = require('./routes/bankRoutes');
const server = express();


// apply all other middleware(s)
server.use(express.json());
// then apply our "custom" router middleware
server.use('/banks', bankRouter)

// connect our application to the database (mongodb)
mongoose.connect(
	`mongodb+srv://codetrain:Cz8fHaVZFqlXMcRY@cluster0.ombtf.mongodb.net/codetrain?retryWrites=true&w=majority`,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	}
)
.then(res => {
	console.log('Database connected!')
	// start server if database connection is successful
	server.listen(2021, () => {
		console.log('Server is running at port 2021...')
	});
})
.catch(err => {
	// handle database connection error
	console.log(`Database connection err -> ${err?.message}`)
})
