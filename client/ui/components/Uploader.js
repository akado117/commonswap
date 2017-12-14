import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Slingshot } from 'meteor/edgee:slingshot';
import Pica from 'pica';
import { merge, cloneDeep } from 'lodash';
import uploadToS3 from '../../../imports/helpers/upload-to-s3';
import Progress from './Progress';
import CloseButton from './forms/CloseButton';
import { MaxImageUploadDim } from '../../../imports/lib/Constants';
import { determineImageDimensions } from '../../../imports/helpers/DataHelpers';

let pica;

class Uploaders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resizing: false,
            isUploading: false,
            uploadProgress: 0,
            picaOptions: props.picaOptions,
        };
        this.picaResizeFunction.bind(this);
        this.willNeedResize.bind(this);
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

    willNeedResize(file, maxDimensionProp) {
        const image = new Image();
        image.src = file.preview;
        const dimensionsObject = determineImageDimensions(image.width, image.height, MaxImageUploadDim[maxDimensionProp]);
        dimensionsObject.image = image;
        return dimensionsObject;
    }

    picaResizeFunction(file, resizeDimensions) {
        const { width, height, resized, image } = resizeDimensions;
        if (!resized) {
            return file;
        };
        pica = pica || Pica(['js', 'wasm', 'ww']);
        const offPageCVS = document.createElement('canvas');
        offPageCVS.width = width;
        offPageCVS.height = height;
        return pica.resize(image, offPageCVS, this.state.picaOptions)
            .then(result => pica.toBlob(result, 'image/jpeg', 100))
            .then(blob => {
                console.log(blob);
                blob.name = file.name;
                blob.lastModified = file.lastModified;
                blob.lastModifiedDate = file.lastModifiedDate;
                console.log('pica ran', file);
                return blob;
            });
    }

    uploadtoS3 = (file) => {
        this.upload = new Slingshot.Upload(this.props.uploaderInstance, this.props.metaContext);//THIS HAS TO BE AN AVAILABLE SLINGSHOT INSTANCE
        this.calculateProgress();
        const { maxPicaDimensionProp } = this.props;
        const resizeDimensions = this.willNeedResize(file, maxPicaDimensionProp);
        if (resizeDimensions.resized) this.setState({ resizing: true });
        new Promise((resolve, reject) => {
            if (maxPicaDimensionProp) {
                console.log('about to pica', file);
                resolve(this.picaResizeFunction(file, resizeDimensions));
            }
            console.log('pica skipped', file);
            resolve(file);
        })
            .then(newFile => uploadToS3(this, newFile))
            .then((url) => {
                console.log('uploadComplete', file);
                this.uploadComputation.stop();
                this.props.addToDbFunc({ url, name: file.name, ...this.props.metaContext }, (error, resp) => {
                    if (error) {
                        this.setState({ isUploading: false, uploadProgress: 0 });
                        return error;
                    }
                    if (!error && this.state.uploadProgress === 100) {
                        setTimeout(() => { this.setState({ isUploading: false, uploadProgress: 0 }); }, 500);
                        return resp;
                    }
                });
            }).catch((error) => {
                this.setState({ isUploading: false, uploadProgress: 0 });
                console.log(error.message, 'danger');
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
                    : <div className={this.state.resizing ? 'resizing' : ''}><div className="overlay" /><img src={this.props.file.preview} alt="preview" /></div>}
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
    metaContext: PropTypes.object,
    picaOptions: PropTypes.object.isRequired,
    maxPicaDimensionProp: PropTypes.string,
}

Uploaders.defaultProps = {
    metaContext: {},
    maxPicaDimensionProp: '',
}

const initialState = {
    files: [],
    triggerUpload: false,
    uploadComplete: {},
    picaOptions: {
        quality: 3,
        alpha: true,
        unsharpAmount: 73,
        unsharpRadius: 0.6,
        unsharpThreshold: 8,
        transferable: true,
    },
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
        this.setState({ uploadComplete: merge({}, this.state.uploadComplete, { [idx]: true })} );
    }

    onUploadComplete = () => {
        this.setState(initialState);
        this.props.onUploadComplete();
    }

    canUpload = (upload) => {
        if (!Object.keys(upload).length) return false;
        let uploadCompleted = true;
        Object.keys(upload).forEach((key) => {
            if (!upload[key]) uploadCompleted = upload[key];
        });
        return uploadCompleted;
    }

    triggerUpload = () => {
        if (this.state.files.length) {
            this.setState({ triggerUpload: true });
            this.props.onUploading();
        }
    }

    removeFile = (idx) => {
        const files = cloneDeep(this.state.files);
        delete files.splice(idx, 1);
        this.setState({ files, uploadComplete: this.buildUploadCompleteObj(files) });
    }

    getUploaders = (files, picaOptions) => files.map((file, idx) => (
        <Uploaders
            key={`uploader-${idx}`}
            uploaderInstance={this.props.uploaderInstance}
            uploadTrigger={this.state.triggerUpload}
            onUploadComplete={() => this.markFileUploadComplete(idx)}
            file={file}
            deleteFunc={() => this.removeFile(idx)}
            addToDbFunc={this.props.addToDbFunc}
            metaContext={this.props.metaContext}
            picaOptions={picaOptions}
            maxPicaDimensionProp={this.props.maxPicaDimensionProp}
        />
    ));

    onCloseClick = (e) => {
        e.stopPropagation();
        this.props.onCloseClick();
    }

    render() {
        const { onCloseClick } = this.props;
        return (
            <div className="uploader">
                <Dropzone className="dropzone col s12" onDrop={this.onDrop} multiple={this.props.multiple} >
                    <CloseButton onClick={this.onCloseClick} />
                    { this.state.files.length ? this.getUploaders(this.state.files, this.state.picaOptions) : 'Please drop files to upload into zone or click to open file picker'}
                </Dropzone>
                <button className="waves-effect waves-light btn-large col s6 m4 l3 offset-s6 offset-m8 offset-l9" disabled={this.canUpload(this.state.uploadComplete)} onClick={this.triggerUpload}>Upload</button>
            </div>);
    }
}

Uploader.propTypes = {
    addToDbFunc: PropTypes.func.isRequired,
    metaContext: PropTypes.object,
    onUploadComplete: PropTypes.func,
    uploaderInstance: PropTypes.string.isRequired,
    multiple: PropTypes.bool,
    onCloseClick: PropTypes.func,
    onUploading: PropTypes.func,
    maxPicaDimensionProp: PropTypes.string,

};

Uploader.defaultProps = {
    metaContext: {},
    onUploadComplete: () => {},
    multiple: true,
    onCloseClick: () => {},
    onUploading: () => {},
    maxPicaDimensionProp: undefined,
};

export default Uploader;
