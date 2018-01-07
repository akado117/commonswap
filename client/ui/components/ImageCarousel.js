import React from 'react';
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery';
import GenericXButton from './forms/GenericXButton'

class ImageCarousel extends React.Component {
    constructor() {
        super();
    }

    handleImageLoad(event) {
        //console.log('Image loaded ', event.target)
    }

    deleteImg = () => {
        if (this.props.deleteImageHandler) {
            this.props.deleteImageHandler(this.refs.imgGal.getCurrentIndex());
        }
    }

    _renderCustomControls = () => {
        return (
            <GenericXButton className={'image-carousel-delete-button'} onClick={this.deleteImg} />
        );
    }

    render() {
        return (
            <div className="image-carousel">
                <ImageGallery
                    ref="imgGal"
                    renderCustomControls={this.props.deleteImageHandler ? this._renderCustomControls : ''}
                    items={this.props.images}
                    slideInterval={2000}
                    onImageLoad={this.handleImageLoad}
                    {...this.props.extraProps}
                />
            </div>
        );
    }

}

ImageCarousel.propTypes = {
    images: PropTypes.array.isRequired,
    extraProps: PropTypes.object,
    deleteImageHandler: PropTypes.oneOfType([PropTypes.func, null]),
}

ImageCarousel.defaultProps = {
    extraProps: {},
    deleteImageHandler: null,
}

export default ImageCarousel;