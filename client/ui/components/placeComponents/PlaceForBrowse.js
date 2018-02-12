import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import ImageCarousel from '../ImageCarousel';

const PlaceForBrowse = ({ placeForBrowse, address, profileImg, placeImgs, profile, goToProfile, noZDepth }) => {
    const remappedImages = placeImgs.map(image => ({ original: image.url, thumbnail: image.url, originalClass: "img-gal" }));
    return (
        <div className={`${noZDepth ? '' : 'z-depth-2'} browse-place-container`} style={{ marginBottom: '20px' }}>
            <div className="row reduced-row-margin">
                <div className="col s6 m12 profile-image-container">
                    <div className="profile-image">
                        <img src={profileImg.url ? profileImg.url : 'http://stretchflex.net/photos/profileStock.jpeg'} alt="profDemo" style={{ height: '140px', width: '140px' }} />
                    </div>
                </div>
                <div className="user-text col s6 m12">
                    <p className="marg-top"><strong>{profile.firstName}</strong></p>
                    <p className="marg-top">{address.city}, {address.state}</p>
                    <p className="marg-top">{profile.occupation}</p>
                    <p className="marg-top">{profile.school}</p>
                </div>
            </div>
            <div className="row reduced-row-margin">
                <div className="col s6">
                    <p>{placeForBrowse.access}</p>
                </div>
                <div className="col s6">
                    <p><i className="fa fa-bed" aria-hidden="true"></i> Beds: {placeForBrowse.bedrooms}</p>
                </div>
                <div className="col s6">
                    <p><i className="fa fa-bath" aria-hidden="true"></i> Baths: {placeForBrowse.bathrooms}</p>
                </div>
                <div className="col s6">
                    <p><i className="fa fa-home" aria-hidden="true"></i> Partial Apt.</p>
                </div>
            </div>
            <div className="row reduced-row-margin">
                <div className="col s12">
                    <p>About {profile.firstName}:</p>
                </div>
                <div className="col s12 summary-container">
                    {profile.personalSummary}
                </div>
            </div>
            <div className="row reduced-row-margin">
                <div className="col s12 profile-info">
                    <div className="col s12">
                        <RaisedButton
                            className="see-profile waves-effect waves-light col s12 no-pad"
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
    );
}

PlaceForBrowse.propTypes = {
    placeForBrowse: PropTypes.object.isRequired,
    address: PropTypes.object.isRequired,
    profileImg: PropTypes.object,
    placeImgs: PropTypes.array,
    profile: PropTypes.object.isRequired,
    goToProfile: PropTypes.func.isRequired,
    noZDepth: PropTypes.bool,
};

PlaceForBrowse.defaultProps = {
    profileImg: {},
    placeImgs: [],
    profile: {},
    address: {},
};

export default PlaceForBrowse;