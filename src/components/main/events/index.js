import { connect } from 'react-redux'
import Events from './events'

function searchEvents(searchTerm) {
    return {
        type: 'SEARCH_EVENTS',
        payload: { searchTerm }
    }
}

function createEvent(event) {
    return {
        type: 'CREATE_EVENT',
        payload: { event }
    }
}

export default connect(store => store.events, {
    searchEvents,
    createEvent
})(Events)
