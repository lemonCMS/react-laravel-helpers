import PropTypes from 'prop-types';
import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import Qs from 'qs';
import {storeState} from '../redux/routeState/actions';

let myTimeout = null;

export function createAllParamsForFetch(state) {
  const pathname = state.routing.locationBeforeTransitions.pathname;
  const params = _.assign(
    _.get(state, ['routesState', 'routes', pathname], {}),
    Qs.parse(_.get(state, ['routing', 'locationBeforeTransitions', 'search'], {}).substr(1))
  );

  return _.omit(params, (value) => {
    return !value;
  });
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
      'routing': state.routing,
      'routesState': state.routesState
    }))
    class StateConnection extends Component {
      static propTypes = {
        'routing': PropTypes.object,
        'dispatch': PropTypes.func
      };

      static contextTypes = {
        'router': PropTypes.object
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
          mount: {},
          skip: true
        };
      }

      stringifyFullState(state) {
        return Qs.stringify(_.omit(state, (value) => {
          return !value;
        }), {encode: false});
      }

      componentWillMount() {
        const params = createAllParamsForFetch(this.props);
        this.setState({form: _.clone(params), mount: _.clone(params)});
      }

      componentWillReceiveProps(nextProps) {
        if (this.props.routing.locationBeforeTransitions.pathname === nextProps.routing.locationBeforeTransitions.pathname) {
          if (!_.isEqual(this.state, nextProps.routing.locationBeforeTransitions.state)) {
            if (_.isObject(nextProps.routing.locationBeforeTransitions.state)) {
              this.props.dispatch(storeState(nextProps.routing.locationBeforeTransitions.pathname, nextProps.routing.locationBeforeTransitions.state));
              this.setState(nextProps.routing.locationBeforeTransitions.state);
            } else if (!_.isEmpty(this.state.mount)
              && !_.isEqual(this.state.mount, this.state.form)) {
              this.props.dispatch(storeState(this.props.routing.locationBeforeTransitions.pathname, this.state.mount));
              this.setState({form: this.state.mount});
            }
          }
        }
      }

      reset() {
        this.setState({form: {}}, this.pushStateAttempt);
      }

      onStack(key: string, value) {
        return (!!this.state.form[key] && this.state.form[key].indexOf(String(value)) > -1);
      }

      getParams() {
        return createAllParamsForFetch(this.props);
      }

      inputOnStack(key: string) {
        return (this.state.form[key] ? this.state.form[key] : '');
      }

      sortOnStack(field) {
        const state = Object.assign({}, this.state.form);

        if (_.has(state, 'sort')) {
          if (_.get(state, 'sort.field') === field && _.get(state, 'sort.order') === 'asc') {
            state.sort = {
              'field': field,
              'order': 'desc'
            };
          } else {
            state.sort = {
              'field': field,
              'order': 'asc'
            };
          }
        } else {
          state.sort = {
            'field': field,
            'order': 'asc'
          };
        }
        this.setState({'form': state}, this.pushStateAttempt);
      }

      toggleOnStack(key: string, value) {
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
        this.setState({'form': state, skip: true}, this.pushStateAttempt);
      }

      removeFromState(key: string) {
        const state = Object.assign({}, this.state.form);
        delete state[key];
        this.setState({'form': state, skip: true}, this.pushStateAttempt);
      }

      pushOnState(key: string, value, clear = []) {
        const state = Object.assign({}, this.state.form);
        state[key] = value;
        if (state.page) {
          state.page = null;
        }

        if (Object.keys(clear).length > 0) {
          _.map(clear, (field) => {
            state[field] = undefined;
          });
        }

        this.setState({'form': state, skip: true}, this.pushStateAttempt);
      }

      pushStateAttempt() {

        if (path === null) {
          path = _.get(this.props.routing, 'locationBeforeTransitions.pathname');
        }

        this.props.dispatch(storeState(path, this.state.form));
        const q = this.stringifyFullState(_.omit(this.state.form, ['t']));
        if (q.length > 0) {
          // this.context.router.push(_.get(this.props.routing, 'locationBeforeTransitions.pathname') + '?' + q);
          this.context.router.push({
            pathname: path,
            query: _.omit(this.state.form, ['t']),
            state: this.state
          });
        } else {
          const d = new Date();
          this.context.router.push({
            pathname: path,
            query: {t: d.getTime()},
            state: this.state
          });
        }
      }

      switchPage(page: number) {
        const state = Object.assign({}, this.state.form);
        state.page = page;
        this.setState({form: state}, this.pushStateAttempt);
      }

      pushSearch(value) {
        const form = this.state.form;
        form.q = value;
        this.setState({
          form: form,
          skip: false
        }, () => {
          if (myTimeout) {
            clearTimeout(myTimeout);
          }
          myTimeout = setTimeout(() => {
            this.pushOnState('q', value);
          }, 500);
        });
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
                <div className="row">
                  {_.map(range, (val, key) => {
                    return this.alphaFilter(name, key, val, stack);
                  })}
                </div>
              </div>
            </div>
          </div>);
      }

      alphaFilter(name, key, item, stack) {
        if (stack === item) {
          return (
            <button
              key={key}
              className={classNames({'btn': true, 'btn-link': true, 'filter-size-box': true, 'active': stack === item})}
              onClick={() => {
                this.removeFromState(name, item);
              }}>
              {item}
            </button>);
        }

        return (
          <button
            key={key}
            className={classNames({'btn': true, 'btn-link': true, 'filter-size-box': true, 'active': stack === item})}
            onClick={() => {
              this.pushOnState(name, item);
            }}>
            {item}
          </button>
        );
      }

      render() {
        return (<WrappedComponent
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
        />);
      }
    }

    return StateConnection;
  };
}
