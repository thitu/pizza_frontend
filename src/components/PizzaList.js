import React from 'react';
import ReactDOM from 'react-dom';
import Pizza from './Pizza';
import CreatePizza from './CreatePizza';
import $ from 'jquery';
import PizzaStore from '../stores/PizzaStore';
import _ from 'lodash';

function getPizzaState() {
  return {
    allPizzas: PizzaStore.getAllPizzas()
  };
}

export default class PizzaList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {allPizzas: getPizzaState()}
		this._onChange = this._onChange.bind(this);
	}

	componentDidMount() {
		PizzaStore.addChangeListener(this._onChange);
	}

	componentWillUnmount() {
		PizzaStore.removeChangeListener(this._onChange);
	}

	render() {
		if (this.state.allPizzas.length) {
			var pizzas = this.state.allPizzas.map(function(pizza) {
	        	return <Pizza data={pizza} key={pizza.id} pizzaId={pizza.id} />;
		    });
		} else {
			var pizzas = [];
		}
		return (
			<div class='container'>
				{pizzas}
				<CreatePizza />
			</div>
		)
	}

	_onChange() {
		this.setState(getPizzaState());
	}
}