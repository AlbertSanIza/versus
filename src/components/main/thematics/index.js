import { connect } from 'react-redux'
import Thematics from './thematics'

function searchThematics(searchTerm) {
    return {
        type: 'SEARCH_THEMATICS',
        payload: { searchTerm },
    }
}

function createThematic(thematic) {
    return {
        type: 'CREATE_THEMATIC',
        payload: { thematic }
    }
}

export default connect(store => store.thematics, {
    searchThematics,
    createThematic
})(Thematics)
