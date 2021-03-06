(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.constants = mod.exports;
  }
})(this, function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.reducerItem = _exports.reducerIndex = _exports.STORE_STACK_ITEM_CLEAR = _exports.STORE_STACK_ITEM_LOAD_FAILED = _exports.STORE_STACK_ITEM_LOAD_SUCCESS = _exports.STORE_STACK_ITEM_LOAD = _exports.STORE_ITEM_CLEAR_NETWORK_STATE = _exports.STORE_ITEM_PROPERTY_FAIL = _exports.STORE_ITEM_PROPERTY_SUCCESS = _exports.STORE_ITEM_PROPERTY = _exports.STORE_ITEM_DELETE_FAIL = _exports.STORE_ITEM_DELETE_SUCCESS = _exports.STORE_ITEM_DELETE = _exports.STORE_ITEM_LOCAL_DEEP_DELETE = _exports.STORE_ITEM_LOCAL_UPDATE_FAIL = _exports.STORE_ITEM_LOCAL_UPDATE_SUCCESS = _exports.STORE_ITEM_LOCAL_UPDATE = _exports.STORE_ITEM_DELETE_DEEP_FAIL = _exports.STORE_ITEM_DELETE_DEEP_SUCCESS = _exports.STORE_ITEM_DELETE_DEEP = _exports.STORE_ITEM_CREATE_DEEP_FAIL = _exports.STORE_ITEM_CREATE_DEEP_SUCCESS = _exports.STORE_ITEM_CREATE_DEEP = _exports.STORE_ITEM_UPDATE_DEEP_FAIL = _exports.STORE_ITEM_UPDATE_DEEP_SUCCESS = _exports.STORE_ITEM_UPDATE_DEEP = _exports.STORE_ITEM_UPDATE_FAIL = _exports.STORE_ITEM_UPDATE_SUCCESS = _exports.STORE_ITEM_UPDATE = _exports.STORE_ITEM_EDIT_FAIL = _exports.STORE_ITEM_EDIT_SUCCESS = _exports.STORE_ITEM_EDIT = _exports.STORE_ITEM_CREATE_FAIL = _exports.STORE_ITEM_CREATE_SUCCESS = _exports.STORE_ITEM_CREATE = _exports.STORE_SIMPLE_CLEAR = _exports.STORE_SIMPLE_LOAD_FAIL = _exports.STORE_SIMPLE_LOAD_SUCCESS = _exports.STORE_SIMPLE_LOAD = _exports.STORE_ITEM_CLEAR = _exports.STORE_ITEM_LOAD_FAIL = _exports.STORE_ITEM_LOAD_SUCCESS = _exports.STORE_ITEM_LOAD = _exports.STORE_LIST_UPDATE_FAIL = _exports.STORE_LIST_UPDATE_SUCCESS = _exports.STORE_LIST_UPDATE = _exports.STORE_LIST_ALL_CLEAR = _exports.STORE_LIST_ALL_FAIL = _exports.STORE_LIST_ALL_SUCCESS = _exports.STORE_LIST_ALL = _exports.STORE_LIST_CLEAR = _exports.STORE_LIST_FAIL = _exports.STORE_LIST_SUCCESS = _exports.STORE_LIST = void 0;
  var STORE_LIST = 'STORE_LIST';
  _exports.STORE_LIST = STORE_LIST;
  var STORE_LIST_SUCCESS = 'STORE_LIST_SUCCESS';
  _exports.STORE_LIST_SUCCESS = STORE_LIST_SUCCESS;
  var STORE_LIST_FAIL = 'STORE_LIST_FAIL';
  _exports.STORE_LIST_FAIL = STORE_LIST_FAIL;
  var STORE_LIST_CLEAR = 'STORE_LIST_CLEAR';
  _exports.STORE_LIST_CLEAR = STORE_LIST_CLEAR;
  var STORE_LIST_ALL = 'STORE_LIST_ALL';
  _exports.STORE_LIST_ALL = STORE_LIST_ALL;
  var STORE_LIST_ALL_SUCCESS = 'STORE_LIST_ALL_SUCCESS';
  _exports.STORE_LIST_ALL_SUCCESS = STORE_LIST_ALL_SUCCESS;
  var STORE_LIST_ALL_FAIL = 'STORE_LIST_ALL_FAIL';
  _exports.STORE_LIST_ALL_FAIL = STORE_LIST_ALL_FAIL;
  var STORE_LIST_ALL_CLEAR = 'STORE_LIST_ALL_CLEAR';
  _exports.STORE_LIST_ALL_CLEAR = STORE_LIST_ALL_CLEAR;
  var STORE_LIST_UPDATE = 'STORE_LIST_UPDATE';
  _exports.STORE_LIST_UPDATE = STORE_LIST_UPDATE;
  var STORE_LIST_UPDATE_SUCCESS = 'STORE_LIST_UPDATE_SUCCESS';
  _exports.STORE_LIST_UPDATE_SUCCESS = STORE_LIST_UPDATE_SUCCESS;
  var STORE_LIST_UPDATE_FAIL = 'STORE_LIST_UPDATE_FAIL';
  _exports.STORE_LIST_UPDATE_FAIL = STORE_LIST_UPDATE_FAIL;
  var STORE_ITEM_LOAD = 'STORE_ITEM_LOAD';
  _exports.STORE_ITEM_LOAD = STORE_ITEM_LOAD;
  var STORE_ITEM_LOAD_SUCCESS = 'STORE_ITEM_LOAD_SUCCESS';
  _exports.STORE_ITEM_LOAD_SUCCESS = STORE_ITEM_LOAD_SUCCESS;
  var STORE_ITEM_LOAD_FAIL = 'STORE_ITEM_LOAD_FAIL';
  _exports.STORE_ITEM_LOAD_FAIL = STORE_ITEM_LOAD_FAIL;
  var STORE_ITEM_CLEAR = 'STORE_ITEM_CLEAR';
  _exports.STORE_ITEM_CLEAR = STORE_ITEM_CLEAR;
  var STORE_SIMPLE_LOAD = 'STORE_SIMPLE_LOAD';
  _exports.STORE_SIMPLE_LOAD = STORE_SIMPLE_LOAD;
  var STORE_SIMPLE_LOAD_SUCCESS = 'STORE_LOAD_SIMPLE_SUCCESS';
  _exports.STORE_SIMPLE_LOAD_SUCCESS = STORE_SIMPLE_LOAD_SUCCESS;
  var STORE_SIMPLE_LOAD_FAIL = 'STORE_LOAD_SIMPLE_FAIL';
  _exports.STORE_SIMPLE_LOAD_FAIL = STORE_SIMPLE_LOAD_FAIL;
  var STORE_SIMPLE_CLEAR = 'STORE_SIMPLE_CLEAR';
  _exports.STORE_SIMPLE_CLEAR = STORE_SIMPLE_CLEAR;
  var STORE_ITEM_CREATE = 'STORE_ITEM_CREATE';
  _exports.STORE_ITEM_CREATE = STORE_ITEM_CREATE;
  var STORE_ITEM_CREATE_SUCCESS = 'STORE_ITEM_CREATE_SUCCESS';
  _exports.STORE_ITEM_CREATE_SUCCESS = STORE_ITEM_CREATE_SUCCESS;
  var STORE_ITEM_CREATE_FAIL = 'STORE_ITEM_CREATE_FAIL';
  _exports.STORE_ITEM_CREATE_FAIL = STORE_ITEM_CREATE_FAIL;
  var STORE_ITEM_EDIT = 'STORE_ITEM_EDIT';
  _exports.STORE_ITEM_EDIT = STORE_ITEM_EDIT;
  var STORE_ITEM_EDIT_SUCCESS = 'STORE_ITEM_EDIT_SUCCESS';
  _exports.STORE_ITEM_EDIT_SUCCESS = STORE_ITEM_EDIT_SUCCESS;
  var STORE_ITEM_EDIT_FAIL = 'STORE_ITEM_EDIT_FAIL';
  _exports.STORE_ITEM_EDIT_FAIL = STORE_ITEM_EDIT_FAIL;
  var STORE_ITEM_UPDATE = 'STORE_ITEM_UPDATE';
  _exports.STORE_ITEM_UPDATE = STORE_ITEM_UPDATE;
  var STORE_ITEM_UPDATE_SUCCESS = 'STORE_ITEM_UPDATE_SUCCESS';
  _exports.STORE_ITEM_UPDATE_SUCCESS = STORE_ITEM_UPDATE_SUCCESS;
  var STORE_ITEM_UPDATE_FAIL = 'STORE_ITEM_UPDATE_FAIL';
  _exports.STORE_ITEM_UPDATE_FAIL = STORE_ITEM_UPDATE_FAIL;
  var STORE_ITEM_UPDATE_DEEP = 'STORE_ITEM_UPDATE_DEEP';
  _exports.STORE_ITEM_UPDATE_DEEP = STORE_ITEM_UPDATE_DEEP;
  var STORE_ITEM_UPDATE_DEEP_SUCCESS = 'STORE_ITEM_UPDATE_SUCCESS_DEEP';
  _exports.STORE_ITEM_UPDATE_DEEP_SUCCESS = STORE_ITEM_UPDATE_DEEP_SUCCESS;
  var STORE_ITEM_UPDATE_DEEP_FAIL = 'STORE_ITEM_UPDATE_FAIL_DEEP';
  _exports.STORE_ITEM_UPDATE_DEEP_FAIL = STORE_ITEM_UPDATE_DEEP_FAIL;
  var STORE_ITEM_CREATE_DEEP = 'STORE_ITEM_CREATE_DEEP';
  _exports.STORE_ITEM_CREATE_DEEP = STORE_ITEM_CREATE_DEEP;
  var STORE_ITEM_CREATE_DEEP_SUCCESS = 'STORE_ITEM_CREATE_DEEP_SUCCESS';
  _exports.STORE_ITEM_CREATE_DEEP_SUCCESS = STORE_ITEM_CREATE_DEEP_SUCCESS;
  var STORE_ITEM_CREATE_DEEP_FAIL = 'STORE_ITEM_CREATE_DEEP_FAIL';
  _exports.STORE_ITEM_CREATE_DEEP_FAIL = STORE_ITEM_CREATE_DEEP_FAIL;
  var STORE_ITEM_DELETE_DEEP = 'STORE_ITEM_DELETE_DEEP';
  _exports.STORE_ITEM_DELETE_DEEP = STORE_ITEM_DELETE_DEEP;
  var STORE_ITEM_DELETE_DEEP_SUCCESS = 'STORE_ITEM_DELETE_DEEP_SUCCESS';
  _exports.STORE_ITEM_DELETE_DEEP_SUCCESS = STORE_ITEM_DELETE_DEEP_SUCCESS;
  var STORE_ITEM_DELETE_DEEP_FAIL = 'STORE_ITEM_DELETE_DEEP_FAIL';
  _exports.STORE_ITEM_DELETE_DEEP_FAIL = STORE_ITEM_DELETE_DEEP_FAIL;
  var STORE_ITEM_LOCAL_UPDATE = 'STORE_ITEM_LOCAL_UPDATE';
  _exports.STORE_ITEM_LOCAL_UPDATE = STORE_ITEM_LOCAL_UPDATE;
  var STORE_ITEM_LOCAL_UPDATE_SUCCESS = 'STORE_ITEM_LOCAL_UPDATE_SUCCESS';
  _exports.STORE_ITEM_LOCAL_UPDATE_SUCCESS = STORE_ITEM_LOCAL_UPDATE_SUCCESS;
  var STORE_ITEM_LOCAL_UPDATE_FAIL = 'STORE_ITEM_LOCAL_UPDATE_FAIL';
  _exports.STORE_ITEM_LOCAL_UPDATE_FAIL = STORE_ITEM_LOCAL_UPDATE_FAIL;
  var STORE_ITEM_LOCAL_DEEP_DELETE = 'STORE_ITEM_LOCAL_DEEP_DELETE';
  _exports.STORE_ITEM_LOCAL_DEEP_DELETE = STORE_ITEM_LOCAL_DEEP_DELETE;
  var STORE_ITEM_DELETE = 'STORE_ITEM_DELETE';
  _exports.STORE_ITEM_DELETE = STORE_ITEM_DELETE;
  var STORE_ITEM_DELETE_SUCCESS = 'STORE_ITEM_DELETE_SUCCESS';
  _exports.STORE_ITEM_DELETE_SUCCESS = STORE_ITEM_DELETE_SUCCESS;
  var STORE_ITEM_DELETE_FAIL = 'STORE_ITEM_DELETE_FAIL';
  _exports.STORE_ITEM_DELETE_FAIL = STORE_ITEM_DELETE_FAIL;
  var STORE_ITEM_PROPERTY = 'STORE_ITEM_PROPERTY';
  _exports.STORE_ITEM_PROPERTY = STORE_ITEM_PROPERTY;
  var STORE_ITEM_PROPERTY_SUCCESS = 'STORE_ITEM_PROPERTY_SUCCESS';
  _exports.STORE_ITEM_PROPERTY_SUCCESS = STORE_ITEM_PROPERTY_SUCCESS;
  var STORE_ITEM_PROPERTY_FAIL = 'STORE_ITEM_PROPERTY_FAIL';
  _exports.STORE_ITEM_PROPERTY_FAIL = STORE_ITEM_PROPERTY_FAIL;
  var STORE_ITEM_CLEAR_NETWORK_STATE = 'STORE_ITEM_CLEAR_NETWORK_STATE';
  _exports.STORE_ITEM_CLEAR_NETWORK_STATE = STORE_ITEM_CLEAR_NETWORK_STATE;
  var STORE_STACK_ITEM_LOAD = 'STORE_STACK_ITEM_LOAD';
  _exports.STORE_STACK_ITEM_LOAD = STORE_STACK_ITEM_LOAD;
  var STORE_STACK_ITEM_LOAD_SUCCESS = 'STORE_STACK_ITEM_LOAD_SUCCESS';
  _exports.STORE_STACK_ITEM_LOAD_SUCCESS = STORE_STACK_ITEM_LOAD_SUCCESS;
  var STORE_STACK_ITEM_LOAD_FAILED = 'STORE_STACK_ITEM_LOAD_FAILED';
  _exports.STORE_STACK_ITEM_LOAD_FAILED = STORE_STACK_ITEM_LOAD_FAILED;
  var STORE_STACK_ITEM_CLEAR = 'STORE_STACK_ITEM_CLEAR';
  _exports.STORE_STACK_ITEM_CLEAR = STORE_STACK_ITEM_CLEAR;
  var reducerIndex = 'store';
  _exports.reducerIndex = reducerIndex;
  var reducerItem = 'item';
  _exports.reducerItem = reducerItem;
});