import Urls from '../../imports/collections/urls';

if (Urls.find().count() === 0) {
  const urlFixtures = [
    {
      url: 'https://soundcloud.com/joshpan/perfect',
    },
  ];

  urlFixtures.map(url => Urls.insert(url));
}
