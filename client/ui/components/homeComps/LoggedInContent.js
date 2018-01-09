import React from 'react';
import PropTypes from 'prop-types';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { defaultImageUrls } from '../../../../imports/lib/Constants';

const defaultCommunityMembers = [
    {
        about: 'Hello! My name is Mike and I work in marketing. I am a big fan of traveling, trying out new restaurants, and attending music festivals. My favorite sports team is the Lakers and my favorite music artist is Drake.  Feel free to reach out to learn more!',
        name: 'Kevin',
        imgUrl: defaultImageUrls.kevin,
    },
    {
        about: 'Hello! My name is Mike and I work in marketing. I am a big fan of traveling, trying out new restaurants, and attending music festivals. My favorite sports team is the Lakers and my favorite music artist is Drake.  Feel free to reach out to learn more!',
        name: 'Kevin',
        imgUrl: defaultImageUrls.kevin,
    },
    {
        about: 'Hello! My name is Mike and I work in marketing. I am a big fan of traveling, trying out new restaurants, and attending music festivals. My favorite sports team is the Lakers and my favorite music artist is Drake.  Feel free to reach out to learn more!',
        name: 'Kevin',
        imgUrl: defaultImageUrls.kevin,
    },
]

function LoggedInContent({ communityMembers }) {
    const members = communityMembers.map(comMem => (
        <div className="col s12 l4">
            <div className="trip-image">
                <img src={comMem.imgUrl} alt="" />
            </div>
            <div className="name center-align">
                <p>{comMem.name}</p>
            </div>
            <div className="person-desc center-align">
                <p>{comMem.about}</p>
            </div>
        </div>
    ));
    return (
        <div>
            <div className="col s12">
                <div className="row">
                    <div className="col s12 l6 cities-select">
                        <div className="col s12 center-align">
                            <h5>Select Desired Cities</h5>
                            <DropDownMenu className="cities-selector" autoWidth={false} style={{ width: 300 }}>
                                <MenuItem value={1} primaryText="Columbus" />
                                <MenuItem value={2} primaryText="New York" />
                                <MenuItem value={3} primaryText="San Francisco" />
                                <MenuItem value={4} primaryText="Washington DC" />
                                <MenuItem value={5} primaryText="Los Angelos" />
                            </DropDownMenu>
                            {/* <SelectBuilder
                             label={<span>Select Desired Cities</span>}
                             onChange={value => getValueFunc('gender', value)}
                             selectArrObj={genderFields.fields}
                             defaultSelection={genderFields.defaultField}
                             defaultValue={profile.gender}
                             extraProps={{ floatingLabelFixed: true }}
                             /> */}
                        </div>
                        <div className="col s12 center-align">
                            <RaisedButton
                                label="Search"
                                containerElement="label"
                                icon={<FontIcon className="fa fa-search" />}
                                className="sign-button"
                                primary={true}
                            />
                        </div>
                    </div>
                    <div className="col s12 l6 center-align mobile-holiday">
                        <img className="holiday-img" src="https://s3.us-east-2.amazonaws.com/cslistingphotos/home/holidayHome.png" alt="holidayDates" />
                    </div>
                </div>
            </div>
            <div className="col s12 how-title">
                <div className="row">
                    <div className="col s12 center-align">
                        <h2 className="how-title">OUR COMMUNITY</h2>
                    </div>
                </div>
            </div>
            <div className="col s12">
                <div className="row">
                    <div className="col s12">
                        <h5 className="community-city">
                            New York
                        </h5>
                    </div>
                    {members}
                </div>
                <div className="col s12 center-align">
                    <RaisedButton
                        label="Browse More"
                        containerElement="label"
                        className="sign-button"
                        primary={true}
                    />
                </div>
            </div>
        </div>
    );
}

LoggedInContent.propTypes = {
    communityMembers: PropTypes.array,
};

LoggedInContent.defaultProps = {
    communityMembers: defaultCommunityMembers
};

export default LoggedInContent;