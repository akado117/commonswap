import React from 'react';
import PropTypes from 'prop-types';
import Rater from 'react-rater';
import TextFieldStandardized from '../forms/TextFieldStandardized';
import PlaceActions from '../../actions/PlaceActions';
import Store from '../../store/store';
import { requesterOrRequestee } from '../../../../imports/helpers/userHelper';


class TripRater extends React.Component {
    constructor(props) {
        super(props);
        const { trip } = props;
        const rating = trip[requesterOrRequestee(Store, trip.requesterUserId, 'Rating')];
        const message = trip[requesterOrRequestee(Store, trip.requesterUserId, 'ReviewMessage')];
        this.state = {
            initialMessage: message || '',
            initialRating: rating || 0,
            rating: rating || 0,
            message: message || '',
        };
    }
    isRatingDifferent(state) {
        const { initialRating, initialMessage, rating, message} = this.state;
        return initialRating !== rating || initialMessage !== message
    }
    onRatingSelect = (e) => {
        this.setState({ rating: e.rating });
    }
    onRatingSave = () => {
        const { rating, message } = this.state;
        const { trip: { _id } } = this.props;
        Store.dispatch(PlaceActions.saveSwapRating({ rating, message, _id }));
        this.setState({
            initialMessage: message || '',
            initialRating: rating || 0,
        });
    }
    render() {
        const { rating, initialMessage } = this.state;
        return (
            <div className="col s12 l5 trip-rater-container">
                <button onClick={this.onRatingSave} className={'save-button remove-default-button-styling ' + (this.isRatingDifferent(this.state) ? 'active' : '')}><i className="fa fa-save" aria-hidden="false" /></button>
                <div className="col s12">
                    <Rater
                        total={5}
                        rating={rating}
                        interactive
                        onRate={this.onRatingSelect}
                    />
                </div>
                <div className="col s12">
                    <TextFieldStandardized
                        floatingLabelText={<span><i className="fa fa-pencil" aria-hidden="true"></i> Tell us about your experience</span>}
                        onChange={(e, value) => this.setState({ message: value })}
                        extraProps={{
                            defaultValue: initialMessage,
                            hintText: 'Feeback',
                            floatingLabelFixed: true,
                        }}
                    />
                </div>
            </div>
        )
    }
}

TripRater.propTypes = {
    trip: PropTypes.object.isRequired,
}

export default TripRater;