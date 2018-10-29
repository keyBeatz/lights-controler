/**
 *
 * AppMessages
 *
 */

import React from 'react';
import {injectIntl} from 'react-intl';

import translations from './messages';
import PropTypes from 'prop-types';
import {toaster} from 'evergreen-ui';
import NotificationDispatcher from 'utils/NotificationDispatcher';


class Notification extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      messages: {},
    }
  }

  componentDidMount() {
    this.unsubscribe = NotificationDispatcher.subscribe(this.onNewMessage);
  }

  componentWillUnmount() {
    NotificationDispatcher.unsubscribe(this.unsubscribe);
  }

  onNewMessage = (notification) => {
    const { type, messageType, message, messageValues, } = notification;
    const { messages, } = this.state;

    if( toaster[type] === undefined ) {
      console.log( "message", message );
      throw new Error(`The type ${type} is invalid.`);
    }

    if(typeof messages[messageType] === 'function') {
      messages[messageType]();
      messages[messageType] = null;
    }

    if(translations[message] === undefined) {
      throw new Error(`Translation string for message ${message} is missing.`);
    }

    messages[messageType] = toaster[type](this.props.intl.formatMessage(translations[message], messageValues));

    this.setState({
      messages,
    });
  };

  render() {
    return '';
  }
}

Notification.propTypes = {
  intl: PropTypes.object, // provided by injectIntl decorator
};

export default injectIntl(Notification);
