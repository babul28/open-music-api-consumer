require('dotenv').config();
const amqp = require('amqplib');
const PlaylistSongService = require('./PlaylistSongService');
const MailService = require('./MailService');
const Listener = require('./Listener');

const init = async () => {
  const playlistSongService = new PlaylistSongService();
  const mailService = new MailService();
  const listener = new Listener(playlistSongService, mailService);

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue('exports:open-music-playlist', {
    durable: true,
  });

  channel.consume('exports:open-music-playlist', listener.listen, { noAck: true });
};

init();
