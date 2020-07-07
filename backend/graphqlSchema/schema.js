const graphql = require('graphql');

const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

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
			args: {id: { type:GraphQLString }}
			resolve(parent, args) {
				//Code to get data from Database
			}
		}
	}
});


module.exports = new GraphQLSchema({
	query: RootQuery
});