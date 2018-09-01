import { connect } from 'react-redux'
import Visuals from './visuals'

function play() {
    return {
        type: 'PLAY',
        payload: 'PLAY'
    }
}

export default connect(store => store, {
    play
})(Visuals)
