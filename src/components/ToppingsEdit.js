import React from 'react';
import ReactDOM from 'react-dom';
import Topping from './Topping';
import ToppingCheckbox from './ToppingCheckbox';
import CreateTopping from './CreateTopping';
import PizzaStore from '../stores/PizzaStore';
import $ from 'jquery';
import _ from 'lodash';

function getToppingState() {
    return {
    	allToppings: PizzaStore.getAllToppings(),
    	allPizzas: PizzaStore.getAllPizzas()
    }
}

export default class ToppingEdit extends React.Component {

	constructor(props) {
		super(props);
		this.state = getToppingState();
		this._onChange = this._onChange.bind(this);
		this.getPizzaToppings = this.getPizzaToppings.bind(this);
		this.getPizzaId = this.getPizzaId.bind(this);
	}

	componentDidMount() {
		PizzaStore.addChangeListener(this._onChange);
	}

	componentWillUnmount() {
		PizzaStore.removeChangeListener(this._onChange);
	}

	render() {
		var toppingIds = this.getPizzaToppings();
		var pizzaId = this.getPizzaId();
		if (this.state.allToppings.length) {
			var toppings = this.state.allToppings.map(function(toppings) {
				var checked = _.includes(toppingIds, toppings.id);
				return <ToppingCheckbox class='topping' data={toppings.name} toppingId={toppings.id} pizzaId={pizzaId} key={toppings.id} checked={checked} />;
			});
		} else {
			var toppings = [];
		}
		return (
			<div class='topping' style={{'display': this.props.selected}}>
				{toppings}
				<CreateTopping />
			</div>
		)
	}

	_onChange() {
		this.setState(getToppingState());
	}

	getPizzaToppings() {
		var toppingIds = [];
		var pizza = _.find(this.state.allPizzas, ['id', this.getPizzaId()]);
		pizza.toppings.forEach(function(topping) {
			toppingIds.push(topping.topping_id);
		});

		return toppingIds;
	}

	getPizzaId() {
		var pizzaId = this.props.pizza.id;
		return pizzaId;
	}
}