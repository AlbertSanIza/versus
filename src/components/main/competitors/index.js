import { connect } from 'react-redux'
import Compoetitors from './competitors'

function searchCompetitor(searchTerm) {
    return {
        type: 'SEARCH_COMPETITOR',
        payload: { searchTerm },
    }
}

export default connect(store => store.competitors, {
    searchCompetitor
})(Compoetitors)
