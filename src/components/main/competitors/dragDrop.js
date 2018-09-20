import React, { Component } from 'react'
import PropTypes from 'prop-types'

const style = {
    frame: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(240, 240, 240)'
    },
    label: {
        textAlign: 'center',
        fontSize: '26px'
    },
    leave: {
        border: '1px solid grey'
    },
    enter: {
        border: '1px dashed grey',
        backgroundColor: 'rgb(220, 220, 220)',
    }
}

class ImageDropZone extends Component {
    static propTypes = {
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        imagePicked: PropTypes.func
    }
    constructor(props) {
        super(props)
        this.state = {
            image: null,
            over: false
        }
    }
    static getDerivedStateFromProps(props, state) {
        if (!state.image && props.imageDefault) {
            return { image: props.imageDefault }
        } else {
            return null
        }
    }
    onDragOver = e => {
        e.preventDefault()
    }
    onDragEnter = () => {
        this.setState({ over: true })
    }
    onDragLeave = () => {
        this.setState({ over: false })
    }
    handleFile = e => {
        let file = e.target.files[0]
        if(file.type === 'image/png') {
            let image = URL.createObjectURL(file)
            this.setState({ image })
            this.props.imagePicked({ file, image })
        }
    }
    onDrop = e => {
        e.preventDefault()
        let file = e.dataTransfer.files[0]
        if(file.type === 'image/png') {
            let image = URL.createObjectURL(file)
            this.setState({ image })
            this.props.imagePicked({ file, image })
        }
        this.setState({ over: false })
    }
    render() {
        const { image, over } = this.state
        const { width, height } = this.props
        return (
            <div onDrop={ this.onDrop } onDragOver={ this.onDragOver } onDragLeave={ this.onDragLeave } onDragEnter={ this.onDragEnter }
                style={ Object.assign({  }, {
                    width: `${ width }px`,
                    height: `${ height }px`,
                    backgroundImage: `url(${ image ? image : '' })`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                }, style.frame, over ? style.enter : style.leave) }>
                { image !== null ? (
                    <img src={ image } alt={ image } width={ 0 } height={ 0 }/>
                ) : (
                    <label>
                        Escoger Imagen
                        <input type="file" value="" accept="image/png" style={{ display: 'none' }} onChange={ this.handleFile }/>
                    </label>
                )}
            </div>
        )
    }
}

export default ImageDropZone
