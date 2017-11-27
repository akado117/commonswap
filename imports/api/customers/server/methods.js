import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import handleSignup from '../../../modules/server/stripe/handle-signup';
import handleCancelSubscription from '../../../modules/server/stripe/handle-cancel-subscription';
import handleChangeSubscription from '../../../modules/server/stripe/handle-change-subscription';
import handleUpdatePayment from '../../../modules/server/stripe/handle-update-payment';
import { Profiles } from '../imports/collections/mainCollection';

Meteor.methods({
  signup(customer) {
    check(customer, Object);
    return handleSignup(customer)
    .then(customer => customer)
    .catch((error) => {
      throw new Meteor.Error('500', `${error}`);
    });
  },
//   updatePayment(source) {
//     check(source, String);
//     return handleUpdatePayment({ userId: Meteor.userId(), source })
//     .then(update => update)
//     .catch((error) => {
//       throw new Meteor.Error('500', `${error}`);
//     });
//   },
});
