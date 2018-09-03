import React from 'react';
import {withLanguage} from 'sprakjs';

const Button = withLanguage('title')(({title}) => (
  <button type="button" onClick={() => alert("You pressed me!")}>
    {title}
  </button>
))

export default () => (
  <div>
    <p>Hello there again!</p>
    <Button id="welcome-button" defaultMessage="This is the button text now!" />
  </div>
);
