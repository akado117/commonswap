import { actionTypes, SUCCESS, FAILURE } from '../lib/Constants';

export default {
    saveProfile : (room, dispatch) => Meteor.call('saveRoomies',room,(error,result)=>{
        if(error){
            console.log(error);
            dispatch({
                type: Constants.actionTypes.SAVE_ROOMIES + '_FAIL',
                ...error
            })
        } else {
            dispatch({
                type: 'email_pending',
            });
            const { Arrival, Departure, Notes } = data;
            console.log(data);
            fetch("https://commonswap.azurewebsites.net/api/SwapRequest?code=X7a3QL7LeF89LYcDidaAxhQG3h5jY2A7fQRKP7a38ZydqTUBrV9orw==", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    //guests,
                    Arrival,
                    Departure,
                    Notes,
                }),
            }).then((res) => {
                dispatch({
                    type: 'email_sent',
                    ...res,
                });
            }).catch((err) => {
                dispatch({
                    type: 'email_failed',
                    ...err,
                });
            })
        }
    }
}