import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './dragDrop.css'

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
        showButton: PropTypes.bool,
        imageIndex: PropTypes.number,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        imagePicked: PropTypes.func,
    }
    constructor(props) {
        super(props)
        this.state = {
            image: null,
            over: false
        }
    }
    handleFile = e => {
        const { imagePicked } = this.props
        let image = URL.createObjectURL(e.target.files[0])
        let file = e.target.files[0]
        this.setState({ file, image })
        imagePicked({ index: this.props.imageIndex, file, image })
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
    onDrop = e => {
        e.preventDefault()
        let file = e.dataTransfer.files[0]
        let image = URL.createObjectURL(file)
        this.setState({ image, over: false })
        this.props.imagePicked({ index: this.props.imageIndex, file, image })
    }
    render() {
        const { image, over } = this.state
        const { width, height, showButton } = this.props
        return (
            <div>
                <div onDrop={ this.onDrop } onDragOver={ this.onDragOver } onDragLeave={ this.onDragLeave } onDragEnter={ this.onDragEnter }
                    style={ Object.assign({  }, {
                        width: `${ width }px`,
                        height: `${ height }px`,
                        backgroundImage: `url(${ image ? image : '' })`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover'
                    }, style.frame, over ? style.enter : style.leave)}>
                    { image !== null ? (
                        <img src={ image } alt={ image } width={ 0 } height={ 0 }/>
                    ) : (
                        <div style={{ pointerEvents: 'none' }}>
                            <div style={ style.label }>Imagen</div>
                        </div>
                    )}
                </div>
                <div style={{ display: 'flex' }}>
                    { showButton ? (
                        <div className="button-container">
                            <label className="button">
                                Escoger Imagen
                                <input type="file" value="" accept="image/png" style={{ display: 'none' }} onChange={ this.handleFile }/>
                            </label>
                        </div>
                    ) : null }
                </div>
            </div>
        )
    }
}

export default ImageDropZone
