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
            this.setState({ resizing: true }, () => setTimeout(() => this.uploadtoS3(this.props.file), 0));
        }
        if (prevState.isUploading && !this.state.isUploading) {
            this.props.onUploadComplete();
        }
    }

    getFilePart(file) {
        let filePart;
        if (file.slice) {
            filePart = file.slice(0, 131072);
        } else if (file.webkitSlice) {
            filePart = file.webkitSlice(0, 131072);
        } else if (file.mozSlice) {
            filePart = file.mozSlice(0, 131072);
        } else {
            filePart = file;
        }
        return filePart;
    }

    getOrientation(file, callback) {
        var reader = new FileReader();
        reader.onload = function(e) {

            var view = new DataView(e.target.result);
            if (view.getUint16(0, false) != 0xFFD8) return callback(-2);
            var length = view.byteLength, offset = 2;
            while (offset < length) {
                var marker = view.getUint16(offset, false);
                offset += 2;
                if (marker == 0xFFE1) {
                    if (view.getUint32(offset += 2, false) != 0x45786966) return callback(-1);
                    var little = view.getUint16(offset += 6, false) == 0x4949;
                    offset += view.getUint32(offset + 4, little);
                    var tags = view.getUint16(offset, little);
                    offset += 2;
                    for (var i = 0; i < tags; i++)
                        if (view.getUint16(offset + (i * 12), little) == 0x0112)
                            return callback(view.getUint16(offset + (i * 12) + 8, little));
                }
                else if ((marker & 0xFF00) != 0xFF00) break;
                else offset += view.getUint16(offset, false);
            }
            return callback(-1);
        };
        reader.readAsArrayBuffer(file);
    }

    rotateImageBasedOnOrientation(orientation, ctx, canvas) {
        const { height, width } = canvas;
        ctx.save();
        if (orientation > 4) {
            canvas.width = height;
            canvas.height = width;
        }
        ctx.translate(canvas.width / 2, canvas.height / 2);
        switch (orientation) {
        case 2:
            // horizontal flip
            //ctx.translate(canvas.width, 0);
            ctx.scale(-1, 1);
            break;
        case 3:
            // 180° rotate left
            //ctx.translate(canvas.width, canvas.height);
            ctx.rotate(Math.PI);
            break;
        case 4:
            // vertical flip
            //ctx.translate(0, canvas.height);
            ctx.scale(1, -1);
            break;
        case 5:
            // vertical flip + 90 rotate right
            ctx.rotate(0.5 * Math.PI);
            ctx.scale(1, -1);
            break;
        case 6:
            // 90° rotate right
            ctx.rotate(0.5 * Math.PI);
            //ctx.translate(0, -canvas.height);
            break;
        case 7:
            // horizontal flip + 90 rotate right
            ctx.rotate(0.5 * Math.PI);
            //ctx.translate(canvas.width, -canvas.height);
            ctx.scale(-1, 1);
            break;
        case 8:
            // 90° rotate left
            ctx.rotate(-0.5 * Math.PI);
            //ctx.translate(-canvas.width, 0);
            break;
        }
    }
    drawtoCanvasFromBlob(ctx, blob, redrawnCanvas, imgDim) {
        return new Promise((res, rej) => {
            var img = new Image();

            img.onload = function() {
                ctx.drawImage(img, - imgDim.width / 2, - imgDim.height / 2);
                //window.image = img;
                //window.cvs = redrawnCanvas;
                //window.ctx = ctx;
                res({blob, redrawnCanvas});
            };

            img.src = URL.createObjectURL(blob);
        });
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
        let orientation;
        return new Promise((res, rej) => {
            this.getOrientation(file, res);
        }).then((orient) => {
            orientation = orient;
            return pica.resize(image, offPageCVS, this.state.picaOptions);
        }).then((result) => {
            return pica.toBlob(result, 'image/jpeg', 100);
        }).then(blob => {
            const ctx = offPageCVS.getContext('2d');
            this.rotateImageBasedOnOrientation(orientation, ctx, offPageCVS);
            return this.drawtoCanvasFromBlob(ctx, blob, offPageCVS, { width, height });
        }).then(({blob, redrawnCanvas}) => {
            return pica.toBlob(redrawnCanvas, 'image/jpeg', 100);
        }).then((blob) => {
            blob.name = file.name;
            blob.lastModified = file.lastModified;
            blob.lastModifiedDate = file.lastModifiedDate;
            console.log('resize ran');
            return blob;
        });
    }

    uploadtoS3 = (file) => {
        this.upload = new Slingshot.Upload(this.props.uploaderInstance, this.props.metaContext);//THIS HAS TO BE AN AVAILABLE SLINGSHOT INSTANCE
        this.calculateProgress();
        const { maxPicaDimensionProp } = this.props;
        const resizeDimensions = this.willNeedResize(file, maxPicaDimensionProp);
        new Promise((resolve, reject) => {
            if (maxPicaDimensionProp && resizeDimensions.resized) {
                console.log('about to pica');
                return resolve(this.picaResizeFunction(file, resizeDimensions));
            }
            console.log('pica skipped');
            return resolve(file);
        })
            .then(newFile => uploadToS3(this, newFile))
            .then((url) => {
                console.log('uploadComplete');
                this.uploadComputation.stop();
                this.props.addToDbFunc({ url, name: file.name, ...this.props.metaContext }, (error, resp) => {
                    if (error) {
                        this.setState({ isUploading: false, uploadProgress: 0, resizing: false });
                        return error;
                    }
                    if (!error && this.state.uploadProgress === 100) {
                        setTimeout(() => { this.setState({ isUploading: false, uploadProgress: 0, resizing: false }); }, 500);
                        return resp;
                    }
                });
            }).catch((error) => {
                this.setState({ isUploading: false, uploadProgress: 0, resizing: false });
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

//window.setOrientation = Uploaders.rotateImageBasedOnOrientation;

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
                    { this.state.files.length ? this.getUploaders(this.state.files, this.state.picaOptions) : this.props.uploaderText}
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
    uploaderText: PropTypes.string,
};

Uploader.defaultProps = {
    metaContext: {},
    onUploadComplete: () => {},
    multiple: true,
    onCloseClick: () => {},
    onUploading: () => {},
    maxPicaDimensionProp: undefined,
    uploaderText: 'Please drop files to upload into zone or click to open file picker',
};


export default Uploader;
