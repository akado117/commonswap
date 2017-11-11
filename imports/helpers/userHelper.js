export function mapUserServiceToProfile(currentUser) {
    let service = {};
    if (currentUser.service) service = currentUser.service.facebook || currentUser.service.google || {};
    return {
        firstName: service.first_name || service.given_name,
        lastName: service.last_name || service.family_name,
        email: service.email,
        picture: service.picture,
    };
}

export default () => {};