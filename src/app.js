require('dotenv').config();

const { Pool } = require('pg');
const amqp = require('amqplib');
const InitPlaylistsConsumer = require('./playlists');

const init = async () => {
  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();
  const dbPool = new Pool();

  await InitPlaylistsConsumer(dbPool, channel);
};

init();
