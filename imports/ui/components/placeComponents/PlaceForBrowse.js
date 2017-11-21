import React from 'react';
import PropTypes from 'prop-types';

const PlaceForBrowse = ({profile, address, profileImg, place}) => {
    return (
        <div className="browse-place-container col s12 z-depth-2 swap-card" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
            <div className="col s12 l5">
                <div className="premier-image" style={{ height: '100%' }}>
                    <img src={place.placeImgs[0] ? place.placeImgs[0].url : 'http://stretchflex.net/photos/apartment.jpeg'} alt="" />
                </div>
            </div>
            <div className="col s12 l7">
                <div className="row">
                    <div className="col s12">
                        <p><strong>{place.shortDesc}</strong></p>
                    </div>
                    <div className="col s12">
                        <div className="col s6 l5">
                            <p><i className="fa fa-users" aria-hidden="true"></i> Guests: {place.numOfGuests}</p>
                        </div>
                        <div className="col s6 l7">
                            <p><i className="fa fa-bed" aria-hidden="true"></i> Bedrooms: {place.bedrooms}</p>
                        </div>
                    </div>
                    <div className="col s12">
                        <div className="col s6 l5">
                            <p><i className="fa fa-bath" aria-hidden="true"></i> Baths: {place.bathrooms}</p>
                        </div>
                        <div className="col s6 l5">
                            <p><i className="fa fa-home" aria-hidden="true"></i> Partial Apt.</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col s6">
                        <div className="profile-image">
                            <img src={profileImg.url ? profileImg.url : 'http://stretchflex.net/photos/profileStock.jpeg'} alt="profDemo" style={{ height: '140px', width: '140px' }} />
                        </div>
                    </div>
                    <div className="col s6">
                        <div className="col s12 l4">
                            <p><strong>{profile.firstName}</strong></p>
                        </div>
                        <div className="col s12 l8">
                            <p><strong>{address.city} {address.state}</strong></p>
                        </div>
                        <div className="col l12">
                            <p>{profile.school} {profile.classOf}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

PlaceForBrowse.propTypes = {
    profile: PropTypes.object.isRequired,
    address: PropTypes.object.isRequired,
    profileImg: PropTypes.object.isRequired,
    place: PropTypes.object.isRequired,
}

export default PlaceForBrowse;