import React from 'react';
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery';
import GenericXButton from './forms/GenericXButton';
import fileActions from '../actions/FileActions';
import Store from '../store/store';

class ImageCarousel extends React.Component {
    constructor() {
        super();
        this.state = {
            changePositionActive: false,
        };
    }

    handleImageLoad(event) {
        //console.log('Image loaded ', event.target)
    }

    deleteImg = () => {
        if (this.props.deleteImageHandler) {
            this.props.deleteImageHandler(this.refs.imgGal.getCurrentIndex());
        }
    }

    reorderImage = (increaseOrder) => {
        if (this.props.placeImgs) {
            const curIdx = this.refs.imgGal.getCurrentIndex();
            Store.dispatch(fileActions.reOrderImages(curIdx, increaseOrder, this.props.placeImgs));
            this.refs.imgGal.slideToIndex(curIdx + (increaseOrder ? -1 : 1));
        }
    }
    saveImageOrder = () => {
        if (this.props.placeImgs) {
            Store.dispatch(fileActions.savePlaceImageOrder(this.props.placeImgs));
            this.setState({ changePositionActive: false });
        }
    }

    _renderCustomControls = () => {
        const whenActive = this.state.changePositionActive ? '' : 'hide';
        const whenNotActive = this.state.changePositionActive ? 'hide' : '';
        return (
            <div className="custom-control-wrapper">
                <div className="move-button-wrapper">
                    <GenericXButton onClick={() => this.reorderImage(true)} className={`move-left ${whenActive}`} fontIconClass="fa-chevron-circle-left" />
                    <GenericXButton onClick={() => this.reorderImage(false)} className={`move-right ${whenActive}`} fontIconClass="fa-chevron-circle-right" />
                    <GenericXButton onClick={this.saveImageOrder} className={`move-right ${whenActive}`} fontIconClass="fa-check-square" />
                    <GenericXButton onClick={() => this.setState({ changePositionActive: true })} className={`move-left inverse ${whenNotActive}`} fontIconClass="fa-exchange" />
                </div>
                <GenericXButton className={'image-carousel-delete-button'} onClick={this.deleteImg} />
            </div>
        );
    }

    render() {
        return (
            <div className="image-carousel">
                <ImageGallery
                    ref="imgGal"
                    renderCustomControls={this.props.deleteImageHandler ? this._renderCustomControls : undefined}
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
    placeImgs: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]), //Used for image manip functions ONLY USABLE FOR PLACE IMAGES AT THIS TIME.
    extraProps: PropTypes.object,
    deleteImageHandler: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
}

ImageCarousel.defaultProps = {
    extraProps: {},
    deleteImageHandler: '',
    placeImgs: false,
}

export default ImageCarousel;