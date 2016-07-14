import React from 'react';
import ReactDOM from 'react-dom';
import ToppingList from './ToppingList';
import PizzaActions from '../actions/PizzaActions';

export default class CreateTopping extends React.Component {

	constructor(props) {
		super(props);
		this.state = {name: 'Name'};
		this.nameOnChange = this.nameOnChange.bind(this);
		this.onClickHandler = this.onClickHander.bind(this);
	}

	render() {
	  		return (
	  			<div>
	  				<div className='topping'>
	  				Name:&nbsp;&nbsp;<input ref='text' value={this.state.name} onChange={this.nameOnChange}/>&nbsp;&nbsp;

	  					<button type='button' onClick={this.onClickHandler}>Create A New Topping</button>
	  				</div>
	  			</div>
	  			);
		
	}

	nameOnChange(event) {
		this.setState({name: event.target.value});
	}

	onClickHander() {
		PizzaActions.createTopping(this.state.name);
	}
}

