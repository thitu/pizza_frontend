import React from 'react';
import ReactDOM from 'react-dom';
import PizzaActions from '../actions/PizzaActions';

export default class ToppingCheckbox extends React.Component {

	constructor(props) {
		super(props);
		this.onClickHandler = this.onClickHandler.bind(this);
		this.getChecked = this.getChecked.bind(this);
	}

	render() {
		var checked = this.getChecked();
		var addToppingButton;
		if (!checked) {
			addToppingButton = <button type='button' onClick={this.onClickHandler} style={{float: 'right', marginRight: '30px', padding: '2px'}}>Add Topping</button>;
		}
  		return (
	  		<div className='topping'>{this.props.data}&nbsp;
	  			{addToppingButton}
	  		</div>
  		)
	}

	onClickHandler() {
		PizzaActions.addTopping(this.props.pizzaId, this.props.toppingId);
	}

	getChecked() {
		return this.props.checked;
	}
}
