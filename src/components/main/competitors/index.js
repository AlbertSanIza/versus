import { connect } from 'react-redux'
import Competitors from './competitors'

function searchCompetitors(searchTerm) {
    return {
        type: 'SEARCH_COMPETITORS',
        payload: { searchTerm },
    }
}

export default connect(store => store.competitors, {
    searchCompetitors
})(Competitors)
