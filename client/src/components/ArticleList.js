import React, {Component} from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getArticlesQuery = gql`
{
	articles {
		heading
	}
}`

class ArticleList extends Component{
	render() {
		return (
			<div>
				<ul id="article-list">
					<li>Article Name</li>
				</ul>
			</div>
		);
	}
}

export default graphql(getArticlesQuery)(ArticleList);