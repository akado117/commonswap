import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { connect }  from 'react-redux';
import React  from 'react';

import Pagination from '../components/Pagination';
import changePage from '../actions/ChangePage';
import { Places, FileUrls } from '../../../imports/collections/mainCollection';
import Uploader from '../components/Uploader';

import ImageList from '../components/ImageList';
import ImageCarousel from '../components/ImageCarousel';

class ImagePOC extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {dispatch} = this.props;
        const pagination = this.props.imageCount > 20 ? (
            <Pagination
                handlePageClick={(data)=> {return dispatch(changePage(data.selected));}}
                pageCount={this.props.imageCount / 20}
            />) : '';
        const remappedImages = this.props.imageList.map(image => ({original: image.url, thumbnail: image.url, originalClass:"img-gal" }));
        return(
            <div className="container">
                <ImageCarousel images={remappedImages} />
                //<Uploader addToDbFunc={(dataObj, cb) => Meteor.call('files.store', dataObj, cb)}/>
                <ImageList images={this.props.imageList} />
                {pagination}
            </div>
        )
    }
}


//hooks meteor container up so data streams can be subscribed to.
//inserts these as props via their key name
//takes props already present on page, aka pageSkip and visibility to know what items to grab
const ImagePOCContainer = withTracker(({pageSkip, filter = {}}) => {
    const imageSub = Meteor.subscribe('getImages', pageSkip, filter);
    const placeSub = Meteor.subscribe('places', pageSkip, filter);
    const placesPOC = Places;
    return {
        imageSubReady: imageSub.ready(),
        imageList: FileUrls.find({}).fetch() || [],
        imageCount: Counts.get('ImageCount'),
        currentUser: Meteor.user(),
    };
})(ImagePOC);

function mapStateToProps(state) {
    return {
        //filter: state.filter.search,
        pageSkip: state.pageSkip,
    };
}
//can also feed in dispatch mapper - this prevents the need to wrap every action function in dispatch
export default connect(mapStateToProps)(ImagePOCContainer);