import SoundcloudUsers from '../collections/soundcloud-users';

export default {
  RootQuery: {
    say(/* root, args, context */) {
      return 'Hello World, from GraphQL/Apollo.';
    },
    soundcloudUsers(/* root, args, context */) {
      return SoundcloudUsers.find().fetch();
    },
  },
  RootMutation: {
    submitSoundcloudUser(root, { username }) {
      const newUser = { username };
      SoundcloudUsers.insert(newUser);
      return newUser;
    },
  },
};
