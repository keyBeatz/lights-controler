import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import * as styles from './styles';

class HelloReact extends PureComponent {
  static propTypes = {
    state: PropTypes.string,
  };
  static defaultProps = {
    state: '',
  };

  render() {
    const {state} = this.props;
    return (
      <div className={styles['title']}>{state}</div>
    );
  }
}

export default HelloReact;
