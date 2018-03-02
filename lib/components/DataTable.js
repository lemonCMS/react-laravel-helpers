'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _has2 = require('lodash/has');

var _has3 = _interopRequireDefault(_has2);

var _map2 = require('lodash/map');

var _map3 = _interopRequireDefault(_map2);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _compact2 = require('lodash/compact');

var _compact3 = _interopRequireDefault(_compact2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _Paginator = require('./Paginator');

var _Paginator2 = _interopRequireDefault(_Paginator);

var _moment = require('../utils/moment');

var _moment2 = _interopRequireDefault(_moment);

var _numeral = require('../utils/numeral');

var _numeral2 = _interopRequireDefault(_numeral);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataTable = (_temp = _class = function (_Component) {
  _inherits(DataTable, _Component);

  function DataTable() {
    _classCallCheck(this, DataTable);

    var _this = _possibleConstructorReturn(this, (DataTable.__proto__ || Object.getPrototypeOf(DataTable)).call(this));

    _this.renderRows = _this.renderRows.bind(_this);
    _this.renderCols = _this.renderCols.bind(_this);
    _this.renderRecords = _this.renderRecords.bind(_this);
    _this.renderRecordCols = _this.renderRecordCols.bind(_this);
    _this.renderRecordRows = _this.renderRecordRows.bind(_this);
    _this.renderDropDownItems = _this.renderDropDownItems.bind(_this);
    _this.renderPaginator = _this.renderPaginator.bind(_this);
    _this.getValue = _this.getValue.bind(_this);
    _this.state = {
      orderCol: null,
      checked: []
    };
    return _this;
  }

  _createClass(DataTable, [{
    key: 'renderRows',
    value: function renderRows() {
      var _this2 = this;

      if ((0, _has3.default)(this.props, 'rows')) {
        return (0, _map3.default)(this.props.rows, function (row, key) {
          return _react2.default.createElement(
            'tr',
            { key: key },
            _this2.renderCols(row.cols)
          );
        });
      }

      return _react2.default.createElement(
        'tr',
        null,
        this.renderCols(this.props.cols)
      );
    }
  }, {
    key: 'renderCols',
    value: function renderCols(cols) {
      var _this3 = this;

      return (0, _map3.default)(cols, function (col, key) {
        var orderName = 'order-' + key;
        var dbCol = function dbCol(orderType) {
          if ((0, _has3.default)(col, 'show')) {
            if ((0, _isString3.default)(col.show)) {
              return col.show + orderType;
            }
            if ((0, _isArray3.default)(col.show)) {
              return (0, _get3.default)(col.show, [0]) + orderType;
            }
          }
        };

        var select1 = function select1() {
          var state = _this3.state;
          state[orderName] = 'A ... Z';
          state.orderCol = dbCol();
          _this3.setState(state, function () {
            _this3.props.pushOnState('order', dbCol('Asc'));
          });
        };

        var select2 = function select2() {
          var state = _this3.state;
          state[orderName] = 'Z ... A';
          state.orderCol = dbCol();
          _this3.setState(state, function () {
            _this3.props.pushOnState('order', dbCol('Desc'));
          });
        };

        var filter = function filter(value) {
          var state = _this3.state;
          state[(0, _get3.default)(col, 'show')] = value;
          _this3.setState(state, function () {
            _this3.props.pushOnState((0, _get3.default)(col, 'show'), value);
          });
        };

        var title = function title() {
          if ((0, _get3.default)(col, 'filterBy', false) !== false) {
            var onStack = _this3.props.inputOnStack((0, _get3.default)(col, 'show'));
            if (onStack) {
              return (0, _get3.default)(col, 'filterBy[' + onStack + '].desc', '');
            }

            if (_this3.state[(0, _get3.default)(col, 'show')]) {
              return (0, _get3.default)(col, 'filterBy[' + _this3.state[(0, _get3.default)(col, 'show')] + '].desc', '');
            }
          }

          if (_this3.state.orderCol === dbCol()) {
            if ((0, _get3.default)(_this3.state, orderName)) {
              return _this3.state[orderName];
            }
          }

          if (_this3.state.orderCol === null) {
            if (dbCol('Asc') === (0, _get3.default)(_this3.props, 'order')) {
              return 'A ... Z';
            }

            if (dbCol('Desc') === (0, _get3.default)(_this3.props, 'order')) {
              return 'Z ... A';
            }
          }

          return (0, _get3.default)(col, 'name', '');
        };

        var filterBy = (0, _get3.default)(col, 'filterBy', false);
        if (filterBy !== false) {
          return _react2.default.createElement(
            'th',
            { key: key,
              width: (0, _get3.default)(col, 'width', 'auto'),
              colSpan: (0, _get3.default)(col, 'colSpan', '1') },
            _react2.default.createElement(
              _reactBootstrap.ButtonToolbar,
              null,
              _react2.default.createElement(
                _reactBootstrap.DropdownButton,
                { bsStyle: 'link',
                  title: title(),
                  id: 'dropdown-size-extra-small' + key },
                (0, _map3.default)((0, _get3.default)(col, 'filterBy', []), function (item, itemKey) {
                  return _react2.default.createElement(
                    _reactBootstrap.MenuItem,
                    {
                      key: itemKey,
                      eventKey: itemKey,
                      onSelect: function onSelect() {
                        filter(item.value);
                      } },
                    item.desc
                  );
                }),
                _react2.default.createElement(_reactBootstrap.MenuItem, { divider: true }),
                _react2.default.createElement(
                  _reactBootstrap.MenuItem,
                  {
                    eventKey: 999,
                    onSelect: function onSelect() {
                      filter('');
                    } },
                  'reset'
                )
              )
            )
          );
        }

        var order = (0, _get3.default)(col, 'order', false);
        if (order === true) {
          return _react2.default.createElement(
            'th',
            { key: key,
              width: (0, _get3.default)(col, 'width', 'auto'),
              colSpan: (0, _get3.default)(col, 'colSpan', '1') },
            _react2.default.createElement(
              _reactBootstrap.ButtonToolbar,
              null,
              _react2.default.createElement(
                _reactBootstrap.DropdownButton,
                { bsStyle: 'link',
                  title: title(),
                  id: 'dropdown-size-extra-small' + key },
                _react2.default.createElement(
                  _reactBootstrap.MenuItem,
                  { eventKey: '1',
                    onSelect: select1 },
                  'A ... Z'
                ),
                _react2.default.createElement(
                  _reactBootstrap.MenuItem,
                  { eventKey: '2',
                    onSelect: select2 },
                  'Z ... A'
                )
              )
            )
          );
        }

        return _react2.default.createElement(
          'th',
          { key: key,
            width: (0, _get3.default)(col, 'width', 'auto'),
            colSpan: (0, _get3.default)(col, 'colSpan', '1') },
          (0, _get3.default)(col, 'name', '')
        );
      });
    }
  }, {
    key: 'renderRecords',
    value: function renderRecords() {
      var _this4 = this;

      return (0, _map3.default)(this.props.records, function (record, key) {
        return _this4.renderRecordRows(key, record);
      });
    }
  }, {
    key: 'renderRecordRows',
    value: function renderRecordRows(key, record) {
      var _this5 = this;

      if ((0, _has3.default)(this.props, 'rows')) {
        return (0, _map3.default)(this.props.rows, function (row, keyRow) {
          return _react2.default.createElement(
            'tr',
            { key: key + '-' + keyRow,
              className: 'data-table-row' + keyRow },
            _this5.renderRecordCols(row.cols, record)
          );
        });
      }

      return _react2.default.createElement(
        'tr',
        { key: key },
        this.renderRecordCols(this.props.cols, record)
      );
    }
  }, {
    key: 'renderRecordCols',
    value: function renderRecordCols(cols, record) {
      var _this6 = this;

      return (0, _map3.default)(cols, function (col, key) {
        var value = _this6.getValue(record, col, key);
        return _react2.default.createElement(
          'td',
          { key: key,
            colSpan: (0, _get3.default)(col, 'colSpan', '1'),
            className: (0, _get3.default)(col, 'className', '') },
          value
        );
      });
    }
  }, {
    key: 'getValue',
    value: function getValue(record, col, key) {
      var _this7 = this;

      var cell = [];
      if ((0, _has3.default)(col, 'checkbox')) {
        var click = function click(event) {
          col.checkbox(event, record, _this7.props.dispatch);
        };
        return _react2.default.createElement('input', {
          key: 'checkbox' + record.id,
          type: 'checkbox',
          onChange: click,
          defaultChecked: (0, _get3.default)(record, (0, _get3.default)(col, 'show'), false)
        });
      }
      if ((0, _has3.default)(col, 'image')) {
        if ((0, _has3.default)(record, col.image)) {
          cell.push(_react2.default.createElement(_reactBootstrap.Image, { key: 'image',
            src: '/image/small/' + (0, _get3.default)(record, col.image),
            responsive: true,
            thumbnail: true }));
        }
      }

      if ((0, _has3.default)(col, 'text')) {
        cell.push(_react2.default.createElement(
          'span',
          { key: 'text',
            className: 'data-table-static-text' },
          col.text
        ));
      }

      if ((0, _has3.default)(col, 'edit')) {
        cell.push(_react2.default.createElement(
          'button',
          {
            className: 'btn btn-link',
            key: 'link',
            onClick: function onClick() {
              _this7.props.edit(record);
            } },
          (0, _get3.default)(record, col.show, '')
        ));
      } else if ((0, _has3.default)(col, 'link') && (0, _has3.default)(col, 'onClick')) {
        var _click = function _click(event) {
          event.preventDefault();
          col.onClick(record, _this7.props.auth, _this7.context.router);
        };
        cell.push(_react2.default.createElement(
          'button',
          { className: 'btn btn-link',
            key: 'link',
            onClick: _click },
          (0, _get3.default)(col, 'link')
        ));
      }

      if ((0, _has3.default)(col, 'array') && (0, _has3.default)(col, 'arrayShow') && (0, _has3.default)(col, 'onClick')) {
        (0, _map3.default)((0, _get3.default)(record, col.array, []), function (item, key2) {
          var show = '';
          if ((0, _isArray3.default)(col.arrayShow)) {
            (0, _map3.default)(col.arrayShow, function (arrayCol) {
              show = show.concat((0, _get3.default)(item, arrayCol, ''), ' ');
            });
            show.trim();
          } else {
            show = (0, _get3.default)(item, col.arrayShow, '');
          }

          cell.push(_react2.default.createElement(
            'button',
            { type: 'button',
              key: key2,
              className: 'btn btn-link',
              onClick: function onClick() {
                col.onClick(item);
              } },
            show
          ));
        });
      } else if ((0, _has3.default)(col, 'array') && (0, _has3.default)(col, 'arrayShow')) {
        (0, _map3.default)((0, _get3.default)(record, col.array, []), function (item) {
          cell.push(_react2.default.createElement(
            'span',
            null,
            (0, _get3.default)(item, col.arrayShow, '')
          ));
        });
      }

      if ((0, _has3.default)(col, 'show') && (0, _has3.default)(col, 'onClick')) {
        if (!(0, _isEmpty3.default)(record, col.show, '')) {
          var _click2 = function _click2(event) {
            event.preventDefault();
            col.onClick(record);
          };

          cell.push(_react2.default.createElement(
            'button',
            {
              className: 'btn btn-link',
              key: 'showClick',
              onClick: _click2 },
            (0, _get3.default)(record, col.show, '')
          ));
        }
      }

      if ((0, _has3.default)(col, 'show') && !(0, _has3.default)(col, 'onClick') && !(0, _has3.default)(col, 'edit')) {

        if ((0, _isString3.default)(col.show)) {
          if ((0, _has3.default)(col, 'translate')) {
            cell.push(_react2.default.createElement(
              'span',
              { key: '\'show\'' },
              (0, _get3.default)(col, ['translate', (0, _get3.default)(record, col.show, '')], '')
            ));
          } else if ((0, _has3.default)(col, 'append')) {
            if (!(0, _isEmpty3.default)(record, col.show, '')) {
              cell.push(_react2.default.createElement(
                'span',
                { key: '\'show\'' },
                (0, _get3.default)(record, col.show, 0) + (0, _get3.default)(col, 'append')
              ));
            }
          } else if ((0, _has3.default)(col, 'filter') && col.filter === 'numeral') {
            cell.push(_react2.default.createElement(
              'span',
              { key: '\'show\'' },
              (0, _numeral2.default)(Number((0, _get3.default)(record, col.show, 0))).format('$0.00')
            ));
          } else if ((0, _has3.default)(col, 'filter') && col.filter === 'date') {
            cell.push(_react2.default.createElement(
              'span',
              { key: '\'show\'' },
              (0, _moment2.default)((0, _get3.default)(record, col.show, '')).format('YYYY-MM-DD')
            ));
          } else if ((0, _has3.default)(col, 'filter') && col.filter === 'dateTime') {
            cell.push(_react2.default.createElement(
              'span',
              { key: '\'show\'' },
              (0, _moment2.default)((0, _get3.default)(record, col.show, '')).format('YYYY-MM-DD HH:mm')
            ));
          } else {
            cell.push(_react2.default.createElement(
              'span',
              { key: '\'show\'' },
              (0, _get3.default)(record, col.show, '')
            ));
          }
        } else if ((0, _isArray3.default)(col.show)) {
          var value = [];
          (0, _map3.default)(col.show, function (field) {
            value.push(_react2.default.createElement(
              'span',
              { key: '\'show\'' },
              (0, _get3.default)(record, field, '')
            ));
          });
          return cell.push(_react2.default.createElement(
            'span',
            { key: '\'show\'' },
            (0, _compact3.default)(value).join(' ')
          ));
        }
      }

      if ((0, _has3.default)(col, 'dropdownButton')) {
        var dropDownItems = this.renderDropDownItems((0, _get3.default)(col, 'dropdownButton'), record);
        cell.push(_react2.default.createElement(
          _reactBootstrap.DropdownButton,
          {
            key: 'dbbutton',
            bsStyle: 'default',
            bsSize: 'xsmall',
            title: col.name,
            id: 'dropDown' + key },
          dropDownItems
        ));
      }

      return cell;
    }
  }, {
    key: 'renderDropDownItems',
    value: function renderDropDownItems(buttons, record) {
      return (0, _map3.default)(buttons, function (button, key) {
        var click = function click() {
          if ((0, _has3.default)(button, 'onClick')) {
            button.onClick(record);
          }
        };

        if ((0, _has3.default)(button, 'divider')) {
          return _react2.default.createElement(_reactBootstrap.MenuItem, { key: key,
            divider: true });
        }

        return _react2.default.createElement(
          _reactBootstrap.MenuItem,
          { key: key,
            eventKey: key,
            onSelect: click },
          button.name
        );
      });
    }
  }, {
    key: 'renderPaginator',
    value: function renderPaginator() {
      var _props$paginator = this.props.paginator,
          currPage = _props$paginator.currPage,
          lastPage = _props$paginator.lastPage,
          onChange = _props$paginator.onChange;

      return _react2.default.createElement(_Paginator2.default, { currPage: currPage,
        lastPage: lastPage,
        onChange: onChange });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this8 = this;

      var noRecords = function noRecords() {
        if (_this8.props.records.length === 0) {
          return _react2.default.createElement(
            _reactBootstrap.Alert,
            { bsStyle: 'warning' },
            'No records found.'
          );
        }
      };

      var paged = !(0, _isEmpty3.default)(this.props.paginator) ? this.renderPaginator() : '';
      var rows = this.renderRows();
      var records = this.renderRecords();
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'table-responsive' },
          _react2.default.createElement(
            'table',
            { className: 'table table-bordered table-condensed table-data' },
            _react2.default.createElement(
              'thead',
              null,
              rows
            ),
            _react2.default.createElement(
              'tbody',
              null,
              records
            )
          )
        ),
        noRecords(),
        paged
      );
    }
  }]);

  return DataTable;
}(_react.Component), _class.propTypes = {
  records: _propTypes2.default.array.isRequired,
  cols: _propTypes2.default.array,
  rows: _propTypes2.default.array,
  paginator: _propTypes2.default.shape({
    currPage: _propTypes2.default.number,
    lastPage: _propTypes2.default.number,
    onChange: _propTypes2.default.func
  }),
  edit: _propTypes2.default.func,
  pushOnState: _propTypes2.default.func,
  dispatch: _propTypes2.default.func,
  inputOnStack: _propTypes2.default.func,
  auth: _propTypes2.default.object
}, _class.contextTypes = {
  router: _propTypes2.default.object.isRequired
}, _temp);
exports.default = DataTable;