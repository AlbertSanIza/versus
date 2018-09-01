import { connect } from 'react-redux'
import Visuals from './visuals'

function visualizer(payload) {
    return {
        type: 'VISUALIZER',
        payload: payload
    }
}

export default connect(store => store, {
    visualizer
})(Visuals)
