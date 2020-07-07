const graphql = require('graphql');
const _ = require('lodash');

const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

//dummydata
var content = [
	{heading : 'One', id:'1'},
	{heading : 'Two', id:'2'},
	{heading : 'Three', id:'3'}
];

const ContentType = new GraphQLObjectType({
	name: 'Content',
	fields:()=>({
		id:{ type: GraphQLString},
		heading:{type: GraphQLString}
	})
});


const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields:{
		'content' : {
			type:ContentType,
			args: {id: { type:GraphQLString }},
			resolve(parent, args) {
				//Code to get data from Database
				return _.find(content,{id: args.id});
			}
		}
	}
});


module.exports = new GraphQLSchema({
	query: RootQuery
});