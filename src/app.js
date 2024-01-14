const { Pool } = require('pg');
const amqp = require('amqplib');
const InitPlaylistsConsumer = require('./playlists');
const config = require('../utils/constant/Config');

const init = async () => {
  const connection = await amqp.connect(config.rabbitmq.server);
  const channel = await connection.createChannel();

  // postgres connection
  const dbPool = new Pool({
    user: config.postgres.user,
    host: config.postgres.host,
    database: config.postgres.database,
    password: config.postgres.password,
    port: config.postgres.port,
  });

  await InitPlaylistsConsumer(dbPool, channel);
};

init();
