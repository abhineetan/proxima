import React, {Component} from 'react';

//Components
import ArticleList from './components/ArticleList';

class App extends Component{
	render() {
		return (
			<div id="main">
				<h1> Article List </h1>
				<ArticleList/>
			</div>
		);
	}
}

export default ArticleList;