import React, { Component } from 'react';


class ProfileImage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="col s6" id="header-inner" style={{ position: 'fixed', display: 'block' }}>
                <h4>Profile Page</h4>
                <div className="col s6 offset-s2">
                    <i className="fa fa-user-circle fa-4x" aria-hidden="true"></i>
                </div>
                <div className="col s12">
                    <p><i className="fa fa-plus-square-o fa-2x" aria-hidden="true"></i> Add Photo</p>
                    <input type="file" value={this.state.picture} />
                </div>
            </div>
        );
    }
}

export default ProfileImage;