import SoundcloudUsers from '../../imports/collections/soundcloud-users';

if (SoundcloudUsers.find().count() === 0) {
  const soundcloudFixtures = [
    {
      username: 'asap-rocky',
    },
  ];

  soundcloudFixtures.map(soundcloudUser => SoundcloudUsers.insert(soundcloudUser));
}
