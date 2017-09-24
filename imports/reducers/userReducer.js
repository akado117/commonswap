import Constants from '../lib/Constants'
import _ from 'lodash'

const initialState = {
    user: Meteor.user()
};

export default function userReducer(state = initialState, action = {}) {
    switch (action.type) {
        case Constants.actionTypes.LOGIN_+Constants.SUCCESS:
            return _.assign({},state,{user: action.user});
        default:
            return state;
    }
}