import React from 'react';
import ReactDOM from 'react-dom';
import Topping from './Topping';
import PizzaStore from '../stores/PizzaStore';
import $ from 'jquery';

export default class ToppingList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {allToppings: this.props.toppings, selected: 'none'}
	}

	render() {

			if (this.props.toppings) {
			var toppings = this.props.toppings.map(function(toppings) {
    	        return <Topping class='topping' data={toppings.name} key={toppings.id} />;
       		});
			} else {
				var toppings = [];
			}
		return (
			<div class='topping' style={{'display': this.props.selected}}>
				{toppings}
			</div>
		)
	}

}