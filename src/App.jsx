import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Controls from './Controls';
import Viewer from './Viewer';

function App(props) {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/viewer">
            <Viewer />
          </Route>
          <Route path="">
            <Controls />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
