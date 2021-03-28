import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Viewer from './pages/viewer/Viewer';
import Controls from './Controls';

function App(props) {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/viewer">
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
