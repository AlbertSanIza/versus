import { connect } from 'react-redux'
import Events from './events'

function searchEvents(searchTerm) {
    return {
        type: 'SEARCH_EVENTS',
        payload: { searchTerm },
    }
}

export default connect(store => store.events, {
    searchEvents
})(Events)
