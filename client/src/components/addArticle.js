import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash'
import { getAuthorsQuery, addArticleMutation,getArticlesQuery } from '../graphqlQueries/queries'


class AddArticle extends Component{
	constructor(props){
		super(props);
		this.state = {
			heading: "",
			content: "",
			authorId: ""
		}
	}
	displayAuthors() {
		var data = this.props.getAuthorsQuery;
		if(data.loading){
			return <div> loading Articles </div>
		} else {
			return data.authors.map(author => {
				return(
					<option key={author.id} value={author.id}>{author.name}</option>
				);
			})
		}
	}
	submitForm(e){
		e.preventDefault();
		this.props.addArticleMutation({
			variables: {
				heading: this.state.heading,
				article: this.state.content,
				authorId: this.state.authorId
			},
			refetchQueries: [{query:getArticlesQuery}] 
		});
	}
	render() {
		return (
			<form id='add-article' onSubmit={this.submitForm.bind(this)}>
				<div className="field">
					<label>Heading</label>
					<input type="text" onChange={(e) => this.setState({heading : e.target.value})}/>
				</div>

				<div className="field">
					<label>Content</label>
					<input type="text" onChange={(e) => this.setState({content : e.target.value})}/>
				</div>

				<div className="field">
					<label>Author</label>
					<select onChange={(e) => this.setState({authorId : e.target.value})}>
						<option> Select Author </option>
						{this.displayAuthors()}
					</select>
				</div>

				<button>+</button>
			</form>
		);
	}
}

export default compose(
	graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
	graphql(addArticleMutation, {name: "addArticleMutation"})
)(AddArticle);
