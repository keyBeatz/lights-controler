import React from 'react';
import { Pane, TextInputField, Button, } from 'evergreen-ui';
import PropTypes from 'prop-types';

export default class Login extends React.Component {
  static propTypes = {
    loginAsync: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  setUsername = username => this.setState({ username, });
  setPassword = password => this.setState({ password, });

  login = () => {
    const {username, password} = this.state;
    this.props.loginAsync(username, password);
  };

  render() {

    return (
      <Pane className={`login`}>
        <TextInputField
          onChange={e => this.setUsername(e.target.value)}
          label={`Username`}
          value={this.state.username}
        />
        <TextInputField
          onChange={e => this.setPassword(e.target.value)}
          label={`Password`}
          type={`password`}
          value={this.state.password}
        />
        <Button onClick={this.login}>
          Login
        </Button>
      </Pane>
    );
  }
}