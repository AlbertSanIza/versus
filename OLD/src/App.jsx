import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import { VersusMain, VersusUpload, VersusVisualizer } from './components';
import { VersusProvider, SocketIOProvider } from './context';

function App(props) {
  return (
    <HashRouter>
      <>
        <VersusProvider>
          <SocketIOProvider>
            <div>
              <Route path="/main" component={VersusMain} />
              <Route exact path="/upload" component={VersusUpload} />
            </div>
          </SocketIOProvider>
        </VersusProvider>
        <Route exact path="/" component={VersusVisualizer} />
      </>
    </HashRouter>
  );
}

export default App;
