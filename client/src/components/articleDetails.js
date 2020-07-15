import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import { getArticleQuery } from '../graphqlQueries/queries'

class ArticleDetails extends Component{
	displayArticleDetails(){
		console.log(this.props);
		const {article} = this.props.data;
		if(article) {
			return(
				<div>
					<h2> {article.heading}</h2>
					<p> {article.content}</p>
					<p>{article.author.name}</p>
					<p> All articles by this author : </p>
					<ul className="other-articles">
						{article.author.content.map(item => {
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
				id:props.articleId
			}
		}
	}
})(ArticleDetails);