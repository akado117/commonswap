export function addFacebookShare() {
    window.fbAsyncInit = function() {
        FB.init({
            appId            : Meteor.settings.public.fuid,
            autoLogAppEvents : true,
            xfbml            : true,
            version          : 'v2.12',
        });
    };

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
};

export function triggerFBShareDialog(redirectURL, message) {
    FB.ui({
        method: 'share',
        href: redirectURL || Meteor.settings.public.deployUrl,
        hashtag: '#exploreCommonSwap',
    }, function(response){});
}