var AppDispatcher = require('../dispatcher/AppDispatcher');
var PizzaConstants = require('../constants/PizzaConstants');

var PizzaActions = {

  /**
   * @param  {string} text
   */
  createPizza: function(name, description) {
    AppDispatcher.dispatch({
      actionType: PizzaConstants.PIZZA_CREATE,
      name: name,
      description: description
    });
  },

  /**
   * @param  {string} id
   */
  createTopping: function(name) {
    AppDispatcher.dispatch({
      actionType: PizzaConstants.TOPPING_CREATE,
      name: name
    });
  },

  addTopping: function(pizzaId, toppingId) {
    AppDispatcher.dispatch({
      actionType: PizzaConstants.TOPPING_ADD,
      pizzaId: pizzaId,
      toppingId: toppingId
    });
  },

  fetchPizzas: function() {
    AppDispatcher.dispatch({
      actionType: PizzaConstants.PIZZA_FETCH
    });
  },

  fetchPizzaToppings: function(pizzaId) {
    AppDispatcher.dispatch({
      actionType: PizzaConstants.PIZZA_TOPPINGS_FETCH,
      pizzId: pizzaId
    })
  }

};

module.exports = PizzaActions;