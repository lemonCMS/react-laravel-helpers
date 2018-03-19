import PropTypes from 'prop-types';
import _get from 'lodash/get';
import React from 'react';
import {post, update, clearNetworkState} from '../redux/store/actions';

class TestComponent extends React.Component {

  constructor(key, path) {
    super();
    this.edit = this.edit.bind(this);
    this.handleSubmit = this.onSubmit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.key = key;
    this.path = path;
  }

  static contextTypes = {
    'router': PropTypes.object
  };

  componentWillMount() {
    this.setState({
      edit: this.props.routing.history.pathname.match(/(edit|confirm|close)$/g),
      confirm: this.props.routing.history.pathname.match(/confirm$/g),
      close: this.props.routing.history.pathname.match(/close/g),
      newItem: this.props.routing.history.pathname.match(/new/g)
    });
  }

  componentWillReceiveProps(nextProps) {
    const thisProps = JSON.parse(JSON.stringify(this.props));
    const nProps = JSON.parse(JSON.stringify(nextProps));
    this.setState({
      edit: nextProps.routing.history.pathname.match(/edit$/g),
      newItem: nextProps.routing.history.pathname.match(/new/g)
    }, () => {
      if (!!this.state.newItem &&
        _get(thisProps, 'item.actionStatus.success', false) === false &&
        _get(nProps, 'item.actionStatus.success', false) === true) {
        this.context.router.history.push(`${this.path}/${this.props.item.id}/edit`);
      }
    });
  }

  componentWillUnmount() {
    this.props.dispatch(clearNetworkState(this.key));
  }

  onSubmit = async (payload) => {
    return new Promise((resolve) => {
      let promise = null;
      if (this.state.edit) {
        promise = this.context.store.dispatch(post(this.key, `/admin/${this.key}`, payload));
      } else {
        promise = this.context.store.dispatch(update(this.key, `/admin/${this.key}`, this.props.params.id, payload));
      }

      promise.then((ret) => {
        if (ret && ret.hasOwnProperty('error')) {
          resolve(ret.error);
        }
        resolve();
      }).catch((err) => {
        if (err && err.hasOwnProperty('error')) {
          resolve(err.error);
        }
        resolve(err);
      });
    });
  };

  edit() {
    this.context.router.push(`${this.path}/${this.props.params.id}/edit`);
  }

  render() {
    return (<div>Please implement render method in own class.</div>);
  }

}

TestComponent.propTypes = {
  'dispatch': PropTypes.func,
  'item': PropTypes.object,
  'params': PropTypes.object,
  'routing': PropTypes.object
};
TestComponent.defaultProps = {};

export default TestComponent;
