import React, { Component } from 'react';
import PropTypes from 'prop-types';

const style = {
  frame: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(240, 240, 240)',
  },
  label: {
    textAlign: 'center',
    fontSize: '26px',
  },
  leave: {
    border: '1px solid grey',
  },
  enter: {
    border: '1px dashed grey',
    backgroundColor: 'rgb(220, 220, 220)',
  },
  picker: {
    textAlign: 'center',
    width: '100%',
  },
};

const onDragOver = e => {
  e.preventDefault();
};

class VersusDragNDrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      over: false,
    };
  }

  // static getDerivedStateFromProps(props, state) {
  //   if (!state.image && props.imageDefault) {
  //     return { image: props.imageDefault };
  //   }
  //   return null;
  // }

  handleFile(e) {
    const file = e.target.files[0];
    if (file.type === 'image/png' || file.type === 'image/jpeg') {
      const image = URL.createObjectURL(file);
      this.setState({ image: image });
      this.props.imagePicked({ file: file, image: image });
    }
  }

  onDragEnter() {
    this.setState({ over: true });
  }

  onDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file.type === 'image/png' || file.type === 'image/jpeg') {
      const image = URL.createObjectURL(file);
      this.setState({ image: image });
      this.props.imagePicked({ file: file, image: image });
    }
    this.setState({ over: false });
  }

  onDragLeave() {
    this.setState({ over: false });
  }

  render() {
    const { image, over } = this.state;
    const { width, height } = this.props;
    return (
      <>
        <div
          onDrop={e => this.onDrop(e)}
          onDragOver={onDragOver}
          onDragLeave={() => this.onDragLeave()}
          onDragEnter={() => this.onDragEnter()}
          style={({
            width: width,
            height: height,
            backgroundImage: `url(${image || ''})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            ...style.frame,
            ...(over ? style.enter : style.leave),
          })}
        />
        <div style={style.picker}>
          <label htmlFor="imagesInput" style={{ cursor: 'pointer' }}>

            Seleccionar Imagen
            <input id="imagesInput" type="file" value="" accept="image/png; image/jpeg;" style={{ display: 'none' }} onChange={e => this.handleFile(e)} />
          </label>
        </div>
      </>
    );
  }
}

VersusDragNDrop.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  imagePicked: PropTypes.func.isRequired,
};

export default VersusDragNDrop;
