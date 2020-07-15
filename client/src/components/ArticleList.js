import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import { getArticlesQuery } from '../graphqlQueries/queries'


//Components
import ArticleDetails from './articleDetails';

class ArticleList extends Component{
	constructor(props) {
		super(props);
		this.state = {
			selected : null
		}
	}
	displayArticles(){
		var data = this.props.data;
		if(data.loading){
			return <div> loading Articles </div>
		} else {
			return data.contents.map(article => {
				return(
					<li key={article.id} onClick={(e) =>{this.setState({selected : article.id})}}> {article.heading} </li>
				);
			})
		}
	}
	render() {
		return (
			<div>
				<ul id="article-list">
					{this.displayArticles()}
				</ul>
				<ArticleDetails articleId={this.state.selected}/>
			</div>
		);
	}
}

export default graphql(getArticlesQuery)(ArticleList);