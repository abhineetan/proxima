import React, {Component} from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getAuthorsQuery = gql`
{
	authors {
		id
		name
	}
}`

class AddArticle extends Component{
	displayAuthors() {
		var data = this.props.data;
		if(data.loading){
			return <div> loading Articles </div>
		}else {
			return data.authors.map(author => {
				return(
					<option key={author.id} value={author.id}> {author.name} </option>
				);
			})
		}
	}
	render() {
		return (
			<form id='add-article'>
				<div className="field">
					<label>Heading</label>
					<input type="text"/>
				</div>

				<div className="field">
					<label>Content</label>
					<input type="text"/>
				</div>

				<div className="field">
					<label>Author</label>
					<select>
						<option> Select Author </option>
						{this.displayAuthors()}
					</select>
				</div>

				<button>*</button>
			</form>
		);
	}
}

export default graphql(getAuthorsQuery)(AddArticle);
