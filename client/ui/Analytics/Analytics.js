export default function setTrackingId() {
    if (window.gtag) {
        window.gtag('config', Meteor.settings.public.googleKeys.gtm);
    } else {
        console.log('gtag is not defined, analytics disabled');
    }
}

export function sendPageView(location) {
    if (window.gtag) {
        gtag('config', Meteor.settings.public.googleKeys.gtm, {
            page_path: location.pathname,
        });
        if (window.FB) {
            FB.AppEvents.logPageView();
        }
    }
}

export function sendEvent(eventName, valueToSum, params) {
    if (window.FB) {
        FB.AppEvents.logEvent(eventName, valueToSum, params);
    }
}