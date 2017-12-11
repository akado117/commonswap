import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectBuilder from '../forms/SelectBuilder.js'
import ButtonArrayComp from '../forms/ButtonArrayComp';
import TextFieldStandardized from '../forms/TextFieldStandardized';
import Address from './Address';
import Uploader from '../Uploader';
import ImageCarousel from '../ImageCarousel';
import AppBar from 'material-ui/AppBar';
import MapWithASearchBox from '../MapWithASearchBox';

const BUTTONS = [
    { label: 'Essentials (towels, etc)', name: 'essentials' },
    { label: 'Wifi', name: 'wiFi' },
    { label: 'Heat', name: 'heat' },
    { label: 'Gym/ fitness center', name: 'gym' },
    { label: 'Washer/ dryer', name: 'washerDryer' },
    { label: 'Kitchen Appliances', name: 'kitchen' },
    { label: 'Closet/ drawers', name: 'dressers' },
    { label: 'Pool', name: 'pool' },
    { label: 'Parking', name: 'parking' },
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
                addToDbFunc={this.props.savePlaceImage}
                metaContext={{ placeId: this.props.place.place._id }}
                onUploadComplete={() => this.toggleUploadActive(true)}
                uploaderInstance="uploadPlaceToAmazonS3"
                onCloseClick={() => this.toggleUploadActive()}
                onUploading={() => this.setState({ isUploading: true })}
            />);
        } else {
            const remappedImages = images.map(image => ({ original: image.url, thumbnail: image.url, originalClass: "img-gal" }));
            component = <ImageCarousel images={remappedImages} extraProps={{ showBullets: true }} />;
        }
        const toggleText = !this.state.uploadActive ? '- Click to Add Photos' : '- Click to See Photos'
        return (
            <div className="image-section-container col s12">
                <AppBar
                    title={<span>Photos &amp; Videos<span onClick={this.toggleUploadActive} style={{ fontSize: '16px', cursor: 'pointer' }} role="button">{toggleText}</span></span>}
                    showMenuIconButton={false}
                    style={{ marginBottom: '10px', zIndex: '0' }}
                />
                {/* <div className="teal img-header">
                    <h3 className="container-desc">Photos & Video<span className="click-text" onClick={this.toggleUploadActive}> {images.length ? '- click to add more' : ''}</span></h3>
                </div> */}
                {component}
            </div>
        );
    }

    onSetLocation = cords => {
        this.getValueFunc('coords', cords);
    }

    toggleDisclaimer = () => this.setState({ showDisclaimer: !this.state.showDisclaimer });

    render() {
        const getValFunc = this.getValueFunc;
        const { place, address, amenities } = this.props.place;
        const dislaimerText = this.state.showDisclaimer
            ? 'Your address will be kept private for security reasons until you have confirmed to swap. If you do not wish to disclose your full address, we recommend using the closest intersection using the interactive map below. (i.e.. 14th st and 6th ave, New York, NY)'
            : 'Click to see security information about your address';
        return (
            <div className="place-container">
                <Address getValueFunc={(key, value) => this.props.getValueFunc('address', key, value)} defaultValues={address} />
                <div className="row">
                    <div className="address-disclaimer center-align col s12 m8 offset-m2" onClick={this.toggleDisclaimer} >{dislaimerText}</div>
                </div>
                <div className="col s12">
                    <div className="card-panel teal">
                        <span className="white-text">
                            Use the map below to determine where you wish the marker to appear when our community searches your listing.
                        </span>
                    </div>
                </div>
                <MapWithASearchBox
                    onSetLocation={this.onSetLocation}
                    place={place}
                />
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
                    <div className="col s6 input-field inline">
                        <label htmlFor="rent"><i className="fa fa-usd" aria-hidden="true"></i> Current Monthly Rent</label>
                        <input type="number" min="0" className="" id="rent" onChange={e => getValFunc('rent', onChangeHelper(e))} defaultValue={place.rent} />
                    </div>
                    <div className="col s6 input-field inline">
                        <input type="number" className="" id="beds" min="0" onChange={e => getValFunc('beds', onChangeHelper(e))} defaultValue={place.beds} />
                        <label htmlFor="beds"><i className="fa fa-bed" aria-hidden="true"></i> Guest beds Available</label>
                    </div>
                    <div className="col s6 input-field inline">
                        <input type="number" className="" id="bathrooms" min="0" onChange={e => getValFunc('bathrooms', onChangeHelper(e))} defaultValue={place.bathrooms} />
                        <label htmlFor="bathrooms"><i className="fa fa-bath" aria-hidden="true"></i> Guest Baths Available</label>
                    </div>
                    <div className="col s6 input-field inline">
                        <input type="number" className="" id="guest-cap" onChange={e => getValFunc('numOfGuests', onChangeHelper(e))} defaultValue={place.numOfGuests} />
                        <label htmlFor="guest-cap"><i className="fa fa-users" aria-hidden="true"></i> Sleeps how many</label>
                    </div>
                    <div className="col s6 input-field">
                        <label htmlFor="bedroom-count"><i className="fa fa-bed" aria-hidden="true"></i> Guest Bedrooms Available</label>
                        <input type="number" className="" id="bedroom-count" onChange={e => getValFunc('bedrooms', onChangeHelper(e))} defaultValue={place.bedrooms} />
                    </div>
                    <div className="col s6 input-field inline" style={{ paddingRight: '0px' }}>
                        <label htmlFor="pet-type">What kind of pets are allowed?</label>
                        <input type="text" className="" id="pet-type" onChange={e => getValFunc('typeOfPets', onChangeHelper(e))} defaultValue={place.typeOfPets} />
                    </div>
                    <div className="col s12 m6 custom-switch" >
                        <div>Smoking Allowed?</div>
                        <div className="switch">
                            <label>
                                No
                                <input type="checkbox" onChange={e => this.checkBoxHelper(e, 'smoking')} checked={this.state.smoking || false} />
                                <span className="lever"></span>
                                Yes
                            </label>
                        </div>
                    </div>
                    <div className="col s12 m6 custom-switch" >
                        <div>Allow Pets?</div>
                        <div className="switch">
                            <label>
                                No
                                <input type="checkbox" onChange={e => this.checkBoxHelper(e, 'pets')} checked={this.state.pets || false} />
                                <span className="lever"></span>
                                Yes
                            </label>
                        </div>
                    </div>
                    <div className="col s6 input-field inline" >
                    {/* <SelectBuilder
                        label={<span><i className="fa fa-home fa-1x" aria-hidden="true"></i>Home type</span>}
                        onChange={value => getValueFunc('', value)}
                        selectArrObj={}
                        selectArrObj={genderFields.fields}
                        defaultSelection={genderFields.defaultField}
                        defaultValue={profile.gender}
                        extraProps={{ floatingLabelFixed: true }}

                    /> */}
                    </div>
                    <div className="amenities-container">
                        <ButtonArrayComp
                            getValueFunc={(key, value) => this.props.getValueFunc('amenities', key, value)}
                            defaultValues={amenities}
                            buttonData={BUTTONS}
                        />
                    </div>
                    <div className="col s12">
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
                    <div className="col s12">
                        <TextFieldStandardized
                            floatingLabelText="Special Instructions?"
                            onChange={(e, value) => getValFunc('specialInst', value)}
                            extraProps={{ defaultValue: place.specialInst }}
                        />
                    </div>
                    <div className="col s12">
                        <TextFieldStandardized
                            floatingLabelText="About the Area (Transportation, What's Near, etc.)"
                            onChange={(e, value) => getValFunc('notesOnArea', value)}
                            extraProps={{ defaultValue: place.notesOnArea }}
                        />
                    </div>
                    {this.getImageSection(this.props.placeImages)}
                    <div className="col s12">
                        <div className="row">
                            <div className="col s6 m4 l3 offset-s6 offset-m8 offset-l9">
                                <button
                                    className="waves-effect waves-light btn-large"
                                    type="submit"
                                    style={{ width: '100%' }}
                                    onClick={this.props.savePlace}
                                >
                                    <i className="fa fa-floppy-o fa-1x" aria-hidden="true" style={{ float: 'left' }} />Save
                                </button>
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
};

export default PlaceComponent;