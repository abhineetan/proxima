import React, {Component} from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';


//Components
import ArticleList from './components/ArticleList';


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
					</div>
			</ApolloProvider>
		);
	}
}

export default App;