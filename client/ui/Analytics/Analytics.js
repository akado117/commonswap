export default function setTrackingId() {
    if (window.gtag) {
        window.gtag('config', Meteor.settings.public.googleKeys.gtm);
    } else {
        console.log('gtag is not defined, analytics disabled');
    }
}