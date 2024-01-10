/* eslint-disable camelcase */
const {
  PLAYLISTS, USERS, SONGS, PLAYLIST_SONGS,
} = require('../../utils/constant/Tables');

class PlaylistRepository {
  constructor(dbPool) {
    this.dbPool = dbPool;
  }

  async getById(reqId) {
    const query = {
      text: `SELECT p.id, p.name, p.owner, u.username FROM ${PLAYLISTS} p LEFT JOIN ${USERS} u on p.owner = u.id WHERE p.id = $1`,
      values: [reqId],
    };
    const result = await this.dbPool.query(query);
    if (!result.rowCount) {
      return null;
    }

    return result.rows.map(({
      id, name, owner, username,
    }) => ({
      id,
      name,
      owner,
      username,
    }))[0];
  }

  async getAllSongs(playlistId) {
    const query = {
      text: `SELECT s.* FROM ${SONGS} s JOIN ${PLAYLIST_SONGS} ps on s.id = ps.song_id JOIN ${PLAYLISTS} p on ps.playlist_id = p.id WHERE p.id = $1`,
      values: [playlistId],
    };

    const result = await this.dbPool.query(query);
    return result.rows.map(({
      id, title, year, genre, performer, duration,
    }) => ({
      id, title, year, genre, performer, duration,
    }));
  }
}

module.exports = PlaylistRepository;
