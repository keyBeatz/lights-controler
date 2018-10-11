import 'core-js/shim';
import 'regenerator-runtime/runtime';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from 'redux/store';

import App from 'Containers/App';
import {IntlProvider} from 'react-intl';

render(
  <Provider store={store}>
    <IntlProvider locale={`en`}>
      <App/>
    </IntlProvider>
  </Provider>,
  document.getElementById('app'),
);
