import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import ImageCarousel from '../ImageCarousel';

const PlaceForBrowse = ({placeForBrowse, address, profileImg, placeImgs, profile, goToProfile }) => {
    const remappedImages = placeImgs.map(image => ({ original: image.url, thumbnail: image.url, originalClass: "img-gal" }));
    return (
        <div className="browse-place-container row z-depth-2 swap-card" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
            <div className="col s12 l5 place-images">
                {remappedImages.length ? <ImageCarousel images={remappedImages} extraProps={{ showBullets: true }} /> : ''}
            </div>
            <div className="col s12 l7">
                <div className="row">
                    <div className="col s12">
                        <p><strong>{placeForBrowse.shortDesc}</strong></p>
                    </div>
                    <div className="col s12">
                        <div className="col s6 l5">
                            <p><i className="fa fa-users" aria-hidden="true"></i> Guests: {placeForBrowse.numOfGuests}</p>
                        </div>
                        <div className="col s6 l7">
                            <p><i className="fa fa-bed" aria-hidden="true"></i> Bedrooms: {placeForBrowse.bedrooms}</p>
                        </div>
                    </div>
                    <div className="col s12">
                        <div className="col s6 l5">
                            <p><i className="fa fa-bath" aria-hidden="true"></i> Baths: {placeForBrowse.bathrooms}</p>
                        </div>
                        <div className="col s6 l5">
                            <p><i className="fa fa-home" aria-hidden="true"></i> Partial Apt.</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col s6 profile-image-container">
                        <div className="profile-image">
                            <img src={profileImg.url ? profileImg.url : 'http://stretchflex.net/photos/profileStock.jpeg'} alt="profDemo" style={{ height: '140px', width: '140px' }} />
                        </div>
                    </div>
                    <div className="col s6 profile-info">
                        <div className="col s12 l4">
                            <p><strong>{profile.firstName}</strong></p>
                        </div>
                        <div className="col s12 l8">
                            <p><strong>{address.city} {address.state}</strong></p>
                        </div>
                        <div className="col l12">
                            <p>{profile.school} {profile.classOf}</p>
                        </div>
                        <div className="col s8">
                            <RaisedButton
                                className="see-profile waves-effect waves-light"
                                target="_blank"
                                label="See Profile"
                                primary={true}
                                icon={<FontIcon className="material-icons">account_circle</FontIcon>}
                                onClick={goToProfile}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

PlaceForBrowse.propTypes = {
    placeForBrowse: PropTypes.object.isRequired,
    address: PropTypes.object.isRequired,
    profileImg: PropTypes.object,
    placeImgs: PropTypes.array,
    profile: PropTypes.object.isRequired,
    goToProfile: PropTypes.func.isRequired,
};

PlaceForBrowse.defaultProps = {
    profileImg: {},
    placeImgs: [],
};

export default PlaceForBrowse;