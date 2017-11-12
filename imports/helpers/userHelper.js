export function mapUserServiceToProfile(currentUser) {
    if (!currentUser.services) return {};
    if (currentUser.services.facebook) {
        const {
            first_name, last_name, email, id,
        } = currentUser.services.facebook;
        return {
            picture: `http://graph.facebook.com/${id}/picture/?type=large`,
            firstName: first_name,
            lastName: last_name,
            email,
        };
    }
    if (currentUser.services.google) {
        const service = currentUser.services.google;
        return {
            firstName: service.given_name,
            lastName: service.family_name,
            email: service.email,
            picture: service.picture,
        };
    }
    return {};
}

export default () => {};