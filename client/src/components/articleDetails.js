import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import { getArticleQuery } from '../graphqlQueries/queries'

class ArticleDetails extends Component{
	render() {
		return (
			<div id="article-details">
				<p> Output Article Details here </p>
			</div>
		);
	}
}

export default graphql(getArticleQuery)(ArticleDetails);