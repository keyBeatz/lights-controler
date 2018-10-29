/**
 * Login
 */
export function loggedInSuccessfullyNotification() {
  return {
    'type': 'success',
    'messageType': 'login',
    'message': 'loggedInSuccessfully',
  };
}

export function loginErrorNotification() {
  return {
    'type': 'danger',
    'messageType': 'login',
    'message': 'loginError',
  };
}

/**
 * Lights
 */
export function loadingServiceCharacteristicsErrorNotification({ serviceName, }) {
  return {
    'type': 'danger',
    'messageType': 'lights',
    'message': 'loadingServiceCharacteristicsError',
    'messageValues': {serviceName,},
  };
}

/**
 * Characteristics
 */
export function characteristicsSetSuccessfullyNotification() {
  return {
    'type': 'success',
    'messageType': 'characteristics',
    'message': 'characteristicsSetSuccessfully',
  };
}

export function characteristicsSetErrorNotification() {
  return {
    'type': 'danger',
    'messageType': 'characteristics',
    'message': 'characteristicsSetError',
  };
}

/**
 * Services
 */
export function servicesFetchErrorNotification() {
  return {
    'type': 'danger',
    'messageType': 'services',
    'message': 'servicesFetchError',
  };
}