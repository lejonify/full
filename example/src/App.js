import React from 'react';
import {init, Provider, Consumer} from 'sprakjs';
import Test from './Test';
import Test2 from './Test2';

const core = init({
  live: true,
  language: 'sv',
  projectId: '-LLFSvFyB6ugjlrWgf6y',
});

export default () => (
  <Provider core={core}>
    <Consumer>
      {context => (
        <React.Fragment>
          <button
            disabled={context.language === 'en'}
            type="button"
            onClick={() => context.setLanguage('en')}>
            Engelska
          </button>
          <button
            disabled={context.language === 'sv'}
            type="button"
            onClick={() => context.setLanguage('sv')}>
            Svenska
          </button>
        </React.Fragment>
      )}
    </Consumer>
    <Test />
    <Test2 />
  </Provider>
);
