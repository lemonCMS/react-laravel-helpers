'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.simpleLoad = simpleLoad;
exports.simpleClear = simpleClear;
exports.load = load;
exports.loadAll = loadAll;
exports.clearAll = clearAll;
exports.updateItemLocal = updateItemLocal;
exports.updateAndDispatch = updateAndDispatch;
exports.update = update;
exports.updateDeep = updateDeep;
exports.destroyDeep = destroyDeep;
exports.createDeep = createDeep;
exports.create = create;
exports.post = post;
exports.loadItem = loadItem;
exports.destroyItem = destroyItem;
exports.setPropertyItem = setPropertyItem;
exports.clearList = clearList;
exports.clearItem = clearItem;
exports.loadStackItem = loadStackItem;
exports.request = request;
exports.clearStackItem = clearStackItem;
exports.clearNetworkState = clearNetworkState;
exports.isAllLoaded = isAllLoaded;
exports.isLoaded = isLoaded;
exports.isLoadedSimple = isLoadedSimple;
exports.isLoadedItem = isLoadedItem;
exports.isLoadedItemByString = isLoadedItemByString;

var _isEqual2 = require('lodash/isEqual');

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _constants = require('./constants');

var constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function simpleLoad(key, path) {
  var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return {
    types: [constants.STORE_SIMPLE_LOAD, constants.STORE_SIMPLE_LOAD_SUCCESS, constants.STORE_SIMPLE_LOAD_FAIL],
    key: key,
    path: path,
    params: params,
    promise: function promise(_ref) {
      var client = _ref.client;
      return client.get(path, {
        params: _extends({}, params)
      });
    }
  };
}

function simpleClear(key) {
  return {
    type: constants.STORE_SIMPLE_CLEAR,
    key: key
  };
}

function load(key, path, params) {
  return {
    types: [constants.STORE_LIST, constants.STORE_LIST_SUCCESS, constants.STORE_LIST_FAIL],
    key: key,
    promise: function promise(_ref2) {
      var client = _ref2.client;
      return client.get(path, {
        params: _extends({}, params)
      });
    }
  };
}

function loadAll(key, path) {
  return {
    types: [constants.STORE_LIST_ALL, constants.STORE_LIST_ALL_SUCCESS, constants.STORE_LIST_ALL_FAIL],
    key: key,
    promise: function promise(_ref3) {
      var client = _ref3.client;
      return client.get(path, {
        params: {
          'all': true
        }
      });
    }
  };
}

function clearAll(key) {
  return {
    type: constants.STORE_LIST_ALL_CLEAR,
    key: key
  };
}

function updateItemLocal(key, payload) {
  return {
    type: constants.STORE_ITEM_LOCAL_UPDATE,
    key: key,
    payload: payload
  };
}

function updateAndDispatch(key, path, id, params) {
  return {
    types: [constants.STORE_ITEM_LOCAL_UPDATE, constants.STORE_ITEM_LOCAL_UPDATE_SUCCESS, constants.STORE_ITEM_LOCAL_UPDATE_FAIL],
    key: key,
    promise: function promise(_ref4) {
      var client = _ref4.client;
      return client.put(path + '/' + id, {
        data: params
      });
    },
    payload: params
  };
}

function update(key, path, id, params) {
  return {
    types: [constants.STORE_ITEM_UPDATE, constants.STORE_ITEM_UPDATE_SUCCESS, constants.STORE_ITEM_UPDATE_FAIL],
    key: key,
    promise: function promise(_ref5) {
      var client = _ref5.client;
      return client.put(path + '/' + id, {
        data: params
      });
    },
    payload: params
  };
}

function updateDeep(key, path, id, params, pathDeep, cb) {
  return {
    types: [constants.STORE_ITEM_UPDATE_DEEP, constants.STORE_ITEM_UPDATE_DEEP_SUCCESS, constants.STORE_ITEM_UPDATE_DEEP_FAIL],
    key: key,
    promise: function promise(_ref6) {
      var client = _ref6.client;
      return client.put(path + '/' + id, {
        data: params
      });
    },
    payload: params,
    pathDeep: pathDeep,
    cb: cb
  };
}

function destroyDeep(key, path, id, params, pathDeep, cb) {
  return {
    types: [constants.STORE_ITEM_DELETE_DEEP, constants.STORE_ITEM_DELETE_DEEP_SUCCESS, constants.STORE_ITEM_DELETE_DEEP_FAIL],
    key: key,
    promise: function promise(_ref7) {
      var client = _ref7.client;
      return client.del(path + '/' + id, {
        data: params
      });
    },
    payload: params,
    pathDeep: pathDeep,
    cb: cb
  };
}

function createDeep(key, path, params, pathDeep) {
  return {
    types: [constants.STORE_ITEM_CREATE_DEEP, constants.STORE_ITEM_CREATE_DEEP_SUCCESS, constants.STORE_ITEM_CREATE_DEEP_FAIL],
    key: key,
    promise: function promise(_ref8) {
      var client = _ref8.client;
      return client.post(path, {
        data: params
      });
    },
    pathDeep: pathDeep
  };
}

function create(key, path, params) {
  return {
    types: [constants.STORE_ITEM_CREATE, constants.STORE_ITEM_CREATE_SUCCESS, constants.STORE_ITEM_CREATE_FAIL],
    key: key,
    promise: function promise(_ref9) {
      var client = _ref9.client;
      return client.post(path, {
        data: params
      });
    },
    payload: params
  };
}

function post(key, path, params) {
  return {
    types: [constants.STORE_ITEM_CREATE, constants.STORE_ITEM_CREATE_SUCCESS, constants.STORE_ITEM_CREATE_FAIL],
    key: key,
    promise: function promise(_ref10) {
      var client = _ref10.client;
      return client.post(path, {
        data: params
      });
    },
    payload: params
  };
}

function loadItem(key, path, id, params) {
  return {
    types: [constants.STORE_ITEM_LOAD, constants.STORE_ITEM_LOAD_SUCCESS, constants.STORE_ITEM_LOAD_FAIL],
    key: key,
    promise: function promise(_ref11) {
      var client = _ref11.client;
      return client.get(path + '/' + id, {
        params: _extends({}, params)
      });
    }
  };
}

function destroyItem(key, path, id) {
  return {
    types: [constants.STORE_ITEM_DELETE, constants.STORE_ITEM_DELETE_SUCCESS, constants.STORE_ITEM_DELETE_FAIL],
    key: key,
    promise: function promise(_ref12) {
      var client = _ref12.client;
      return client.del(path + '/' + id);
    }
  };
}

function setPropertyItem(key, path, id, props) {
  return {
    types: [constants.STORE_ITEM_PROPERTY, constants.STORE_ITEM_PROPERTY_SUCCESS, constants.STORE_ITEM_PROPERTY_FAIL],
    key: key,
    props: props,
    promise: function promise(_ref13) {
      var client = _ref13.client;
      return client.post(path + '/' + id);
    }
  };
}

function clearList(key) {
  return {
    type: constants.STORE_LIST_CLEAR,
    key: key
  };
}

function clearItem(key) {
  return {
    type: constants.STORE_ITEM_CLEAR,
    key: key
  };
}

function loadStackItem(key, path, id, params) {
  return {
    types: [constants.STORE_STACK_ITEM_LOAD, constants.STORE_STACK_ITEM_LOAD_SUCCESS, constants.STORE_STACK_ITEM_LOAD_FAILED],
    key: key,
    id: id,
    promise: function promise(_ref14) {
      var client = _ref14.client;
      return client.get(path, {
        params: _extends({}, params)
      });
    }
  };
}

function request(type, path, params) {
  return function (dispatch, state, client) {
    return client[type](path, {
      params: _extends({}, params)
    }).catch(function (Exception) {
      return alert(Exception.message);
    });
  };
}

function clearStackItem(key, id) {
  return {
    type: constants.STORE_STACK_ITEM_CLEAR,
    key: key,
    id: id
  };
}

function clearNetworkState(key) {
  return {
    type: constants.STORE_ITEM_CLEAR_NETWORK_STATE,
    key: key
  };
}

function isAllLoaded(key, globalState) {
  return (0, _get3.default)(globalState, [constants.reducerIndex, key, 'allStatus', 'success'], false);
}

function isLoaded(key, globalState, params) {
  return (0, _get3.default)(globalState, [constants.reducerIndex, key, 'success'], false) === true && parseInt((0, _get3.default)(globalState, [constants.reducerIndex, key, 'list', 'current_page'], 1), 10) === parseInt((0, _get3.default)(params, 'page', 1), 10);
}

function isLoadedSimple(key, globalState, path) {
  var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  return (0, _get3.default)(globalState, [constants.reducerIndex, key, 'success'], false) === true && (0, _get3.default)(globalState, [constants.reducerIndex, key, 'path'], null) === path && (0, _isEqual3.default)((0, _get3.default)(globalState, [constants.reducerIndex, key, 'params'], null), params);
}

function isLoadedItem(key, globalState, id) {
  return globalState[constants.reducerIndex] && globalState[constants.reducerIndex][key] && globalState[constants.reducerIndex][key][constants.reducerItem] && (globalState[constants.reducerIndex][key][constants.reducerItem].id && parseInt(globalState[constants.reducerIndex][key][constants.reducerItem].id, 10) === parseInt(id, 10) || globalState[constants.reducerIndex][key][constants.reducerItem].data && globalState[constants.reducerIndex][key][constants.reducerItem].data.id && parseInt(globalState[constants.reducerIndex][key][constants.reducerItem].data.id, 10) === parseInt(id, 10));
}

function isLoadedItemByString(key, globalState, id) {
  return globalState[constants.reducerIndex] && globalState[constants.reducerIndex][key] && globalState[constants.reducerIndex][key][constants.reducerItem] && (String(globalState[constants.reducerIndex][key][constants.reducerItem].id) === String(id) || globalState[constants.reducerIndex][key][constants.reducerItem].failed === true);
}