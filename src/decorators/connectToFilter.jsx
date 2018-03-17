import PropTypes from 'prop-types';
import _get from 'lodash/get';
import _assign from 'lodash/assign';
import _omit from 'lodash/omit';
import _has from 'lodash/has';
import _clone from 'lodash/clone';
import _isEqual from 'lodash/isEqual';
import _isObject from 'lodash/isObject';
import _isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import Qs from 'qs';
import {storeState} from '../redux/routeState/actions';

let myTimeout = null;

export function createAllParamsForFetch(state) {


  const pathname = _get(state, 'routing.location.pathname', null);
  const params = _assign(_get(state, ['routesState', 'routes', pathname, 'form'], {}), Qs.parse(_get(state, ['routing', 'location', 'search'], '').substr(1)));

  return _omit(params, value => !value);
}

export default function connectToFilter(rest) {
  let path = null;
  if (rest !== 'undefined') {
    if (typeof rest === 'object') {
      if (rest.path !== 'undefined') {
        path = rest.path;
      }
    }
  }

  return (WrappedComponent) => {
    @connect(state => ({
      routing: state.routing,
      routesState: state.routesState
    }))
    class StateConnection extends Component {
      static propTypes = {
        routing: PropTypes.object,
        dispatch: PropTypes.func
      };

      static contextTypes = {
        router: PropTypes.object
      };

      constructor() {
        super();
        this.switchPage = this.switchPage.bind(this);
        this.pushOnState = this.pushOnState.bind(this);
        this.pushStateAttempt = this.pushStateAttempt.bind(this);
        this.pushSearch = this.pushSearch.bind(this);
        this.clearTimer = this.clearTimer.bind(this);
        this.getParams = this.getParams.bind(this);
        this.toggleOnStack = this.toggleOnStack.bind(this);
        this.inputOnStack = this.inputOnStack.bind(this);
        this.onStack = this.onStack.bind(this);
        this.sortOnStack = this.sortOnStack.bind(this);
        this.removeFromState = this.removeFromState.bind(this);
        this.alphabet = this.alphabet.bind(this);
        this.alphaFilter = this.alphaFilter.bind(this);
        this.reset = this.reset.bind(this);
        this.state = {
          form: {},
          mount: {}
        };
      }

      stringifyFullState(state) {
        return Qs.stringify(_omit(state, value => !value), {encode: false});
      }

      componentWillMount() {
        const params = createAllParamsForFetch(this.props);
        this.setState({form: _clone(params), mount: _clone(params)});
      }

      componentWillReceiveProps(nextProps) {
        if (this.props.routing.location.pathname === nextProps.routing.location.pathname) {
          if (!_isEqual(this.state, nextProps.routing.location.state)) {
            if (_isObject(nextProps.routing.location.state)) {
              this.props.dispatch(storeState(nextProps.routing.location.pathname, nextProps.routing.location.state));
              this.setState(nextProps.routing.location.state);
            } else if (!_isEmpty(this.state.mount) && !_isEqual(this.state.mount, this.state.form)) {
              this.props.dispatch(storeState(this.props.routing.location.pathname, this.state.mount));
              this.setState({form: this.state.mount});
            }
          }
        }
      }

      reset() {
        this.setState({form: {}}, this.pushStateAttempt);
      }

      onStack(key, value) {
        return !!this.state.form[key] && this.state.form[key].indexOf(String(value)) > -1;
      }

      getParams() {
        return createAllParamsForFetch(this.props);
      }

      inputOnStack(key) {
        return this.state.form[key] ? this.state.form[key] : '';
      }

      sortOnStack(field) {
        const state = Object.assign({}, this.state.form);

        if (_has(state, 'sort')) {
          if (_get(state, 'sort.field') === field && _get(state, 'sort.order') === 'asc') {
            state.sort = {
              field,
              order: 'desc'
            };
          } else {
            state.sort = {
              field,
              order: 'asc'
            };
          }
        } else {
          state.sort = {
            field,
            order: 'asc'
          };
        }
        this.setState({form: state}, this.pushStateAttempt);
      }

      toggleOnStack(key, value) {
        const state = Object.assign({}, this.state.form);

        if (!state[key]) {
          state[key] = [value];
        } else {
          const index = state[key].indexOf(String(value));
          if (index < 0) {
            state[key].push(value);
          } else {
            delete state[key][index];
          }
        }
        if (state.page) {
          state.page = null;
        }
        this.setState({form: state}, this.pushStateAttempt);
      }

      removeFromState(key) {
        const state = Object.assign({}, this.state.form);
        delete state[key];
        this.setState({form: state}, this.pushStateAttempt);
      }

      pushOnState(key, value, clear = []) {
        const state = Object.assign({}, this.state.form);
        state[key] = value;
        if (state.page) {
          state.page = null;
        }

        if (Object.keys(clear).length > 0) {
          _map(clear, (field) => {
            state[field] = undefined;
          });
        }

        this.setState({form: state}, this.pushStateAttempt);
      }

      pushStateAttempt() {
        if (path === null) {
          path = _get(this.props.routing, 'location.pathname');
        }

        this.props.dispatch(storeState(path, this.state.form));
        const q = this.stringifyFullState(_omit(this.state.form, ['t']));
        if (q.length > 0) {
          // this.context.router.history.push(_get(this.props.routing, 'location.pathname') + '?' + q);
          this.context.router.history.push({
            pathname: path,
            search: Qs.stringify(_omit(this.state.form, ['t'])),
            state: this.state
          });
        } else {
          const d = new Date();
          this.context.router.history.push({
            pathname: path,
            search: Qs.stringify({t: d.getTime()}),
            state: this.state
          });
        }
      }

      switchPage(page) {
        const state = Object.assign({}, this.state.form);
        state.page = page;
        this.setState({form: state}, this.pushStateAttempt);
      }

      pushSearch(value) {
        const form = this.state.form;
        form.q = value;
        this.setState(
          {
            form
          },
          () => {
            if (myTimeout) {
              clearTimeout(myTimeout);
            }
            myTimeout = setTimeout(() => {
              this.pushOnState('q', value);
            }, 500);
          }
        );
      }

      clearTimer() {
        if (myTimeout) {
          clearTimeout(myTimeout);
        }
      }

      alphabet() {
        const stack = this.inputOnStack('alfa');
        const name = 'alfa';
        const range = ['~', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        return (
          <div className="panel panel-border-tb">
            <div className="panel-heading">
              <h4 className="pnael-title">Alfabet</h4>
            </div>
            <div className="panel-body">
              <div className="filter-color-container">
                <div className="row">{_map(range, (val, key) => this.alphaFilter(name, key, val, stack))}</div>
              </div>
            </div>
          </div>
        );
      }

      alphaFilter(name, key, item, stack) {
        if (stack === item) {
          return (
            <button
              key={key}
              className={classNames({
                btn: true,
                'btn-link': true,
                'filter-size-box': true,
                active: stack === item
              })}
              onClick={() => {
                this.removeFromState(name, item);
              }}
            >
              {item}
            </button>
          );
        }

        return (
          <button
            key={key}
            className={classNames({
              btn: true,
              'btn-link': true,
              'filter-size-box': true,
              active: stack === item
            })}
            onClick={() => {
              this.pushOnState(name, item);
            }}
          >
            {item}
          </button>
        );
      }

      render() {
        return (
          <WrappedComponent
            {...this.props}
            switchPage={this.switchPage}
            pushOnState={this.pushOnState}
            removeFromState={this.removeFromState}
            getParams={this.getParams}
            toggleOnStack={this.toggleOnStack}
            inputOnStack={this.inputOnStack}
            onStack={this.onStack}
            sortOnStack={this.sortOnStack}
            alphabet={this.alphabet}
            pushSearch={this.pushSearch}
            pushStateAttempt={this.pushStateAttempt}
            reset={this.reset}
          />
        );
      }
    }

    return StateConnection;
  };
}
