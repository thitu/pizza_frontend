import React from 'react';
import ReactDOM from 'react-dom';
import ToppingList from './ToppingList';
import PizzaActions from '../actions/PizzaActions';

export default class CreatePizza extends React.Component {

	constructor(props) {
		super(props);
		this.state = {selected: 'none', name: 'Name', description: 'Description'};
		this.nameOnChange = this.nameOnChange.bind(this);
		this.descOnChange = this.descOnChange.bind(this);
		this.onClickHandler = this.onClickHander.bind(this);
	}

	render() {
	  		return (
	  			<div>
	  				<div className='pizza'>
	  				Name:&nbsp;&nbsp;<input ref='text' value={this.state.name} onChange={this.nameOnChange}/>&nbsp;&nbsp;
	  				Description:&nbsp;&nbsp;<input ref='text' value={this.state.description} onChange={this.descOnChange} />&nbsp;&nbsp;

	  					<button type='button' onClick={this.onClickHandler}>Create A New Pizza</button>
	  				</div>
	  			</div>
	  			);
		
	}

	nameOnChange(event) {
		this.setState({name: event.target.value});
	}

	descOnChange(event) {
		this.setState({description: event.target.value});
	}

	onClickHander() {
		PizzaActions.createPizza(this.state.name, this.state.description);
	}
}

