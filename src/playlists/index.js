const PlaylistService = require('./service');
const PlaylistListener = require('./listener');
const PlaylistRepository = require('./repository');

const InitPlaylistsConsumer = async (dbPool, channel) => {
  const playlistRepo = new PlaylistRepository(dbPool);
  const playlistService = new PlaylistService(playlistRepo);
  const listener = new PlaylistListener(playlistService);

  const queueName = 'export:playlists';
  await channel.assertQueue(queueName, { durable: true });
  channel.consume(queueName, (message) => listener.exportPlaylists(message), { noAck: true });
};

module.exports = InitPlaylistsConsumer;
