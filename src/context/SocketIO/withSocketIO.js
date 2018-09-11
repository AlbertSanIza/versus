import React from 'react'

import SocketIOContext from './SocketIOContext'

export default function withSocketIO(Component) {
    return props => {
        return (
            <SocketIOContext.Consumer>
                { SocketIO => <Component { ...props } SocketIO={ SocketIO }/> }
            </SocketIOContext.Consumer>
        )
    }
}
