import React, {Component} from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';


//Components
import ArticleList from './components/ArticleList';
import AddArticle from './components/addArticle';


//Apollo client setup
const client = new ApolloClient({
	uri:'http://localhost:4000/graphql'
})

class App extends Component{
	render() {
		return (
			<ApolloProvider client={client}>
					<div id="main">
						<h1> Article List </h1>
						<ArticleList/>
						<AddArticle/>
					</div>
			</ApolloProvider>
		);
	}
}

export default App;