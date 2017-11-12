import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ProfileImage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const content = this.props.imageSrc ? <img src={this.props.imageSrc} />
            : (
                <div>
                    <h4>Profile Page</h4>
                    <div className="col s12">
                        <i className="fa fa-user-circle fa-4x" aria-hidden="true" />
                    </div>
                    <div className="col s12">
                        <p><i className="fa fa-plus-square-o fa-2x" aria-hidden="true" /> Add Photo</p>
                    </div>
                </div>);
        return (
            <div className="profile-image-container" id="header-inner">
                {content}
            </div>
        );
    }
}

ProfileImage.propTypes = {
    imageSrc: PropTypes.string,
}

ProfileImage.defaultProps = {
    imageSrc: '',
}


export default ProfileImage;