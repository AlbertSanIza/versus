import { combineReducers } from 'redux'

const eventsInitialState = {
    events: [
        { name: 'BDM Gold Mexico' }
    ],
    searchTerm: ''
}
const events = (state = eventsInitialState, action) => {
    switch(action.type) {
        case 'SEARCH_EVENTS':
        const { searchTerm } = action.payload
        return {
            ...state, searchTerm: searchTerm, events: (
                searchTerm ? eventsInitialState.events.filter(event => event.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) : eventsInitialState.events
            )
        }
        case 'CREATE_EVENTS':
        const { event } = action.payload
        return {
            ...state, events: eventsInitialState.events.push(event)
        }
        default:
        return state
    }
}

const thematicsInitialState = {
    thematics: [
        { name: 'Madera' }
    ],
    searchTerm: ''
}
const thematics = (state = thematicsInitialState, action) => {
    switch(action.type) {
        case 'SEARCH_THEMATICS':
        const { searchTerm } = action.payload
        return {
            ...state, searchTerm: searchTerm, thematics: (
                searchTerm ? thematicsInitialState.thematics.filter(thematic => thematic.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) : thematicsInitialState.thematics
            )
        }
        default:
        return state
    }
}

const competitorsInitialState = {
    competitors: [
        { name: 'Wos', photo: './wos.jpg' },
        { name: 'Aczino', photo: './aczino.jpg' },
        { name: 'Lobo Estepario', photo: './loboestepario.jpg' },
        { name: 'Lobo Estepario', photo: './loboestepario.jpg' },
        { name: 'Lobo Estepario', photo: './loboestepario.jpg' },
        { name: 'Lobo Estepario', photo: './loboestepario.jpg' },
        { name: 'Lobo Estepario', photo: './loboestepario.jpg' },
        { name: 'Lobo Estepario', photo: './loboestepario.jpg' },
        { name: 'Lobo Estepario', photo: './loboestepario.jpg' }
    ],
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
        default:
        return state
    }
}

export default combineReducers({
    events,
    thematics,
    competitors
})
