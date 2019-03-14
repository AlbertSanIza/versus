import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';

import { VersusMain, VersusUpload, VersusVisualizer } from './components';
import { VersusProvider, SocketIOProvider } from './context';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <React.Fragment>
          <VersusProvider>
            <SocketIOProvider>
              <Route path="/main" component={VersusMain} />
              <Route exact path="/upload" component={VersusUpload} />
            </SocketIOProvider>
          </VersusProvider>
          <Route exact path="/" component={VersusVisualizer} />
        </React.Fragment>
      </HashRouter>
    );
  }
}

export default App;
