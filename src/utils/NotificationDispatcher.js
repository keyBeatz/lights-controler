class NotificationDispatcher {
  static eventNameNotifications = 'NotificationDispatcher/notification';

  constructor() {
    this.messages = {};
    this.onMessage = [];
    this.allowedTypes = ['success', 'warning', 'danger', 'notify'];
  }

  subscribe(userCallback) {
    const eventCallback = function( e ) {
      if( typeof userCallback === "function" ) {
        let data = e.detail || {};
        userCallback( data, e );
      } else {
        throw new Error(`Subscribe callback must be typeof function. Typeof ${typeof userCallback} provided instead.`)
      }
    };

    window.addEventListener( NotificationDispatcher.eventNameNotifications, eventCallback );
    return eventCallback;
  }

  unsubscribe(callback) {
    window.removeEventListener( NotificationDispatcher.eventNameNotifications, callback );
  }

  dispatch(notification) {
    if(!notification) {
      throw new Error('The notification parameter can not be empty');
    }
    const {type, messageType, message,} = notification;
    if(!type) {
      throw new Error("The notification.messageType property must be set in notification");
    }
    if(this.allowedTypes.indexOf(type) === -1) {
      throw new Error(`The action.type property ${type} is not allowed. Allowed types are ${this.allowedTypes.join(', ')}`);
    }
    if(!messageType) {
      throw new Error("The notification.messageType property must be set in notification");
    }
    if(!message) {
      throw new Error("The notification.message property must be set in notification");
    }

    const event = new CustomEvent( NotificationDispatcher.eventNameNotifications, { detail: notification, } );
    window.dispatchEvent( event );
  }
}

const AppMessageDispatcherInstance = new NotificationDispatcher;
export default AppMessageDispatcherInstance;