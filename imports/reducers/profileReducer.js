import Constants from '../lib/Constants'
import _ from 'lodash'

const initialState = {
    profile: {},
    interests: {},
    emergencyContacts: [],
};

export default function profileReducer(state = initialState, action = {}) {
    switch (action.type) {
        case `${Constants.actionTypes.GET_PROFILE}_${Constants.SUCCESS}`:
            return _.assign({},state,{user: action.user});
        default:
            return state;
    }
}