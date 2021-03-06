import React, { Component } from 'react';


function StringContains(str, sub) {
	return str.indexOf(sub) !== -1;
}

export class TestComponent extends Component {
	render() {
		return (
			<div className="filterableProduct">
			 	<h2> Filter Products</h2>
			</div>
		)	
	}
}

export class FilterableProductTable extends Component {
	constructor(props) {
		super(props);
		this.state = {products: props.allProducts}
		this.handleProductFiltering = this.handleProductFiltering.bind(this)
	}

	handleProductFiltering(filterTerm) {
		console.log("product filtered")
		if (filterTerm) {
			// Filter the state
			var filteredProducts = this.props.allProducts.filter(function(elem) {
				return StringContains(elem.name, filterTerm)
			});
			this.setState({products: filteredProducts})
		} else {
			this.setState( {products : this.props.allProducts })
		}
	}

	render() {
		return (
			<div className="columns">
				<div className="column filterableProduct">
					<div className="box">
					 	<h2> Filter Products</h2>
					 	<FilterableProductSearchBox  onFilter={this.handleProductFiltering}/>
					 	<FilterableProductList products={this.state.products}/>
					</div>
				</div>
			</div>
		)	
	}
}


var FilterableProductRow = React.createClass({
	render : function() {
		return (
			<li>
				{this.props.name}
			</li>
		)
	}
})


var FilterableProductList = React.createClass({

	render : function() {
		var productNodes = this.props.products.map( function(product) {
			return (
				<FilterableProductRow name={product.name} />
			)
		});

		return (
			<ul>
				{productNodes}
			</ul>
		)
	}
});


var FilterableProductSearchBox = React.createClass({
	getInitialState : function() {
	        return {searchTerm: ''};
	},
	handleSearchTermChange : function(e) {
		var searchTerm = e.target.value;
		this.setState({searchTerm: searchTerm});
		this.props.onFilter(searchTerm);
	},
	render : function() {
		return (
			<input 
				className="input is-primary"
				type="text" 
				placeholder="Search ..."
				value={this.state.searchTerm}
				onChange={this.handleSearchTermChange}></input>
		)
	}
});