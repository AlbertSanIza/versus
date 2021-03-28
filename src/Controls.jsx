import React from 'react';

import { VersusProvider, SocketIOProvider } from './context';
import { VersusMain } from './components';

function Controls(props) {
  return (
    <div>
      <VersusProvider>
        <SocketIOProvider>
          <VersusMain />
        </SocketIOProvider>
      </VersusProvider>
    </div>
  );
}

export default Controls;
