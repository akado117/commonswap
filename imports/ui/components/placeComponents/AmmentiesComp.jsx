import React, { Component } from 'react';
import PropTypes from 'prop-types'

import Checkbox from '../forms/Checkbox'

const BUTTONS = [
    {label: 'Beach Bum', name: 'essentials'},
    {label: 'Photography', name: 'wiFi'},
    {label: 'Wineries', name: 'heat'},
    {label: 'Film Buff', name: 'gym'},
    {label: 'Hiker', name: 'washerDryer'},
    {label: 'Clubbing & Nightlife', name: 'kitchen'},
    {label: 'Live Music & Concerts', name: 'dressers'},
    {label: 'Food & Restaurants', name: 'pool'},
    {label: 'Organized Tours', name: 'parking'},
];

class AmmentiesComp extends Component {
    constructor() {
        super();
        this.state= {
            essentials: false,
            wiFi: false,
            gym: false,
            washerDryer: false,
            kitchen: false,
            dressers: false,
            pool: false,
            parking: false,
        }
    }

    onChangeHandler = (e, type) => {
        const value = !this.state[type];
        this.props.getValueFunc(type, value);
        this.setState({ [type]: value })
    }
    
    // render() {
    //     const buttons = BUTTONS.map((buttonData, idx)=> {
    //         return <Checkbox onClick="" name="" active="" label=""/>
    //     })
    //     return (
    //
    //     )
    // }

}