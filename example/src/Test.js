import React from 'react';
import {Message} from 'sprakjs';

export default () => (
  <div>
    <p>Hello there!</p>
    <Message
      id="welcome"
      defaultMessage={`
        Hello {name}, you have {unreadCount, number} {unreadCount, plural,
        one {message}
        other {messages}
      }`}
      values={{name: 'Max', unreadCount: 10}}
    />
  </div>
);
