export const createCustomer = (token, email) => 
  new Promise((resolve, reject) => {
  var stripe = require("stripe")("sk_test_jIZSQ4fsuI9IFmeZeiNdSFPc");
  stripe.customers.create({
    email: email,
    source: token
  }).then(function(customer) {
    return dispatch => Meteor.call('upsertCard', customer, (error, result) => {
      if (error) {
          console.log(error);
          return dispatch({
              type: `${actionTypes.SAVE_CUSTOMER}_${FAILURE}`,
              ...error,
          });
      } else {
          if (result.data) {
              dispatch({
                  type: `${actionTypes.SAVE_CUSTOMER}_${SUCCESS}`,
                  card: result.data.card
              });
              return callBack ? callBack() : '';
          };
          return dispatch({
              type: `${actionTypes.SAVE_CUSTOMER}_${FAILURE}`,
              ...error,
          });
      }
  });
  })
});

// // Token is created using Checkout or Elements!
// // Get the payment token ID submitted by the form:
// var token = request.body.stripeToken; // Using Express

// // Create a Customer:
// stripe.customers.create({
//   email: "timhh@sbcglobal.net",
//   source: token,
// }).then(function(customer) {
//   // YOUR CODE: Save the customer ID and other info in a database for later.

  
// }).then(function(charge) {
//   // Use and save the charge info.
// });

// // YOUR CODE (LATER): When it's time to charge the customer again, retrieve the customer ID.
// stripe.charges.create({
//   amount: 1500, // $15.00 this time
//   currency: "usd",
//   customer: customerId,
// });
