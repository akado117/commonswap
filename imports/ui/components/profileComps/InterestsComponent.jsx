import React, { Component } from 'react';
import PropTypes from 'prop-types';

function onChangeHelper(event) {
    return event.target.value
}

class InterestsComponent extends Component {
    constructor(){
        super();

        this.state = {
            photography: false,
            wineries: false,
            beachBum: false,
            film: false,
            hiking: false,
            clubber: false,
            liveMusic: false,
            foodie: false,
            orgTour: false,
        };
    }

    onChangeHandler = (e, type) => {
        const value = !this.state[type];
        this.props.getValueFunc(type, value);
        this.setState({ [type]: value })
    }

    render() {
        return (
            <div className="row interests-container">
                <div className="row" style={{ paddingTop: '15px' }}>
                    <div className="col s4">
                        <label>Beach bum</label>
                        <button type="button" className="checkbox btn btn-sm" onClick={e => this.onChangeHandler(e, 'beachBum')}><i className={`fa ${this.state.beachBum ? 'fa-check' : 'fa-times'}`} aria-hidden="true"/></button>
                    </div>
                    <div className="col s4">
                        <label>Wineries</label>
                        <button type="button" className="checkbox btn btn-sm" onClick={e => this.onChangeHandler(e, 'wineries')}><i className={`fa ${this.state.wineries ? 'fa-check' : 'fa-times'}`} aria-hidden="true"/></button>
                    </div>
                    <div className="col s4">
                        <label>Photography</label>
                        <button type="button" className="checkbox btn btn-sm" onClick={e => this.onChangeHandler(e, 'photography')}><i className={`fa ${this.state.photography ? 'fa-check' : 'fa-times'}`} aria-hidden="true"/></button>
                    </div>
                </div>
                <div className="row" style={{ paddingTop: '15px' }}>
                    <div className="col s4" style={{ height: '150%' }}>
                        <label>Film</label>
                        <button type="button" className="checkbox btn btn-sm" onClick={e => this.onChangeHandler(e, 'film')}><i className={`fa ${this.state.film ? 'fa-check' : 'fa-times'}`} aria-hidden="true"/></button>
                    </div>
                    <div className="col s4">
                        <label>Hiking</label>
                        <button type="button" className="checkbox btn btn-sm" onClick={e => this.onChangeHandler(e, 'hiking')}><i className={`fa ${this.state.hiking ? 'fa-check' : 'fa-times'}`} aria-hidden="true"/></button>
                    </div>
                    <div className="col s4">
                        <label>Clubbing &amp; Nightlife</label>
                        <button type="button" className="checkbox btn btn-sm" onClick={e => this.onChangeHandler(e, 'clubber')}><i className={`fa ${this.state.clubber ? 'fa-check' : 'fa-times'}`} aria-hidden="true"/></button>
                    </div>
                </div>
                <div className="row" style={{ paddingTop: '15px' }}>
                    <div className="col s4">
                        <label>Live Music &amp; Concerts</label>
                        <button type="button" className="checkbox btn btn-sm " onClick={e => this.onChangeHandler(e, 'liveMusic')}><i className={`fa ${this.state.liveMusic ? 'fa-check' : 'fa-times'}`} aria-hidden="true"/></button>
                    </div>
                    <div className="col s4">
                        <label>Food &amp; Restaurants</label>
                        <button type="button" className="checkbox btn btn-sm" onClick={e => this.onChangeHandler(e, 'foodie')}><i className={`fa ${this.state.foodie ? 'fa-check' : 'fa-times'}`} aria-hidden="true"/></button>
                    </div>
                    <div className="col s4">
                        <label>Organized Tours</label>
                        <button type="button" className="checkbox btn btn-sm" onClick={e => this.onChangeHandler(e, 'orgTour')}><i className={`fa ${this.state.orgTour ? 'fa-check' : 'fa-times'}`} aria-hidden="true"/></button>
                    </div>
                </div>
            </div>
        )
    }
}

InterestsComponent.propTypes = {
    getValueFunc: PropTypes.func.isRequired,
};

export default InterestsComponent;