'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;

var _constants = require('./constants');

var storeStateReducer = function storeStateReducer(object, id, value) {
  var clone = Object.assign({}, object);
  clone[id] = value;
  return clone;
};

var initialState = {
  routes: {}
};

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case _constants.ROUTER_STORE_STATE:
      return Object.assign({}, state, { routes: storeStateReducer(state.routes, action.route, action.state) });
    default:
      return Object.assign({}, state);
  }
}