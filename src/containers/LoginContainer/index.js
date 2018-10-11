import React from "react";
import PropTypes from "prop-types";
import {loginAsyncAction} from "Actions/AppActions";
import {createStructuredSelector} from "reselect";
import connect from "react-redux/es/connect/connect";
import Login from "Components/Login";


class LoginContainer extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func,
  };

  loginAsync = (username, password) => {
    this.props.dispatch(loginAsyncAction(username, password))
  };

  render() {
    return <Login loginAsync={this.loginAsync}/>;
  }
}

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);