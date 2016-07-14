import React from 'react';
import ReactDOM from 'react-dom';

export default class Topping extends React.Component {
	render() {
		if (this.props.data) {
	  		return <div className='topping'>{this.props.data}</div>
		} else {
			return <div>No data!</div>
		}
	}
}

