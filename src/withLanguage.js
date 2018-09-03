import React from 'react';
import {Consumer} from './context';

const withLanguage = toProp => WrappedComponent => props => (
  <Consumer>
    {context => {
      const {values, defaultMessage, id, ...restProps} = props;
      const message = context.message(
        id.replace(/\//g, '-'),
        values,
        defaultMessage,
      );
      const toPropObject = {
        [toProp]: message,
      };
      return <WrappedComponent {...restProps} {...toPropObject} />;
    }}
  </Consumer>
);

export default withLanguage;
