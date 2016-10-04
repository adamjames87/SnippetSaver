import React, { Component } from 'react';
import {CompositeDecorator, Editor, EditorState, RichUtils} from 'draft-js'


class SnippetCommandBar extends Component {
	constructor(props) {
		super(props);
	}


	render() {
		return (
			<nav className="level">
				<div className="level-left">
					<a className="level-item"
						onClick={this.props.onBoldClick}>
						<span className="icon is-small">
							<i className="fa fa-bold"></i>
						</span>
					</a>
					<a className="level-item"
						onClick={this.props.onItalicClick} >
						<span className="icon is-small">
							<i className="fa fa-italic"></i>
						</span>
					</a>
				</div>
				<div className="level-right">
					<span className="level-item">
							<small>22:50 - 2 October 2016</small>
					</span>
				</div>
			</nav>
		)

	}
}


class SnippetEditor extends Component {
	constructor(props) {
		super(props);

		this.state = { editorState: EditorState.createEmpty()};
		this.onChange = (editorState) => this.setState({editorState});
		this.handleKeyCommand = this.handleKeyCommand.bind(this);
		this.onBoldClick = this.onBoldClick.bind(this);
		this.onItalicClick = this.onItalicClick.bind(this);
		this.hashtagStrategy = this.hashtagStrategy.bind(this);
		this.HashtagSpan = this.HashtagSpan.bind(this);
		const compositeDecorator = new CompositeDecorator([
			{
				strategy: this.hashtagStrategy,
				component: this.HashtagSpan
			}
		]);
	}

	hashtagStrategy() {
	}

	HashtagSpan = (props) => {
		return <span {...props}>{props.children}</span>
	}


	findWithRegex (regex, contentBlock, callback) {
	    const text = contentBlock.getText();
        let matchArr, start;
        while ((matchArr = regex.exec(text)) !== null) {
          start = matchArr.index;
          callback(start, start + matchArr[0].length);
        }
	}



	onBoldClick() {
		this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
	}

	onItalicClick() {
		this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
	}

	handleKeyCommand(command) {
		const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
		if (newState) {
			this.onChange(newState);
			return 'handled';
		}
		return 'not-handled';
	}

	render() {
		const {editorState} = this.state;
		return (
			<div>
				<SnippetCommandBar
					onBoldClick={this.onBoldClick}
					onItalicClick={this.onItalicClick}
					 />
				<Editor
					 editorState={editorState}
					 onChange={this.onChange}
					 handleKeyCommand={this.handleKeyCommand} />
			</div>
		)

	}
}


class SnippetInfoBar extends Component {
	constructor(props) {
		super(props);
	}


	render() {
		return (
			<div className="level">
				<div className="level-left">
					<div className="level-item">
						<p className="card-header-title" >
							{this.props.cardName}
						</p>
					</div>
					<div className="level-item">
						<span className="tag is-primary">
							Python
						</span>
					</div>
					<div className="level-item">
						<span className="tag is-info">
							File
							<button className="delete"></button>
						</span>
					</div>
					<div className="level-item">
						<span className="tag is-info">
							Utils
							<button className="delete"></button>
						</span>
					</div>
				</div>
			</div>
		)

	}
}


export class Snippet extends Component {
	constructor(props) {
		super(props);
	}


	render () {
		return (
			<div>
				<nav className="level">
					<div className="level-left">
						<div className="level-item">
							<p className="subtitle">
							55 Snippets
							</p>
						</div>
						<div className="level-item">
							<input 
								className="input is-primary"
								type="text"
								placeholder="Search"
								/>
						</div>
					</div>
				</nav>
				<div className="columns">
					<div className="column">
						<div className="card is-fullwidth">
							<header className="card-header">
								<SnippetInfoBar 
									cardName="Load File"/>
							</header>
							<div className="card-content">
							<SnippetEditor
								/>
							</div>
							<footer className="card-footer">
								<a className="card-footer-item">Copy</a>
								<a className="card-footer-item">Delete</a>
								<a className="card-footer-item">Delete</a>
							</footer>
						</div>
						<br />
						<div className="card is-fullwidth">
							<header className="card-header">
								<div className="level">
									<div className="level-left">
										<div className="level-item">
											<p className="subtitle" >
												LOAD FILE
											</p>
										</div>
										<div className="level-item">
											<span className="tag is-primary">
												Python
											</span>
										</div>
										<div className="level-item">
											<span className="tag is-info">
												File
												<button className="delete"></button>
											</span>
										</div>
										<div className="level-item">
											<span className="tag is-info">
												Utils
												<button className="delete"></button>
											</span>
										</div>
									</div>
								</div>
							</header>
							<div className="card-content">
								Some other content
								<br />
								<small>22:50 - 2 October 2016</small>
							</div>
							<footer className="card-footer">
								<a className="card-footer-item">Copy</a>
								<a className="card-footer-item">Edit</a>
							</footer>
						</div>

						<div className="box">
							Another Test
						</div>
					</div>
				</div>
			</div>
		)
	}
}


// function StringContains(str, sub) {
// 	return str.indexOf(sub) !== -1;
// }

// export class TestComponent extends Component {
// 	render() {
// 		return (
// 			<div className="filterableProduct">
// 			 	<h2> Filter Products</h2>
// 			</div>
// 		)	
// 	}
// }

// export class FilterableProductTable extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {products: props.allProducts}
// 		this.handleProductFiltering = this.handleProductFiltering.bind(this)
// 	}

// 	handleProductFiltering(filterTerm) {
// 		console.log("product filtered")
// 		if (filterTerm) {
// 			// Filter the state
// 			var filteredProducts = this.props.allProducts.filter(function(elem) {
// 				return StringContains(elem.name, filterTerm)
// 			});
// 			this.setState({products: filteredProducts})
// 		} else {
// 			this.setState( {products : this.props.allProducts })
// 		}
// 	}

// 	render() {
// 		return (
// 			<div className="filterableProduct">
// 			 	<h2> Filter Products</h2>
// 			 	<FilterableProductSearchBox  onFilter={this.handleProductFiltering}/>
// 			 	<FilterableProductList products={this.state.products}/>
// 			</div>
// 		)	
// 	}
// }


// var FilterableProductRow = React.createClass({
// 	render : function() {
// 		return (
// 			<li>
// 				{this.props.name}
// 			</li>
// 		)
// 	}
// })


// var FilterableProductList = React.createClass({

// 	render : function() {
// 		var productNodes = this.props.products.map( function(product) {
// 			return (
// 				<FilterableProductRow name={product.name} />
// 			)
// 		});

// 		return (
// 			<ul>
// 				{productNodes}
// 			</ul>
// 		)
// 	}
// });


// var FilterableProductSearchBox = React.createClass({
// 	getInitialState : function() {
// 	        return {searchTerm: ''};
// 	},
// 	handleSearchTermChange : function(e) {
// 		var searchTerm = e.target.value;
// 		this.setState({searchTerm: searchTerm});
// 		this.props.onFilter(searchTerm);
// 	},
// 	render : function() {
// 		return (
// 			<input 
// 				type="text" 
// 				placeholder="Search ..."
// 				value={this.state.searchTerm}
// 				onChange={this.handleSearchTermChange}></input>
// 		)
// 	}
// });
