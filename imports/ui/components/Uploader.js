import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Slingshot } from 'meteor/edgee:slingshot';
import uploadToS3 from '../../helpers/upload-to-s3';
import Progress from './Progress';
import Pica from 'pica';

class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUploading: false,
      uploadProgress: 0,
    };

    this.calculateProgress = this.calculateProgress.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  calculateProgress() {
    this.uploadComputation = Tracker.autorun(() => {
      const uploadProgress = Math.round(this.upload.progress() * 100);
      if (!isNaN(uploadProgress)) this.setState({ uploadProgress });
    });
  }

  handleUpload(event) {
    this.upload = new Slingshot.Upload('uploadPlaceToAmazonS3');
    this.calculateProgress();
    const file = event.target.files[0];
    const pica = Pica();
    uploadToS3(this, file).then((url) => {
      this.uploadComputation.stop();
      Meteor.call('files.store', { url, name: file.name }, (error) => {
        if (error) {
          this.setState({ isUploading: false, uploadProgress: 0 });
          console.log(error.reason, 'danger');
        }

        if (!error && this.state.uploadProgress === 100) {
          setTimeout(() => { this.setState({ isUploading: false, uploadProgress: 0 }); }, 500);
          console.log('File uploaded!', 'success');
        }
      });
    })
    .catch((error) => {
      this.setState({ isUploading: false, uploadProgress: 0 });
      console.log(error.reason, 'danger');
    });
  }

  render() {
    return (<div className="Uploader">
      {
        this.state.isUploading ?
        <Progress bottom={ this.state.uploadProgress } top={ 100 } /> :
        <div>
          <input
            onChange={ this.handleUpload }
            type="file"
            name="Uploader"
          />
          <p><i className="fa fa-cloud-upload" /> <span>Click or Drop Files to Upload</span></p>
        </div>
      }
    </div>);
  }
}

Uploader.propTypes = {};

export default Uploader;
