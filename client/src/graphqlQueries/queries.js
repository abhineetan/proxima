import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

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


export { getAuthorsQuery, getArticlesQuery };