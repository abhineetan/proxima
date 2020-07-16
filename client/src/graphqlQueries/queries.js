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

/*
{
  content(id : "5f077c624a8926814e45470b") {
    heading
    article
    author{
      name
    }
  }
}
*/

const getArticleQuery = gql`
	query($id:ID){
		content(id:$id){
			heading
			article
			author{
				name
				age
				contents {
					id
					heading
				}
			}
		}
	}
`


export { getAuthorsQuery, getArticlesQuery, addArticleMutation, getArticleQuery };