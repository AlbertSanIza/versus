import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { MuiThemeProvider } from '@material-ui/core/styles'
import 'typeface-roboto'
import './index.css'
import rootReducer from './reducers'
import theme from './theme'
import App from './App'

const store = createStore(rootReducer)

ReactDOM.render(
    <Provider store={ store }>
        <MuiThemeProvider theme={ theme }>
            <App/>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
)
