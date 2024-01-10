class PlaylistService {
  constructor(playlistRepo) {
    this.playlistRepo = playlistRepo;
  }

  async getPlaylists(credentialId, playlistId) {
    const playlist = await this.playlistRepo.getById(playlistId);
    if (!playlist) {
      throw new Error('Playlist tidak ditemukan');
    }
    if (playlist.owner !== credentialId) {
      throw new Error('Anda tidak berhak mengakses resource ini');
    }

    const songs = await this.playlistRepo.getAllSongs(playlistId);
    return {
      id: playlist.id,
      name: playlist.name,
      songs: songs.map(({
        id, title, performer,
      }) => ({
        id,
        title,
        performer,
      })),
    };
  }
}

module.exports = PlaylistService;
