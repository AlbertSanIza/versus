import { connect } from 'react-redux'
import Thematics from './thematics'

function searchThematics(searchTerm) {
    return {
        type: 'SEARCH_THEMATICS',
        payload: { searchTerm },
    }
}

export default connect(store => store.thematics, {
    searchThematics
})(Thematics)
