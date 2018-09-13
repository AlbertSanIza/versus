import { combineReducers } from 'redux'
import io from 'socket.io-client'

const socket = io('http://' + window.location.hostname + ':12345')

const competitorsInitialState = {
    competitors: [ ],
    searchTerm: ''
}
const competitors = (state = competitorsInitialState, action) => {
    switch(action.type) {
        case 'SEARCH_COMPETITORS':
        const { searchTerm } = action.payload
        return {
            ...state, searchTerm: searchTerm, competitors: (
                searchTerm ? competitorsInitialState.competitors.filter(competitor => competitor.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) : competitorsInitialState.competitors
            )
        }
        case 'CREATE_COMPETITOR':
        const { competitor } = action.payload
        competitorsInitialState.competitors.push(competitor)
        socket.emit('competitors', { type: 'set', payload: competitorsInitialState.competitors })
        return {
            ...state, searchTerm: '', competitors: competitorsInitialState.competitors
        }
        default:
        return state
    }
}

socket.emit('competitors', { type: 'get' }, data => {
    competitorsInitialState.competitors = data
})

export default combineReducers({
    competitors
})
