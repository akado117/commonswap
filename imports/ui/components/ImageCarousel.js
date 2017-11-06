import React from 'react';
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery';

class ImageCarousel extends React.Component {
    constructor() {
        super();
    }

    handleImageLoad(event) {
        //console.log('Image loaded ', event.target)
    }

    render() {
        return (
            <div className="image-carousel">
                <ImageGallery
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
}

ImageCarousel.defaultProps = {
    extraProps: {},
}

export default ImageCarousel;