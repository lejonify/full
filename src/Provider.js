import React, {Component} from 'react';
import {Provider} from './context';

export default class LanguageProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: props.core.options.language,
    };
    props.core.addListener(() => {
      // HACK: Trigger re-render
      this.setState(({language}) => ({language}));
    });
  }
  setLanguage(language) {
    this.props.core.setLanguage(language);
    this.setState({
      language,
    });
  }
  render() {
    return (
      <Provider
        value={{
          language: this.state.language,
          setLanguage: language => this.setLanguage(language),
          message: (...props) => this.props.core.translate(...props),
        }}>
        {this.props.children}
      </Provider>
    );
  }
}
