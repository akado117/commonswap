export function mapUserServiceToProfile(currentUser) {
    if (!currentUser.services) return {};
    if (currentUser.services.facebook) {
        const {
            first_name, last_name, email, id,
        } = currentUser.services.facebook;
        return {
            creationMethod: 'facebook',
            picture: `http://graph.facebook.com/${id}/picture/?type=large`,
            firstName: first_name,
            lastName: last_name,
            email,
        };
    }
    if (currentUser.services.google) {
        const service = currentUser.services.google;
        return {
            creationMethod: 'google',
            firstName: service.given_name,
            lastName: service.family_name,
            email: service.email,
            picture: service.picture,
        };
    }
    return {};
}

export function requesterOrRequestee(Store, requesterId, post = '', pre = '') {
    return `${pre}${Store.getState().user.userId === requesterId ? 'requester' : 'requestee'}${post}`;
}
