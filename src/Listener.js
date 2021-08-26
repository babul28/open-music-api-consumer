class Listener {
  constructor(playlistSongService, mailService) {
    this._playlistSongService = playlistSongService;
    this._mailService = mailService;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());
      console.log(playlistId, targetEmail);

      const playlistSong = await this._playlistSongService.getAllPlaylistSongs(playlistId);
      const result = await this._mailService.sendEmail(targetEmail, JSON.stringify(playlistSong));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
