import {fromJS, Map} from "immutable";
import {LOGIN_ACTION, SET_CHARACTERISTICS_FOR_SERVICES_ACTION, SET_SERVICES_ACTION} from "Constants/AppConstants";

const initialState = fromJS({
  user: {
    loggedIn: false,
    username: null,
  },
  services: {},
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN_ACTION: {
    return state.set('user', state.get('user').set('loggedIn', true).set('username', action.username));
  }
  case SET_SERVICES_ACTION: {
    return state.set('services', Map( action.services.map( service => [ service.name, fromJS(service) ] ) ));
  }
  case SET_CHARACTERISTICS_FOR_SERVICES_ACTION: {

    let services = state.get('services');

    Object.keys(action.characteristics).forEach((serviceName) => {
      const value = action.characteristics[serviceName];


      if(!services.has(serviceName)) {
        return;
      }
      if(value.characteristic === undefined) {
        console.warn('value.characteristic is not set');
        return;
      }
      if(value.value === undefined) {
        console.warn('value.value is not set');
        return;
      }
      services = services.setIn([serviceName, 'values', value.characteristic], value.value)
    });

    return state.set('services', services);
  }
  default:
    return state;
  }
};

export default reducer;
