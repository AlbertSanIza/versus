import { connect } from 'react-redux'
import Settings from './settings'

function openTempFolder() {
    return {
        type: 'OPEN_TEMP_FOLDER'
    }
}

export default connect(store => store.settings, {
    openTempFolder
})(Settings)
