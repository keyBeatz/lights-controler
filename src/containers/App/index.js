import React from 'react';
import {Pane,} from 'evergreen-ui';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {makeSelectUser} from "Selectors/AppSelectors";

import LightsPage from "Containers/LightsPage";
import LoginPage from "Containers/LoginPage";

import './icons';
import './style.scss';
import Footer from "Components/Footer";
import Notification from "Components/Notification";


class App extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func,
    user: PropTypes.any,
  };

  render() {
    const {user,} = this.props;
    return (
      <Pane className={`app-container`}>
        <Notification />
        {user.get('loggedIn') ? (
          <LightsPage/>
        ) : (
          <LoginPage/>
        )}
        <Footer/>
      </Pane>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);