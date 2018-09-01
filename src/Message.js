/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {Consumer} from './context';

export default class Message extends React.Component {
  static defaultProps = {
    values: {},
    defaultMessage: 'No message found',
  };
  render() {
    return (
      <Consumer>
        {context =>
          context.message(
            this.props.id.replace(/\//g, '-'),
            this.props.values,
            this.props.defaultMessage,
          )
        }
      </Consumer>
    );
  }
}
