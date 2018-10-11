import React from "react";
import PropTypes from "prop-types";
import {
  fetchServicesAsyncAction,
  writeValueToCharacteristicsAsyncAction,
} from "Actions/AppActions";
import {createStructuredSelector} from "reselect";
import connect from "react-redux/es/connect/connect";
import {makeSelectLightServices} from "Selectors/AppSelectors";
import LightsList from "Components/LightsList";


class LightsContainer extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func,
    lightServices: PropTypes.any,
  };

  componentDidMount() {
    this.props.dispatch(fetchServicesAsyncAction());
  }

  writeValueToCharacteristics = ({service, characteristic, value,}) => {
    this.props.dispatch(writeValueToCharacteristicsAsyncAction({service, characteristic, value,}));
  };

  render() {
    return (
      <div className={`lights-container`}>
        <LightsList
          lightServices={this.props.lightServices}
          writeValueToCharacteristics={this.writeValueToCharacteristics}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  lightServices: makeSelectLightServices(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LightsContainer);