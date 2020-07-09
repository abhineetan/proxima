const graphql = require('graphql');
const _ = require('lodash');

//Calling of the models to interact with mongodb
const Content = require('../models/content.js');
const Author = require('../models/author.js');

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql;

const ContentType = new GraphQLObjectType({
	name: 'Content',
	fields:()=>({
		id:{ type: GraphQLID},
		heading:{type: GraphQLString},
		article:{type: GraphQLString},
		author: {
			type: AuthorType,
			resolve(parent, args) {
				return Author.findById(parent.authorId);
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
				// return _.filter(content, {authorId: parent.id});
				return Content.find({authorId : parent.id});
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
				return Content.findById(args.id);
			}
		},
		//Query to Return authors of the content on the basis of id
		'author' : {
			type:AuthorType,
			args: {id: {type: GraphQLID}},
			resolve(parent, args) {
				return Author.findById(args.id);
			}
		},
		//Query to Return all the content
		'contents' : {
			type: new GraphQLList(ContentType),
			resolve(parent, args) {
				return Content.find({});
			}
		},
		//Query to Return all the author
		'authors' : {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				return Author.find({});
			}
		},		
	}
});

//Setting up Mutation for Performing CRUD operation in Mongo
const Mutation = new GraphQLObjectType({
	name : 'Mutation',
	fields: {
		addAuthor : {
			type: AuthorType,
			args: {                            //Fields we require from Frontend
				name : {type : GraphQLString},
				age : {type : GraphQLInt}
			},
			resolve(parent, args) {
				let author = new Author({
					name : args.name,
					age : args.age
				});
				return author.save();
			}
		},

		addContent : {
			type: ContentType,
			args : {
				heading : {type : GraphQLString},
				article : {type : GraphQLString},
				authorId : {type : GraphQLID}
			},
			resolve(parent, args) {
				let content = new Content({
					heading : args.heading,
					article : args.article,
					authorId : args.authorId
				});

				return content.save();
			}
		}
	}
})


module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});