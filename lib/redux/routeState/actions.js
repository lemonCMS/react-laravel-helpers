'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storeState = storeState;

var _constants = require('./constants');

function storeState(route, state) {
  return {
    type: _constants.ROUTER_STORE_STATE,
    route: route,
    state: state
  };
}