import { connect } from 'react-redux'
import Competitors from './competitors'

function searchCompetitors(searchTerm) {
    return {
        type: 'SEARCH_COMPETITORS',
        payload: { searchTerm },
    }
}

function createCompetitor(competitor) {
    return {
        type: 'CREATE_COMPETITOR',
        payload: { competitor }
    }
}

export default connect(store => store.competitors, {
    searchCompetitors,
    createCompetitor
})(Competitors)
