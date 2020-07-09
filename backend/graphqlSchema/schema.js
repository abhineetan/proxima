const graphql = require('graphql');
const _ = require('lodash');

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql;

//dummydata
var content = [
	{heading : 'One', id:'1', authorId:'1'},
	{heading : 'Two', id:'2', authorId:'2'},
	{heading : 'Three', id:'3',authorId:'3'},
	{heading : 'four', id:'4', authorId:'2'},
	{heading : 'five', id:'5',authorId:'3'},
	{heading : 'six', id:'6', authorId:'1'},
	{heading : 'seven', id:'7',authorId:'3'}
];

var authors = [
	{name: 'x', age: 30, id:'1'},
	{name: 'y', age: 30, id:'2'},
	{name: 'z', age: 30, id:'3'}
];

const ContentType = new GraphQLObjectType({
	name: 'Content',
	fields:()=>({
		id:{ type: GraphQLID},
		heading:{type: GraphQLString},
		author: {
			type: AuthorType,
			resolve(parent, args) {
				return _.find(authors, {id: parent.authorId});
			}
		}
	})
});

//Definition of Author Type
const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields:()=>({
		id:{ type: GraphQLID},
		name:{type: GraphQLString},
		age:{ type: GraphQLInt},
		contents: {
			type : new GraphQLList(ContentType), //As each author contain list of contents
			resolve(parent, args) {
				return _.filter(content, {authorId: parent.id});
			}
		}
	})
})

//Root Query: Fetching of GraphQL starts from here
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields:{
		//Query to Return content on the basis of id
		'content' : {
			type:ContentType,
			args: {id: { type:GraphQLID }},
			resolve(parent, args) {
				//Code to get data from Database
				return _.find(content,{id: args.id});
			}
		},
		//Query to Return authors of the content on the basis of id
		'author' : {
			type:AuthorType,
			args: {id: {type: GraphQLID}},
			resolve(parent, args) {
				return _.find(authors,{id: args.id});
			}
		},
		//Query to Return all the content
		'contents' : {
			type: new GraphQLList(ContentType),
			resolve(parent, args) {
				return content
			}
		},
		//Query to Return all the author
		'authors' : {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				return authors
			}
		},		
	}
});


module.exports = new GraphQLSchema({
	query: RootQuery
});