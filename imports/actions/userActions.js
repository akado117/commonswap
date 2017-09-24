import Constants from '../lib/Constants'
import { graphql, gql } from 'react-apollo';


export default {
    loginWithFacebook: () => Meteor.loginWithFacebook({}, (error) => {
        if(error) {
            console.warn('something bad happened:', error);
            return dispatch => dispatch({
                type: Constants.LOGIN_ + Constants.FAILURE,
            })
        }
        return dispatch => dispatch({
                type: Constants.actionTypes.LOGIN_ + Constants.SUCCESS,
                user: Meteor.user()
        })
    }),
    loginWithGoogle: () => Meteor.loginWithGoogle({}, (error) => {
        if(error){
            console.warn('something bad happened:', error);
            return {
                type: Constants.LOGIN_ + Constants.FAILURE,
            }
        }
        return {
            type: Constants.actionTypes.LOGIN_ + Constants.SUCCESS,
            user: Meteor.user()
        }
    }),
    loginWithTwitter: () => Meteor.loginWithTwitter({}, (error) => {
        if(error){
            console.warn('something bad happened:', error);
            return {
                type: Constants.LOGIN_ + Constants.FAILURE,
            }
        }
        return {
            type: Constants.actionTypes.LOGIN_ + Constants.SUCCESS,
            user: Meteor.user()
        }
    }),
    saveRoom: (room, dispatch) => Meteor.call('saveRoomies',room,(error,result)=>{
        if(error){
            console.log(error);
            dispatch({
                type: Constants.actionTypes.SAVE_ROOMIES + '_FAIL',
                ...error
            })
        } else {
            dispatch({
                type: Constants.actionTypes.SAVE_ROOMIES + '_PASS',
                ...result
            })
        }
    }),
    getRoomById: (id, cb) => {
        const query =  gql`{
          getSavedRoom(Id:"${id}") {
            _id
            roomies {
              name
              daysInRoom
              amountOwed
            }
          }
        }`;
        debugger;
        return graphql(query, <Helper callbackFunc={cb}/>)
    }
}