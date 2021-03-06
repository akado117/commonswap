export const FAILURE = 'FAILURE';
export const SUCCESS = 'SUCCESS';
export const genericSuccessCode = 10;
export const imageSuccessCode = 11;
export const profileErrorCode = 21;
export const insufficentParamsCode = 22;
export const upsertFailedCode = 23;
export const placeErrorCode = 24;
export const plannerErrorCode = 25;
export const mongoFindOneError = 26;
export const tripErrorCode = 27;

export const FileTypes = {
    PLACE: 'PLACE',
    PROFILE: 'PROFILE',
};

export const stateFields = {
    fields: {
        displayNames: ["N/A", "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Maryland", "Massachusetts", "Michigan",
            "Minnesota", "Mississippi", "Missouri", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
        ],
        values: ["N/A", "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VI", "VA", "WA", "WV", "WI", "WY"],
    },
};

export const Google_address_components = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name',
};

export const googleAddressCompsToCSAddressData = {
    street_number: 'streetAdd1',
    route: 'streetAdd2',
    locality: 'city',
    administrative_area_level_1: 'state',
    country: 'country',
    postal_code: 'zip',
};

export const loginTypes = {
    google: 'google',
    facebook: 'facebook',
    twitter: 'twitter',
}

export const defaultImageUrls = {
    assets: {
        checkMark: 'https://s3.us-east-2.amazonaws.com/com-swap-prod/static/checkMark.png',
        loadingSpinner: 'https://s3.us-east-2.amazonaws.com/com-swap-prod/static/fidget-spinner.gif',
        mainLogo: 'https://s3.us-east-2.amazonaws.com/cslistingphotos/home/cSwapLogo2.JPG',
    },
    videos: {
        homeVideoPoster: 'https://s3.us-east-2.amazonaws.com/cslistingphotos/videos/dreamPoster.png',
        homeVideo: 'https://s3.us-east-2.amazonaws.com/cslistingphotos/videos/Following+my+Dreams+Changed+my+Life+WR.m4v',
        whoAreWePoster: 'https://s3.us-east-2.amazonaws.com/cslistingphotos/home/playbutton.png',
        whoAreWe: 'https://s3.us-east-2.amazonaws.com/cslistingphotos/videos/CommonSwap+Demo+Video_WR.m4v',
    },
    homeAssets: {
        joinHome: 'https://s3.us-east-2.amazonaws.com/cslistingphotos/home/joinHome.png',
        bookHome: 'https://s3.us-east-2.amazonaws.com/cslistingphotos/home/bookHome.png',
        travelHome: 'https://s3.us-east-2.amazonaws.com/cslistingphotos/home/travelHome.jpg',
        quotes: 'https://s3.us-east-2.amazonaws.com/cslistingphotos/home/quotes.png',
        moneyhome: 'https://s3.us-east-2.amazonaws.com/cslistingphotos/home/money-transparent.png',
        planeHome: 'https://s3.us-east-2.amazonaws.com/cslistingphotos/home/airplane-transparent.png',
        conHome: 'https://s3.us-east-2.amazonaws.com/cslistingphotos/home/handshake-transparent.png',
        alysa: 'https://s3.us-east-2.amazonaws.com/cslistingphotos/home/alyssa.png',
        amjed: 'https://s3.us-east-2.amazonaws.com/cslistingphotos/home/amjed.png',
        bolai: 'https://s3.us-east-2.amazonaws.com/cslistingphotos/home/bolaji.png',
    },
    cameraDude: 'https://s3.us-east-2.amazonaws.com/cslistingphotos/home/profStock.jpeg',
    kevin: 'https://s3.us-east-2.amazonaws.com/com-swap-prod/static/profile_images/kevProf.JPG',
    alex: 'https://s3.us-east-2.amazonaws.com/com-swap-prod/static/profile_images/AKprofile.png',
    tim: 'https://com-swap-images-dev.s3-us-east-2.amazonaws.com/customers/-1123435525/profile/Image uploaded from iOS (1).jpg',
    alec: 'http://graph.facebook.com/10214567323439151/picture/?type=large',
    sassyChick: 'https://s3.us-east-2.amazonaws.com/com-swap-prod/static/profile_images/rsz_1profilestock2.jpg',
    awesomePlace: 'https://s3.us-east-2.amazonaws.com/com-swap-prod/static/rsz_apartment.jpg',
};

export const tripStatus = {
    ACTIVE: 'ACTIVE', //accepted and paid
    ACCEPTED: 'ACCEPTED',
    COMPLETE: 'COMPLETE',
    PENDING: 'PENDING',
    DECLINED: 'DECLINED',
};

export const serviceErrorBuilder = (message, code, err = {}, extraParams = {}) => ({
    message,
    code,
    servicesStatus: FAILURE,
    err: {
        stack: err.stack,
        message: err.message,
    },
    ...extraParams,
});
export const serviceSuccessBuilder = (data, code, extraParams = {}) => ({
    response: data,
    code,
    servicesStatus: SUCCESS,
    ...extraParams,
});
export const consoleErrorHelper = (message, code, userId, error = {}, extraParams) => {
    console.error(`${new Date().toLocaleString()}: ${userId}, ${code}, ${message}`);
    if (extraParams) console.error(JSON.stringify(extraParams));
    console.error(error.message);
    console.error(error.stack);

};
export const consoleLogHelper = (message, code, userId, error = '') => {
    console.log(`${new Date().toLocaleString()}: ${userId}, ${code}, ${message}, ${error}`)
};

export const FieldsForBrowseProfile = {
    _id: 1,
    ownerUserId: 1,
    userId: 1,
    profileId: 1,
    placeId: 1,
    placeImgs: 1,
    shortDesc: 1,
    numOfGuests: 1,
    bedrooms: 1,
    access: 1,
    bathrooms: 1,
    coords: 1,
    url: 1,
    firstName: 1,
    city: 1,
    state: 1,
    school: 1,
    classOf: 1,
    occupation: 1,
    profileImg: 1,
    interests: 1,
    amenities: 1,
    address: 1,
    profile: 1,
    specialInst: 1,
    recommendations: 1,
    generalNotes: 1,
    detailedDesc: 1,
    availableDates: 1,
    averageRating: 1,
    numberOfReviews: 1,
};

export const FieldsForTrip = {
    _id: 1,
    placeImg: 1,
    requesterName: 1,
    requesteeName: 1,
    //requesterEmail: 1,
    //requesteeEmail: 1,
    requesterUserId: 1,
    requesteeUserId: 1,
    requesterPlaceId: 1,
    requesteePlaceId: 1,
    'dates.arrival': 1,
    'dates.departure': 1,
    'address.city': 1,
    'address.state': 1,
    'place.bedrooms': 1,
    'place.numOfGuests': 1,
    'profile.school': 1,
    guests: 1,
    requesterProfileImg: 1,
    requesteeProfileImg: 1,
    requesterMessage: 1,
    requesterRating: 1,
    requesterReviewMessage: 1,
    requesteeRating: 1,
    requesteeReviewMessage: 1,
    status: 1,
};

export const fieldsForTripReview = {
    requesterMessage: 1,
    requesterRating: 1,
    requesterReviewMessage: 1,
    requesteeRating: 1,
    requesteeReviewMessage: 1,
    requesterUserId: 1,
    requesteeUserId: 1,
    requesterPlaceId: 1,
    requesteePlaceId: 1,
    status: 1,
};

export const noShowFieldsForPlace = {
    profileImg: 0,
    interests: 0,
    address: 0,
    profile: 0,
};

export const MaxImageUploadDim = {
    small: {
        sizeMb: 0.5,
        width: 500,
        height: 500,
    },
    large: {
        sizeMb: 2,
        width: 1275,
        height: 1275,
    },
};
export const MaxImageDimTypes = {
    LARGE: 'large',
    SMALL: 'small',
};

export const intTypeParams = ['numOfGuests', 'bathrooms', 'bedrooms', 'beds'];
export const doubleTypeParams = ['rent', 'lat', 'lng'];