import { graphql, gql } from 'react-apollo';
import { actionTypes, SUCCESS, FAILURE } from '../lib/Constants';

export default {
    upsertProfile: ({ profile = {}, interests = {}, emergencyContacts = [] }) => {
        return dispatch => Meteor.call('upsertProfile', profile, interests, emergencyContacts, (error, result) => {
            if (error) {
                console.log(error);
                return dispatch({
                    type: `${actionTypes.SAVE_PROFILE}_${FAILURE}`,
                    ...error,
                });
            } else {
                if (result.data) {
                    return dispatch({
                        type: `${actionTypes.SAVE_PROFILE}_${SUCCESS}`,
                        profile: result.data.profile,
                        interests: result.data.interests,
                        emergencyContacts: result.data.emergencyContacts,
                    });
                };
                return dispatch({
                    type: `${actionTypes.SAVE_PROFILE}_${FAILURE}`,
                    ...error,
                });
            }
        });
    },
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
        return graphql(query, <Helper callbackFunc={cb}/>)
    }
}