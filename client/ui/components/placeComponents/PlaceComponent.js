import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import SelectBuilder from '../forms/SelectBuilder'
import ButtonArrayComp from '../forms/ButtonArrayComp';
import TextFieldStandardized from '../forms/TextFieldStandardized';
import Address from './Address';
import Uploader from '../Uploader';
import ImageCarousel from '../ImageCarousel';
import { actionTypes } from '../../helpers/ConstantsRedux';
import { MaxImageDimTypes } from '../../../../imports/lib/Constants';
import ConnectedButton from '../forms/ConnectedButton';
import RaisedButton from 'material-ui/RaisedButton';


const BUTTONS = [
    { label: 'Gym/Fitness Center', name: 'gym' },
    { label: 'Parking', name: 'parking' },
    { label: 'Handicap Friendly', name: 'handicap' },
    { label: 'Heat/Air Conditioning', name: 'heat' },
    { label: 'WiFi', name: 'wiFi' },
    { label: 'Kitchen Appliances', name: 'kitchen' },
    { label: 'Pool', name: 'pool' },
    { label: 'Washer/Dryer', name: 'washer' },
];

function onChangeHelper(event) {
    return event.target.value;
};

class PlaceComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.place.place,
            uploadActive: false,
            isUploading: false,
            coords: false,
        };
    }

    componentDidMount = () => {
        if (Materialize.updateTextFields) {
            Materialize.updateTextFields();
        }
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.profile !== this.props.profile && Materialize.updateTextFields) {
            Materialize.updateTextFields();
        }
    }

    checkBoxHelper = (e, type) => {
        const value = e.target.checked;
        this.getValueFunc(type, value);
        this.setState({
            [type]: value,
        });
    };

    getValueFunc = (key, value) => {
        if (this.props.getValueFunc) {
            this.props.getValueFunc('place', key, value);
        }
    }

    toggleUploadActive = (onComplete) => {
        if (!onComplete && this.state.isUploading) return;
        this.setState({ uploadActive: !this.state.uploadActive, isUploading: false });
    }

    getImageSection = (images) => {
        let component;
        if (!this.props.place.place._id) {
            component = <span>Please create or update your profile to add pictures!</span>;
        } else if (!images.length || this.state.uploadActive) {
            component = (<Uploader
                maxPicaDimensionProp={MaxImageDimTypes.LARGE}
                addToDbFunc={this.props.savePlaceImage}
                metaContext={{ placeId: this.props.place.place._id }}
                onUploadComplete={() => this.toggleUploadActive(true)}
                uploaderInstance="uploadPlaceToAmazonS3"
                onCloseClick={() => this.toggleUploadActive()}
                onUploading={() => this.setState({ isUploading: true })}
            />);
        } else {
            const remappedImages = images.map(image => ({ original: image.url, thumbnail: image.url, originalClass: "img-gal" }));
            component = <ImageCarousel
                images={remappedImages}
                extraProps={{ showBullets: true, slideDuration: 300 }}
                deleteImageHandler={this.deletePlaceImage}
                placeImgs={images}
            />;
        }
        const toggleText = !this.state.uploadActive ? 'Add Photos' : 'See Photos'
        return (
            <div>
                <div class="col s12 m6 l4" style={{ marginBottom: '1.0rem' }}>
                    <ConnectedButton
                        icon={<i className="fa fa-image fa-1x" aria-hidden="true" style={{ float: 'left' }} />}
                        actionType={actionTypes.SAVE_PLACE}
                        buttonText={<span style={{ fontSize: '16px', cursor: 'pointer' }} role="button">{toggleText}</span>}
                        onClick={this.toggleUploadActive}
                        successText="Your Place Saved"
                    />
                </div>
                <div className="image-section-container col s12">
                    {/* <AppBar
                        title={<span>Photos &amp; Videos<span onClick={this.toggleUploadActive} style={{ fontSize: '16px', cursor: 'pointer' }} role="button">{toggleText}</span></span>}
                        showMenuIconButton={false}
                        style={{ marginBottom: '10px', zIndex: '0' }}
                    /> */}
                    {/* <div className="teal img-header">
                    <h3 className="container-desc">Photos & Video<span className="click-text" onClick={this.toggleUploadActive}> {images.length ? '- click to add more' : ''}</span></h3>
                </div> */}
                    {component}
                </div>
            </div >
        );
    }

    deletePlaceImage = (index) => {
        if (index > -1) {
            const { _id } = this.props.placeImages[index];
            const placeId = this.props.place.place._id;
            this.props.fileActions.deletePlaceImage({ _id, placeId });
        }
    }

    nextButtonHandler = () => {
        const { router, savePlace, place } = this.props;
        savePlace();
        router.push(`/viewProfile/${place.place._id}`);
    }

    render() {
        const getValFunc = this.getValueFunc;
        const { place, address, amenities } = this.props.place;
        const accessFields = {
            defaultField: <span><i className="fa fa-handshake-o fa-1x" aria-hidden="true"></i> Access to: </span>,
            fields: {
                displayNames: ['Entire Place', 'Private Room', 'Shared Room'],
                values: ['Entire Place', 'Private Room', 'Shared Room'],
            },
        };
        return (
            <div className="place-container">
                <Address getValueFunc={this.props.getValueFunc} address={address} onSearchChanged={this.onSearchComplete} place={place} />
                <div className="row">
                    <div className="col s12 input-field inline">
                        <input
                            placeholder="1 bedroom apartment in the heart of Washington D.C. 10 minute walk to the Washington Monument"
                            type="text"
                            className=""
                            id="short-desc"
                            onChange={e => getValFunc('shortDesc', onChangeHelper(e))}
                            defaultValue={place.shortDesc}
                        />
                        <label htmlFor="short-desc"><i className="fa fa-pencil" aria-hidden="true"></i> Short description about your place</label>
                    </div>
                    {/* <div className="col s6 input-field inline">
                        <label htmlFor="rent"><i className="fa fa-usd" aria-hidden="true"></i> Current Monthly Rent</label>
                        <input type="number" min="0" className="" id="rent" onChange={e => getValFunc('rent', onChangeHelper(e))} defaultValue={place.rent} />
                    </div> */}
                    <div className="col s6 input-field inline tablet-and-up-beds">
                        <input type="number" className="" id="beds" min="0" onChange={e => getValFunc('beds', onChangeHelper(e))} defaultValue={place.beds} />
                        <label htmlFor="beds"><i className="fa fa-bed" aria-hidden="true"></i> Guest beds Available</label>
                    </div>
                    <div className="col s6 input-field inline tablet-and-up-baths">
                        <input type="number" className="" id="bathrooms" min="0" onChange={e => getValFunc('bathrooms', onChangeHelper(e))} defaultValue={place.bathrooms} />
                        <label htmlFor="bathrooms"><i className="fa fa-bath" aria-hidden="true"></i> Guest Baths Available</label>
                    </div>
                    <div className="col s6 input-field inline tablet-and-up-sleeps">
                        <input type="number" className="" id="guest-cap" onChange={e => getValFunc('numOfGuests', onChangeHelper(e))} defaultValue={place.numOfGuests} />
                        <label htmlFor="guest-cap"><i className="fa fa-users" aria-hidden="true"></i> Sleeps how many</label>
                    </div>
                    <div className="col s6 input-field tablet-and-up-rooms">
                        <label htmlFor="bedroom-count"><i className="fa fa-bed" aria-hidden="true"></i> Guest Bedrooms Available</label>
                        <input type="number" className="" id="bedroom-count" onChange={e => getValFunc('bedrooms', onChangeHelper(e))} defaultValue={place.bedrooms} />
                    </div>
                    <div className="col s6 input-field inline mobile-guest-beds">
                        <input type="number" className="" id="beds" min="0" onChange={e => getValFunc('beds', onChangeHelper(e))} defaultValue={place.beds} />
                        <label htmlFor="beds"><i className="fa fa-bed" aria-hidden="true"></i> Guest beds</label>
                    </div>
                    <div className="col s6 input-field inline mobile-guest-baths">
                        <input type="number" className="" id="bathrooms" min="0" onChange={e => getValFunc('bathrooms', onChangeHelper(e))} defaultValue={place.bathrooms} />
                        <label htmlFor="bathrooms"><i className="fa fa-bath" aria-hidden="true"></i> Guest Baths</label>
                    </div>
                    <div className="col s6 input-field inline mobile-sleeps">
                        <input type="number" className="" id="guest-cap" onChange={e => getValFunc('numOfGuests', onChangeHelper(e))} defaultValue={place.numOfGuests} />
                        <label htmlFor="guest-cap"><i className="fa fa-users" aria-hidden="true"></i> Sleeps how many</label>
                    </div>
                    <div className="col s6 input-field mobile-rooms">
                        <label htmlFor="bedroom-count"><i className="fa fa-bed" aria-hidden="true"></i> Guest Bedrooms</label>
                        <input type="number" className="" id="bedroom-count" onChange={e => getValFunc('bedrooms', onChangeHelper(e))} defaultValue={place.bedrooms} />
                    </div>
                    <div className="col m6 s12 input-field inline">
                        <SelectBuilder
                            label={<span><i className="fa fa-handshake-o fa-1x" aria-hidden="true"></i> What will your swap have access to?</span>}
                            onChange={value => getValFunc('access', value)}
                            selectArrObj={accessFields.fields}
                            defaultSelection={accessFields.defaultField}
                            defaultValue={place.access}
                            extraProps={{ floatingLabelFixed: true }}
                        />
                    </div>
                    <div className="col s12">
                        <ButtonArrayComp
                            getValueFunc={(key, value) => this.props.getValueFunc('amenities', key, value)}
                            defaultValues={amenities}
                            buttonData={BUTTONS}
                        />
                    </div>
                    <div className="col s12 mobile-detailed-desc">
                        <TextFieldStandardized
                            floatingLabelText="Detailed place description"
                            onChange={(e, value) => getValFunc('detailedDesc', value)}
                            extraProps={{
                                defaultValue: place.detailedDesc,
                                hintText: place.detailedDesc ? undefined : 'My place is a 1bedroom/1bathroom with a full kitchen. I have a queen bed and also 2 sofas in the living room.  My place can comfortably sleep 2-3 people. Amenities include a gym and a lounge. I live in the “Dupont Circle” area of Washington D.C. All monuments and attractions are either walking distance or a short car ride away.',
                                floatingLabelFixed: true,
                            }}
                        />
                    </div>
                    <div className="col s12 tablet-and-up-detailed-desc">
                        <TextFieldStandardized
                            floatingLabelText="Write a detailed description about your place"
                            onChange={(e, value) => getValFunc('detailedDesc', value)}
                            extraProps={{
                                defaultValue: place.detailedDesc,
                                hintText: place.detailedDesc ? undefined : 'My place is a 1bedroom/1bathroom with a full kitchen. I have a queen bed and also 2 sofas in the living room. My place can comfortably sleep 2-3 people.  Amenities include a gym and a lounge. I live in the “Dupont Circle” area of Washington D.C. All monuments and attractions are either walking distance or a short car ride away. I am two blocks from the closest metro stop. Feel free to reach out if you have any questions!',
                                floatingLabelFixed: true,
                            }}
                        />
                    </div>
                    <div className="col s12 recommendations-mobile">
                        <TextFieldStandardized
                            floatingLabelText="Top travel recommendations for your swap"
                            onChange={(e, value) => getValFunc('recommendations', value)}
                            extraProps={{
                                defaultValue: place.recommendations,
                                hintText: place.recommendations ? undefined : 'I would recommend checking out the famous DC landmarks – the Monument, Jefferson Memorial, Lincoln Memorial, etc. if you haven’t done so. U St is a lively area with several bars and restaurants.',
                                floatingLabelFixed: true,
                            }}
                        />
                    </div>
                    <div className="col s12 tablet-and-up-recommendations">
                        <TextFieldStandardized
                            floatingLabelText="What are some of your top recommendations for visitors in your city?"
                            onChange={(e, value) => getValFunc('recommendations', value)}
                            extraProps={{
                                defaultValue: place.recommendations,
                                hintText: place.recommendations ? undefined : 'I would recommend checking out the famous DC landmarks – the Monument, Jefferson Memorial, Lincoln Memorial, etc. if you haven’t done so. U St is a lively area with several bars and restaurants.',
                                floatingLabelFixed: true,
                            }}
                        />
                    </div>
                    <div className="col s12 tablet-and-up-general">
                        <TextFieldStandardized
                            floatingLabelText="Include any general guidelines you would like to inform your swap:"
                            onChange={(e, value) => getValFunc('generalNotes', value)}
                            extraProps={{
                                defaultValue: place.generalNotes,
                                hintText: place.generalNotes ? undefined : 'Please take your shoes off when entering my place. In addition, smoking is not allowed in my place. Don’t forget to lock the door anytime you leave!',
                                floatingLabelFixed: true,
                            }}
                        />
                    </div>
                    <div className="col s12 mobile-general">
                        <TextFieldStandardized
                            floatingLabelText="General guidelines for your swap:"
                            onChange={(e, value) => getValFunc('generalNotes', value)}
                            extraProps={{
                                defaultValue: place.generalNotes,
                                hintText: place.generalNotes ? undefined : 'Please take your shoes off when entering my place. In addition, smoking is not allowed in my place. Don’t forget to lock the door anytime you leave!',
                                floatingLabelFixed: true,
                            }}
                        />
                    </div>
                    {this.getImageSection(this.props.placeImages)}
                    <div className="col s12">
                        <div className="row">
                            <div className="col s6 m4 l3 offset-m4 offset-l6">
                                <ConnectedButton
                                    icon={<i className="fa fa-floppy-o fa-1x" aria-hidden="true" style={{ float: 'left' }} />}
                                    actionType={actionTypes.SAVE_PLACE}
                                    buttonText="Save"
                                    onClick={this.props.savePlace}
                                    successText="Your Place Saved"
                                />
                            </div>
                            <div className="col s6 m4 l3">
                                <ConnectedButton
                                    icon={<i className="fa fa-hand-o-right fa-1x" aria-hidden="true" style={{ float: 'left' }} />}
                                    actionType={actionTypes.SAVE_PROFILE}
                                    buttonText="Preview"
                                    onClick={this.nextButtonHandler}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

PlaceComponent.propTypes = {
    getValueFunc: PropTypes.func.isRequired,
    place: PropTypes.object.isRequired,
    savePlace: PropTypes.func.isRequired,
    savePlaceImage: PropTypes.func.isRequired,
    placeImages: PropTypes.array.isRequired,
    fileActions: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
};

export default PlaceComponent;