import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './dragDrop.css'

const style = {
    frame: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        textAlign: 'center',
        fontSize: '48px'
    },
    leave: {
        border: '1px solid grey'
    },
    enter: {
        border: '1px dashed grey',
        backgroundColor: 'rgb(240, 240, 240)',
    }
}

class ImageDropZone extends Component {
    static propTypes = {
        anySize: PropTypes.bool,
        showButton: PropTypes.bool,
        imageWidth: PropTypes.number,
        imageHeight: PropTypes.number,
        imageIndex: PropTypes.number,
        fontSize: PropTypes.number,
        imageDefault: PropTypes.string,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        imagePicked: PropTypes.func,
        imageDeleted: PropTypes.func
    }
    constructor(props) {
        super(props)
        this.state = {
            image: null,
            error: '',
            over: false,
            deleted: false
        }
    }
    static getDerivedStateFromProps(props, state) {
        // if deleted the don't reset to image default
        if (state.deleted) {
            return null
        }
        // set image default
        if (!state.image && props.imageDefault) {
            return { image: props.imageDefault }
        } else {
            return null
        }
    }
    handleFile = event => {
        const { imagePicked } = this.props
        let image = URL.createObjectURL(event.target.files[0])
        let file = event.target.files[0]
        this.setState({ file, image })
        imagePicked({ index: this.props.imageIndex, file, image })
    }
    deleteFile = event => {
        const { imageDeleted, imagePicked } = this.props
        imagePicked({ index: this.props.imageIndex, file: null, image: null })
        if (imageDeleted) {
            imageDeleted(this.props)
        }
        this.setState({ image: null, deleted: true })
    }
    onDragOver = event => {
        event.preventDefault()
    }
    onDragEnter = event => {
        this.setState({ over: true })
    }
    onDragLeave = event => {
        this.setState({ over: false })
    }
    onDrop = event => {
        event.preventDefault()
        let file = event.dataTransfer.files[0]
        let image = URL.createObjectURL(file)
        this.setState({ image, over: false })
        this.props.imagePicked({ index: this.props.imageIndex, file, image })
    }
    onLoad = event => {
        const { naturalWidth, naturalHeight } = event.target
        const { imageWidth, imageHeight, anySize } = this.props
        if (!anySize && ((imageWidth && imageWidth !== naturalWidth) || (imageHeight && imageHeight !== naturalHeight))) {
            this.setState({
                error: `Wrong image dimensions ${naturalWidth}x${naturalHeight}`,
                image: null
            })
        } else {
            this.setState({ error: '' })
        }
    }
    render() {
        const { image, error, over } = this.state
        const { width, height, showButton, fontSize } = this.props
        return (
            <div>
                <div onDrop={ this.onDrop } onDragOver={ this.onDragOver }onDragLeave={ this.onDragLeave } onDragEnter={ this.onDragEnter }
                    style={ Object.assign({  }, {
                        width: `${ width }px`,
                        height: `${ height }px`,
                        backgroundImage: `url(${ image ? image : '' })`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'contain'
                    }, style.frame, over ? style.enter : style.leave)}>
                    { image !== null ? (
                        <img onLoad={ this.onLoad } src={ image } alt={ image } width={ 0 } height={ 0 }/>
                    ) : (
                        <div style={{ pointerEvents: 'none' }}>
                            <div style={{ ...style.label, fontSize: fontSize ? `${ fontSize }px` : '34px' }}>
                                Imagen
                                <div>{ error }</div>
                            </div>
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
