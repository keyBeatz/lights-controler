import {createSelector} from 'reselect';
import {SERVICE_TYPE_LIGHT} from "Constants/AppConstants";

const selectUser = (state) => state.get('state').get('user');
const selectServices = (state) => state.get('state').get('services');

export const makeSelectUser = () => createSelector(
  selectUser,
  (user) => user
);

/**
 * Returns only services with type === 'light'
 */
export const makeSelectLightServices = () => createSelector(
  selectServices,
  (services) => services.filter(service => service.get('type') === SERVICE_TYPE_LIGHT)
);