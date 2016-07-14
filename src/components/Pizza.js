import React from 'react';
import ReactDOM from 'react-dom';
import ToppingList from './ToppingList';
import ToppingsEdit from './ToppingsEdit';
import PizzaActions from '../actions/PizzaActions';

export default class Pizza extends React.Component {

	constructor(props) {
		super(props);
		this.state = {selected: false, editable: false}
		this.onClick = this.onClick.bind(this);
		this.buttonClick = this.buttonClick.bind(this);
	}

	render() {
		var selected = this.state.selected ? 'block' : 'none';
		var buttonText = this.state.editable ? 'Done Editing' : 'Add Topping';
		if (this.props.data) {

			if (this.state.editable) {
				return (
					<div>
		  				<div className='pizza' onClick={this.onClick}>
		  					{this.props.data.name}: {this.props.data.description}
		  					<button style={{float: 'right', marginRight: '30px'}} onClick={this.buttonClick}>{buttonText}</button>
		  				</div>
		  				<ToppingsEdit selected={selected} pizza={this.props.data}/>
		  			</div>
		  		)
			} else {
		  		return (
		  			<div>
		  				<div className='pizza selected' onClick={this.onClick}>
		  					{this.props.data.name}: {this.props.data.description}
		  					<button style={{float: 'right', marginRight: '30px'}} onClick={this.buttonClick}>{buttonText}</button>
		  				</div>
		  				<ToppingList pizzaId={this.props.pizzaId} selected={selected} toppings={this.props.data.toppings}/>
		  			</div>
		  		)
		  	}
		} else {
			return <div>No data!</div>
		}			
	}

	onClick() {
		this.setState({selected: !this.state.selected});	
	}

	buttonClick(event) {
		event.stopPropagation();
		this.setState({editable: !this.state.editable, selected: true});
	}
}

