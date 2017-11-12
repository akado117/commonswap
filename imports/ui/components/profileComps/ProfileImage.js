import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Uploader from '../Uploader';


class ProfileImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderActive: false,
            isUploading: false,
        };
    }

    toggleUploader = (isComplete) => {
        if(!isComplete && this.state.isUploading) return;
        this.setState({ uploaderActive: !this.state.uploaderActive, isUploading: false })
    }

    getUploader = () => {
        if (!this.state.uploaderActive) return null;
        return (<div className="uploader-wrapper">
            <Uploader
                addToDbFunc={this.props.saveProfileImage}
                metaContext={{ profileId: this.props.profile._id }}
                onUploadComplete={() => this.toggleUploader(true)}
                uploaderInstance="uploadProfileToAmazonS3"
                onUploading={() => this.setState({ isUploading: true })}
                onCloseClick={() => this.toggleUploader()}
                multiple={false}
            /></div>);
    }

    toggleUploader = () => this.setState({ uploaderActive: !this.state.uploaderActive });

    render() {
        let content;
        if (this.state.uploaderActive) {
            content = this.getUploader();
        } else {
            content = this.props.imageSrc ? (
                <button onClick={this.toggleUploader} style={{ border: 'none', background: 'transparent' }}>
                    <img src={this.props.imageSrc} alt="" />
                </button>)
                : (
                    <div>
                        <h4>Profile Page</h4>
                        <div className="col s12">
                            <i className="fa fa-user-circle fa-4x" aria-hidden="true"/>
                        </div>
                        <div className="col s12">
                            <p><i className="fa fa-plus-square-o fa-2x" aria-hidden="true"/> Add Photo</p>
                        </div>
                    </div>);
        }
        return (
            <div
                className="profile-image-container"
                id="header-inner"
                role="button"
                tabIndex="0"
            >
                {content}
            </div>);

    }
}

ProfileImage.propTypes = {
    imageSrc: PropTypes.string,
    saveProfileImage: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

ProfileImage.defaultProps = {
    imageSrc: '',
}


export default ProfileImage;