import React from 'react'
import ReactDOM from 'react-dom'
import 'typeface-caveat-brush'
import 'typeface-roboto'

import Theme from './theme'
import App from './App'

ReactDOM.render(
    <Theme>
        <App/>
    </Theme>,
    document.getElementById('root')
)
