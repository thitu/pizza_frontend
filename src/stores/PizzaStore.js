
/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var $ = require('jquery');
var PizzaConstants = require('../constants/PizzaConstants');
var PizzaActions = require('../actions/PizzaActions');
var _ = require('lodash');

var CHANGE_EVENT = 'change';
var baseUrl = 'http://54.213.141.57/'

var _pizzas = [];
var _toppings = [];

/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */
function createPizza(pizzaName, pizzaDescription) {
  var data = {
    pizza: {
      name: pizzaName,
      description: pizzaDescription
    }
  };

  $.post(baseUrl + 'pizzas', data, function(data) { data.toppings = [];_pizzas.push(data); PizzaStore.emitChange(); });
}

function createTopping(toppingName) {
  var data = {
    topping: {
      name: toppingName
    }
  };

  $.post(baseUrl + 'toppings', data, function(data) { _toppings.push(data); PizzaStore.emitChange(); });

}

function fetchPizzas() {
  $.get(baseUrl + 'pizzas', function(data) { _pizzas = data; buildPizzas(); PizzaStore.emitChange(); }, 'json');
}

function fetchToppings() {
  $.get(baseUrl + 'toppings', function(data) { _toppings = data; PizzaStore.emitChange(); }, 'json');
}

function fetchPizzaToppings(pizzaId) {
  if (pizzaId) {
    $.get(baseUrl + 'pizzas/' + pizzaId + '/toppings', function(data) { _pizzas[pizzaId].toppings = data; PizzaStore.emitChange(); }, 'json');
  }
}

function buildPizzas() {
  fetchToppings();
  _pizzas.forEach(function(pizza) {
      $.get(baseUrl + 'pizzas/' + pizza.id + '/toppings', function(data) { pizza.toppings = data; }, 'json');
  });
} 

function addTopping(pizzaId, toppingId) {
  var data = {
    topping_id: toppingId
  };
  

  $.post(baseUrl + '/pizzas/' + pizzaId + '/toppings', data, function(data) {
     var name = _.find(_toppings, ['id', toppingId]).name;
     data.object['name'] = name;
     _.find(_pizzas, ['id', pizzaId]).toppings.push(data.object)
      PizzaStore.emitChange();
    });
}

var PizzaStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAllPizzas: function() {
    if (!_.isEmpty(_pizzas)) {
      return _pizzas;
    } else {
      PizzaActions.fetchPizzas();
    }
  },

  getAllToppings: function() {
      return _toppings;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case PizzaConstants.PIZZA_FETCH:
      fetchPizzas();
      PizzaStore.emitChange();
      break;
    case PizzaConstants.TOPPINGS_FETCH:
      fetchToppings();
      PizzaStore.emitChange();
      break;
    case PizzaConstants.PIZZA_TOPPINGS_FETCH:
      fetchPizzaToppings();
      PizzaStore.emitChange();
      break;
    case PizzaConstants.PIZZA_CREATE:
      var name = action.name.trim();
      var description = action.description.trim();
      if (name !== '') {
        createPizza(name, description);
        PizzaStore.emitChange();  
      }
      break;
    case PizzaConstants.TOPPING_ADD:
      addTopping(action.pizzaId, action.toppingId);
      PizzaStore.emitChange();
      break;
    case PizzaConstants.TOPPING_CREATE:
      createTopping(action.name);
      PizzaStore.emitChange();
      break;

  //   default:
  //     // no op
  }
});

module.exports = PizzaStore;