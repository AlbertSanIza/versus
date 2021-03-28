import React from 'react';
import { Route } from 'react-router-dom';

import CompetitorsView from './competitors';
import VersusDrawer from '../VersusDrawer';
import VersusAppBar from '../VersusAppBar';
import ThematicsView from './thematics';
import VisualsView from './visuals';
import FormatsView from './formats';
import EventsView from './events';

function Main() {
  return (
    <>
      <VersusAppBar />
      <VersusDrawer>
        <div>
          <Route path="/visuals" component={VisualsView} />
          <Route path="/events" component={EventsView} />
          <Route path="/thematics" component={ThematicsView} />
          <Route path="/formats" component={FormatsView} />
          <Route path="/competitors" component={CompetitorsView} />
          <Route exact path="/" component={VisualsView} />
        </div>
      </VersusDrawer>
    </>
  );
}

export default Main;
