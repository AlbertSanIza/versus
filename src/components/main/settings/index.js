import { connect } from 'react-redux'
import Settings from './settings'

function openTempDir() {
    return {
        type: 'OPEN_TEMP_DIR'
    }
}

export default connect(store => store.settings, {
    openTempDir
})(Settings)
