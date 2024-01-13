const MailSender = require('../../utils/mail/sender');

class PlaylistListener {
  constructor(service) {
    this.service = service;
  }

  async exportPlaylists(message) {
    const sender = new MailSender();
    try {
      const { userId, playlistId, targetEmail } = JSON.parse(message.content.toString());

      const playlists = await this.service.getPlaylists(userId, playlistId);
      const result = await sender.sendEmail({
        from: 'OpenMusic',
        to: targetEmail,
        subject: 'Email From Export',
        text: 'Terlampir hasil data export',
        attachments: [
          {
            filename: 'playlists.json',
            content: JSON.stringify({ playlists }, null, 4),
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
