import { combineReducers } from 'redux'

const competitorsInitialState = {
    competitors: [
        { name: 'Aczino' },
        { name: 'Lobo Estepario' }
    ],
    searchTerm: ''
}

const competitors = (state = competitorsInitialState, action) => {
    switch(action.type) {
        case 'SEARCH_COMPETITORS':
        const { searchTerm } = action.payload
        return {
            ...state, searchTerm: searchTerm, competitors: searchTerm ? competitorsInitialState.competitors.filter(competitor => competitor.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) : competitorsInitialState.competitors
        }
        default:
        return state
    }
}

export default combineReducers({
    competitors
})
