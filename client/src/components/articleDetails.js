import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import { getArticleQuery } from '../graphqlQueries/queries'

class ArticleDetails extends Component{
	displayArticleDetails(){
		const article = this.props.data.content;
		if(article) {
			return(
				<div>
					<h2> {article.heading}</h2>
					<p> {article.article}</p>
					<p>{article.author.name}</p>
					<p> All articles by this author : </p>
					<ul className="other-articles">
						{article.author.contents.map(item => {
							return <li keys={item.id}>{item.heading}</li>
						})}
					</ul>
				</div>
			)
		} else {
			return(
				<div> No Article Selected </div>
			)
		}
	}
	render() {
		return (
			<div id="article-details">
				{this.displayArticleDetails()}
			</div>
		);
	}
}

export default graphql(getArticleQuery, {
	options: (props) => {
		return {
			variables: {
				id:props.contentId
			}
		}
	}
})(ArticleDetails);