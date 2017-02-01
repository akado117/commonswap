import Urls from '../collections/urls';

export default {
  RootQuery: {
    say(/* root, args, context */) {
      return 'Hello World, from GraphQL/Apollo.';
    },
    urls(/* root, args, context */) {
      return Urls.find().fetch();
    },
  },
  RootMutation: {
    insertUrl(root, { url }) {
      const newUrl = { url };
      Urls.insert(newUrl);
      return newUrl;
    },
  },
};
