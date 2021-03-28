import React, { Component } from 'react';
import PropTypes from 'prop-types';

import VersusContext from './VersusContext';

class VersusProvider extends Component {
  constructor() {
    super();
    this.state = {
      drawer: true,
    };
  }

  handleDrawer() {
    this.setState(prevState => ({ drawer: !prevState.drawer }));
  }

  render() {
    const { drawer } = this.state;
    return (
      <VersusContext.Provider value={{ drawer: drawer, handleDrawer: () => this.handleDrawer() }}>
        { this.props.children }
      </VersusContext.Provider>
    );
  }
}

VersusProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default VersusProvider;
