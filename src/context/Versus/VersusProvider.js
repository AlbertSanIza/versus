import React, { Component } from 'react'

import VersusContext from './VersusContext'

class VersusProvider extends Component {
    constructor() {
        super()
        this.state = {
            VersusDrawer: true
        }
    }
    render() {
        return (
            <VersusContext.Provider value={ this.state }>
                { this.props.children }
            </VersusContext.Provider>
        )
    }
}

export default VersusProvider
