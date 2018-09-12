import { combineReducers } from 'redux'
import io from 'socket.io-client'

const socket = io('http://' + window.location.hostname + ':12345')

const visuals = (state = [], action) => {
    switch(action.type) {
        case 'VISUALIZER':
        socket.emit('visualizer', action.payload)
        break
        default: break
    }
    return state
}

const eventsInitialState = {
    events: [ ],
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
        case 'CREATE_EVENT':
        const { event } = action.payload
        eventsInitialState.events.push(event)
        socket.emit('events', { type: 'set', payload: eventsInitialState.events })
        return {
            ...state, searchTerm: '', events: eventsInitialState.events
        }
        default:
        return state
    }
}

const thematicsInitialState = {
    thematics: [ ],
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
        case 'CREATE_THEMATIC':
        const { thematic } = action.payload
        thematicsInitialState.thematics.push(thematic)
        socket.emit('thematics', { type: 'set', payload: thematicsInitialState.thematics })
        return {
            ...state, searchTerm: '', thematics: thematicsInitialState.thematics
        }
        default:
        return state
    }
}

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

socket.emit('events', { type: 'get' }, data => {
    eventsInitialState.events = data
})
socket.emit('thematics', { type: 'get' }, data => {
    thematicsInitialState.thematics = data
})
socket.emit('competitors', { type: 'get' }, data => {
    competitorsInitialState.competitors = data
})

export default combineReducers({
    visuals,
    events,
    thematics,
    competitors
})
