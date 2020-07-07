const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./graphqlSchema/schema');

const app = express();

//To Handle graphql request
app.use('/graphql', graphqlHTTP({
	schema,
	graphiql:true
}));

app.listen(4000, ()=>{
	console.log('Started Listening');
});