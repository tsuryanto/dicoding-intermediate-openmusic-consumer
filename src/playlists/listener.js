const MailSender = require('../../utils/mail/sender');

class PlaylistListener {
  constructor(service) {
    this.service = service;
  }

  async exportPlaylist(message) {
    const sender = new MailSender();
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());

      const playlist = await this.service.getPlaylist(playlistId);
      const result = await sender.sendEmail({
        from: 'OpenMusic',
        to: targetEmail,
        subject: 'Email From Export',
        text: 'Terlampir hasil data export',
        attachments: [
          {
            filename: 'playlist_songs.json',
            content: JSON.stringify({ playlist }, null, 4),
          },
        ],
      });

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = PlaylistListener;
