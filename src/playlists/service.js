class PlaylistService {
  constructor(playlistRepo) {
    this.playlistRepo = playlistRepo;
  }

  async getPlaylist(playlistId) {
    const playlist = await this.playlistRepo.getById(playlistId);
    if (!playlist) {
      throw new Error('Playlist tidak ditemukan');
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
