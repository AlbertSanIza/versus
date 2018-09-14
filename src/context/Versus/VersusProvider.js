import React, { Component } from 'react'

import VersusContext from './VersusContext'

class VersusProvider extends Component {
    constructor() {
        super()
        this.state = {
            drawer: true,
            handleDrawer: () => this.handleDrawer()
        }
    }
    handleDrawer = () => {
        this.setState({ drawer: !this.state.drawer })
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
