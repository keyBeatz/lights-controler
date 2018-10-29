import {takeLatest, call, put, select, take,} from 'redux-saga/effects';
import {eventChannel,} from 'redux-saga'
import {
  CHARACTERISTICS_IS_ON,
  FETCH_CHARACTERISTICS_FOR_SERVICES_ASYNC_ACTION,
  FETCH_SERVICES_ASYNC_ACTION,
  LOGIN_ASYNC_ACTION, SERVICE_TYPE_LIGHT, SUBSCRIBE_FOR_NOTIFICATIONS_ASYNC_ACTION,
  WRITE_VALUE_TO_CHARACTERISTICS_ASYNC_ACTION
} from "Constants/AppConstants";
import {toaster} from 'evergreen-ui';
import {
  fetchCharacteristicsForServicesAsyncAction,
  loginAction,
  setCharacteristicsForServicesAction,
  setServicesAction, subscribeForNotificationsAsyncAction,
} from "Actions/AppActions";
import ws from 'Utils/websockets';
import {apiUrl} from "Utils/settings";

/**
 * @param username
 * @param password
 * @returns {IterableIterator<*>}
 */
function* login({username, password}) {
  const response = yield call(fetch, apiUrl + '/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Cache': 'no-cache',
    },
    body: JSON.stringify({
      user: username,
      password,
    }),
    credentials: 'include',
  });

  if (response.status === 200) {
    toaster.success('Byli jste úspěšně přihlášení!');
    yield put(loginAction(username));
  } else {
    toaster.warning('Nesprávné přihlašovací údaje :(');
  }
  yield call(console.log, response);
}

function* fetchServices() {

  const response = yield call(fetch, apiUrl + '/services', {
    method: 'GET',
    headers: {
      'Cache': 'no-cache',
    },
    credentials: 'include',
  });

  if (response.status !== 200) {
    toaster.warning('Načítání dat selhalo');
    return;
  }
  const jsonBody = yield call(() => response.json());


  let output = {};
  jsonBody.forEach((service) => {
    if (service.type === 'light') {
      output[service.name] = {
        id: 'app.components.LightsList.' + service.name,
        defaultMessage: '',
      }
    }
  });

  yield put(setServicesAction(jsonBody));
  yield put(subscribeForNotificationsAsyncAction({
    serviceType: SERVICE_TYPE_LIGHT,
    characteristic: CHARACTERISTICS_IS_ON,
  }));
  yield put(fetchCharacteristicsForServicesAsyncAction({
    serviceType: SERVICE_TYPE_LIGHT,
    characteristic: CHARACTERISTICS_IS_ON,
  }));
}

/**
 * @param serviceType - optional
 * @param characteristic
 * @returns {IterableIterator<*>}
 */
function* fetchCharacteristicsForServices({serviceType, characteristic,}) {
  let services = yield select(store => store.get('state').get('services'));

  if (serviceType !== undefined) {
    services = services.filter(service => service.get('type') === serviceType).toList();
  }

  const results = {};

  for (let i = 0; i < services.size; i++) {
    const service = services.get(i);
    const serviceName = service.get('name');
    const response = yield call(fetch, `${apiUrl}/services/${serviceName}/characteristics/${characteristic}/value`, {
      method: 'GET',
      headers: {
        'Cache': 'no-cache',
      },
      credentials: 'include',
    });

    if (response.status !== 200) {
      toaster.warning(`Chyba při načítaní charakterstiky služby ${service}`);
    }
    const jsonBody = yield call(() => response.json());

    const value = jsonBody && jsonBody.value !== undefined ? jsonBody.value : null;

    if (value !== null) {
      results[serviceName] = {
        characteristic,
        value,
      }
    }
  }

  yield put(setCharacteristicsForServicesAction(results));
}

/**
 * @param service
 * @param characteristic
 * @param value
 * @returns {IterableIterator<*>}
 */
function* writeValueToCharacteristics({service, characteristic, value,}) {
  if (service === undefined) {
    throw new Error("Parameter service is required");
  }
  if (characteristic === undefined) {
    throw new Error("Parameter characteristic is required");
  }
  if (value === undefined) {
    throw new Error("Parameter value is required");
  }

  const response = yield call(fetch, `${apiUrl}/services/${service}/characteristics/${characteristic}/value`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Cache': 'no-cache',
    },
    body: JSON.stringify({
      value,
    }),
    credentials: 'include',
  });

  if (response.status === 200) {
    toaster.success(`Úspěšně nastaveno`);
  } else {
    toaster.success(`Chyba, zkuste to prosím znovu`);
  }
}

/**
 * @param serviceType - optional
 * @param characteristic
 * @returns {IterableIterator<*>}
 */
function* subscribeForNotifications({serviceType, characteristic,}) {
  let services = yield select(store => store.get('state').get('services'));

  if (serviceType !== undefined) {
    services = services.filter(service => service.get('type') === serviceType);
  }

  const subscribedCharacteristics = [];
  services.forEach((service) => {
    subscribedCharacteristics.push([
      service.get('name'), characteristic
    ]);
  });

  const message = {
    "message": "subscribe",
    "characteristics": subscribedCharacteristics,
  };

  ws.getWS().send(JSON.stringify(message));
}

function webSocketLoop() {

  return eventChannel(emitter => {
    /**
     * This subscriber is *global*, but currently used only for characteristics value updates
     */
    ws.subscribeForMessages(function (message) {
      const data = message && message.data ? JSON.parse(message.data) : null;
      if (!data) {
        return;
      }

      const characteristics = {};
      const serviceName = data.service || null;

      if (data.service === undefined) {
        console.warn("data.service cant be undefined");
        return;
      }
      if (data.characteristic === undefined) {
        console.warn("data.service cant be undefined");
        return;
      }
      if (data.service === undefined) {
        console.warn("data.service cant be undefined");
        return;
      }

      characteristics[serviceName] = {
        characteristic: data.characteristic,
        value: data.value,
      };

      emitter(setCharacteristicsForServicesAction(characteristics));
    });

    /**
     * In case of reconnect we gonna subscribe for notifications again and also fetch latest data to be up-to-date
     */
    ws.onopen = function () {
      emitter(subscribeForNotificationsAsyncAction({
        serviceType: SERVICE_TYPE_LIGHT,
        characteristic: CHARACTERISTICS_IS_ON,
      }));
      emitter(fetchCharacteristicsForServicesAsyncAction({
        serviceType: SERVICE_TYPE_LIGHT,
        characteristic: CHARACTERISTICS_IS_ON,
      }));
    };

    return () => {
    }
  })
}

export default function* rootSaga() {
  yield [
    takeLatest(LOGIN_ASYNC_ACTION, login),
    takeLatest(FETCH_SERVICES_ASYNC_ACTION, fetchServices),
    takeLatest(WRITE_VALUE_TO_CHARACTERISTICS_ASYNC_ACTION, writeValueToCharacteristics),
    takeLatest(FETCH_CHARACTERISTICS_FOR_SERVICES_ASYNC_ACTION, fetchCharacteristicsForServices),
    takeLatest(SUBSCRIBE_FOR_NOTIFICATIONS_ASYNC_ACTION, subscribeForNotifications),
  ];
  const channel = yield call(webSocketLoop);
  while (true) {
    const action = yield take(channel);
    yield put(action)
  }
}
