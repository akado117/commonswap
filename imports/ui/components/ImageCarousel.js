import React from 'react';
import ImageGallery from 'react-image-gallery';

const imagePreload = [];
class ImageCarousel extends React.Component {
    constructor() {
        super();
        const images = [
            {
                original: 'http://lorempixel.com/1000/600/nature/1/',
                thumbnail: 'http://lorempixel.com/250/150/nature/1/',
            },
            {
                original: 'http://lorempixel.com/1000/600/nature/2/',
                thumbnail: 'http://lorempixel.com/250/150/nature/2/'
            },
            {
                original: 'http://lorempixel.com/1000/600/nature/3/',
                thumbnail: 'http://lorempixel.com/250/150/nature/3/'
            },
        ];
        images.forEach((img, idx) => {
            imagePreload[idx] = {
                original: new Image().src = img.original,
                thumbnail: new Image().src = img.thumbnail,
            };
         })

        this.state = {
            images,
        };
    }

    handleImageLoad(event) {
        console.log('Image loaded ', event.target)
    }

    render() {


        return (
            <ImageGallery
                items={this.props.images}
                slideInterval={2000}
                onImageLoad={this.handleImageLoad}
            />
        );
    }

}

export default ImageCarousel;