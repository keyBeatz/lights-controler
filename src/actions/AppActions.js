import {
  FETCH_CHARACTERISTICS_FOR_SERVICES_ASYNC_ACTION,
  FETCH_SERVICES_ASYNC_ACTION,
  LOGIN_ACTION,
  LOGIN_ASYNC_ACTION, SET_CHARACTERISTICS_FOR_SERVICES_ACTION,
  SET_SERVICES_ACTION, SUBSCRIBE_FOR_NOTIFICATIONS_ASYNC_ACTION, WRITE_VALUE_TO_CHARACTERISTICS_ASYNC_ACTION
} from "Constants/AppConstants";

export function loginAction(username) {
  return {
    type: LOGIN_ACTION,
    username,
  }
}

export function loginAsyncAction(username, password) {
  return {
    type: LOGIN_ASYNC_ACTION,
    username, password,
  }
}

export function fetchServicesAsyncAction() {
  return {
    type: FETCH_SERVICES_ASYNC_ACTION,
  }
}

export function setServicesAction(services) {
  return {
    type: SET_SERVICES_ACTION,
    services,
  }
}

export function writeValueToCharacteristicsAsyncAction({service, characteristic, value,}) {
  return {
    type: WRITE_VALUE_TO_CHARACTERISTICS_ASYNC_ACTION,
    service, characteristic, value,
  }
}

export function fetchCharacteristicsForServicesAsyncAction({serviceType, characteristic,}) {
  return {
    type: FETCH_CHARACTERISTICS_FOR_SERVICES_ASYNC_ACTION,
    serviceType, characteristic,
  }
}

/**
 *
 * @param characteristics - format {serviceName: {characteristic, value}, serviceName2: {characteristic, value}}
 * @returns {{type: string, characteristics: *}}
 */
export function setCharacteristicsForServicesAction(characteristics) {
  return {
    type: SET_CHARACTERISTICS_FOR_SERVICES_ACTION,
    characteristics,
  }
}

export function subscribeForNotificationsAsyncAction({serviceType, characteristic,}) {
  return {
    type: SUBSCRIBE_FOR_NOTIFICATIONS_ASYNC_ACTION,
    serviceType, characteristic,
  }
}