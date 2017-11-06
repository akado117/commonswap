import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Slingshot } from 'meteor/edgee:slingshot';
import uploadToS3 from '../../helpers/upload-to-s3';
import Progress from './Progress';
import Pica from 'pica';
import _ from 'lodash';

class Uploaders extends React.Component {
    constructor() {
        super();
        this.state = {
            isUploading: false,
            uploadProgress: 0,
        };
    }

    calculateProgress() {
        this.uploadComputation = Tracker.autorun(() => {
            const uploadProgress = Math.round(this.upload.progress() * 100);
            if (!isNaN(uploadProgress)) this.setState({ uploadProgress });
        });
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (!prevProps.uploadTrigger && this.props.uploadTrigger && this.props.file) {
            this.uploadtoS3(this.props.file);
        }
        if (prevState.isUploading && !this.state.isUploading) {
            this.props.onUploadComplete();
        }
    }

    uploadtoS3 = (file) => {
        this.upload = new Slingshot.Upload(this.props.uploaderInstance);//THIS HAS TO BE AN AVAILABLE SLINGSHOT INSTANCE
        this.calculateProgress();
        const pica = Pica();
        uploadToS3(this, file).then((url) => {
            this.uploadComputation.stop();
            this.props.addToDbFunc({ url, name: file.name }, (error, resp) => {
                if (error) {
                    this.setState({ isUploading: false, uploadProgress: 0 });
                    return error;
                }

                if (!error && this.state.uploadProgress === 100) {
                    setTimeout(() => { this.setState({ isUploading: false, uploadProgress: 0 }); }, 500);
                    return resp;
                }
            });
        })
            .catch((error) => {
                this.setState({ isUploading: false, uploadProgress: 0 });
                console.log(error.reason, 'danger');
            });
    }

    deleteHandler = (e) => {
        e.stopPropagation();
        this.props.deleteFunc();
    }

    render() {
        return (
            <div className="preview-container">
                {this.props.deleteFunc && !this.state.isUploading ?  <button className="delete" onClick={this.deleteHandler}>&times;</button> : ''}
                {this.state.isUploading ?
                    <div className="progress-container"><Progress bottom={ this.state.uploadProgress } top={ 100 } /></div>
                    : <img src={this.props.file.preview} alt="preview" />}
            </div>);
    }
}

Uploaders.propTypes = {
    file: PropTypes.object.isRequired,
    uploaderInstance: PropTypes.string.isRequired,
    addToDbFunc: PropTypes.func.isRequired,
    uploadTrigger: PropTypes.bool.isRequired,
    onUploadComplete: PropTypes.func.isRequired,
    deleteFunc: PropTypes.func,
}

const initialState = {
    files: [],
    triggerUpload: false,
    uploadComplete: {},
};

class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (!this.canUpload(prevState.uploadComplete) && this.canUpload(this.state.uploadComplete)) { //cant trigger with zero files and when new files added it would still go from false to false
            this.onUploadComplete();
        }
    }

    onDrop = (files) => {
        if (this.state.triggerUpload) return;
        const newFiles = files.concat(this.state.files);
        this.setState({ files: newFiles, uploadComplete: this.buildUploadCompleteObj(newFiles) });
    }

    buildUploadCompleteObj = (files) => {
        const uploadComplete = {};
        files.forEach((file, idx) => { uploadComplete[idx] = false; });
        return uploadComplete;
    }

    markFileUploadComplete = (idx) => {
        this.setState({ uploadComplete: _.merge({}, this.state.uploadComplete, { [idx]: true })} );
    }

    onUploadComplete = () => {
        this.setState(initialState);
    }

    canUpload = (upload) => {
        if (!Object.keys(upload).length) return false;
        let uploadCompleted = true;
        Object.keys(upload).forEach((key) => {
            uploadCompleted = upload[key];
        });
        return uploadCompleted;
    }

    triggerUpload = () => {
        if (this.state.files.length) this.setState({ triggerUpload: true });
    }

    removeFile = (idx) => {
        const files = _.cloneDeep(this.state.files);
        delete files.splice(idx, 1);
        this.setState({ files, uploadComplete: this.buildUploadCompleteObj(files) });
    }

    render() {
        return (<div className="uploader row">
            <Dropzone className="dropzone col s12" onDrop={this.onDrop}>
                {
                    this.state.files.map((file, idx) => (
                        <Uploaders
                        key={`uploader-${idx}`}
                            uploaderInstance="uploadPlaceToAmazonS3"
                            uploadTrigger={this.state.triggerUpload}
                            onUploadComplete={() => this.markFileUploadComplete(idx)}
                            file={file}
                            deleteFunc={() => this.removeFile(idx)}
                        addToDbFunc={this.props.addToDbFunc}
                        />
                        ))
                }
            </Dropzone>
            <button className="waves-effect waves-light btn-large col s6 m4 l3 offset-s6 offset-m8 offset-l9" disabled={this.canUpload(this.state.uploadComplete)} onClick={this.triggerUpload}>Upload</button>
        </div>);
    }
}

Uploader.propTypes = {
    addToDbFunc: PropTypes.func.isRequired,
};

export default Uploader;
