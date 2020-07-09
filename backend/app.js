const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./graphqlSchema/schema');
const mongoose = require('mongoose');

const app = express();

//Connection Mongo
mongoose.connect("mongodb://localhost:27017/proxima");
mongoose.connection.once('open', ()=>{
	console.log('Mongo Connection Database');
})

//To Handle graphql request
app.use('/graphql', graphqlHTTP({
	schema,
	graphiql:true
}));

app.listen(4000, ()=>{
	console.log('Started Listening');
});