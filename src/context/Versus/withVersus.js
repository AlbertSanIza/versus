import React from 'react'

import VersusContext from './VersusContext'

export default function withVersus(Component) {
    return props => {
        return (
            <VersusContext.Consumer>
                { Versus => <Component { ...props } Versus={ Versus }/> }
            </VersusContext.Consumer>
        )
    }
}
