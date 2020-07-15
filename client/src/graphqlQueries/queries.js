import { gql } from 'apollo-boost';
//import { graphql } from 'react-apollo';

const getAuthorsQuery = gql`
{
	authors {
		id
		name
	}
}`


const getArticlesQuery = gql`
{
	contents {
		id
		heading
	}
}`

const addArticleMutation = gql`
mutation($heading: String!, $article: String!, $authorId: ID!) {
	addContent(heading:$heading, article:$article, authorId:$authorId){
		heading
		id
	}
}`


export { getAuthorsQuery, getArticlesQuery, addArticleMutation };