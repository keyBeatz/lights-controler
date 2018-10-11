import React from "react";
import PropTypes from "prop-types";
import {Pane} from "evergreen-ui";
import {CHARACTERISTICS_IS_ON} from "Constants/AppConstants";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {toaster} from 'evergreen-ui';

import messages from './messages';
import {FormattedMessage} from 'react-intl';

import './style.scss';


export default function LightsList(props) {

  const LightItem = (name, isOn, onClick, isReady) => {
    return (
      <li key={name}>
        <Pane
          className={`lights-list__item ${isOn ? 'lights-list__item--on' : ''} ${!isReady ? 'lights-list__item--not-ready' : ''}`}
          appearance="dark"
          color="white"
          float="left"
          width={120}
          height={120}
          margin={7.5}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <button onClick={onClick}>
            <div className={`lights-list__item-icon`}>
              {isReady ? <FontAwesomeIcon icon={"lightbulb"}/> : <FontAwesomeIcon icon={"spinner"} spin/>}
            </div>
            <div className={`lights-list__item-name`}>
              {messages[name] !== undefined ? <FormattedMessage {...messages[name]} /> : name}
            </div>
          </button>
        </Pane>
      </li>
    )
  };

  return (
    <Pane className={`lights-list`} clearfix>
      <ul>
        {props.lightServices.valueSeq().map(service => {
          const serviceName = service.get('name');
          const isOn = !!service.getIn(['values', CHARACTERISTICS_IS_ON]);
          const isReady = service.hasIn(['values', CHARACTERISTICS_IS_ON]);
          const onClick = () => {
            if (!isReady) {
              toaster.warning("Nelze provést akci. Tato žárovka ještě není načtena.");
              return;
            }

            props.writeValueToCharacteristics({
              service: serviceName,
              characteristic: CHARACTERISTICS_IS_ON,
              value: !isOn
            })
          };

          return LightItem(
            serviceName,
            isOn,
            onClick,
            isReady,
          );
        })}
      </ul>
    </Pane>
  );
}

LightsList.propTypes = {
  lightServices: PropTypes.any.isRequired,
  writeValueToCharacteristics: PropTypes.func.isRequired,
};