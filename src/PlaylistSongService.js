const { Pool } = require('pg');

class PlaylistSongService {
  constructor() {
    this._pool = new Pool();
  }

  async getAllPlaylistSongs(playlistId) {
    const query = {
      text: `SELECT s.id, s.title, s.performer FROM playlists p, playlist_songs ps, songs s
              WHERE p.id = $1 AND p.id = ps.playlist_id AND s.id = ps.song_id`,
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }
}

module.exports = PlaylistSongService;
