import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Controls, Viewer } from './components';

function App(props) {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/controls">
            <Controls />
          </Route>
          <Route path="/viewer">
            <Viewer />
          </Route>
          <Route path="/">
            <Controls />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
