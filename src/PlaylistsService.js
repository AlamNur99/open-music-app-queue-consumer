const {
    Pool,
} = require('pg');
const NotFoundError = require('./exceptions/NotFoundError');
const InvariantError = require('./exceptions/InvariantError');

class PlaylistsService {
    constructor() {
        this._pool = new Pool();
    }

    async getPlaylistById(playlistId) {
        const query = {
            text: 'SELECT id, name FROM playlists WHERE id = $1',
            values: [playlistId],
        };

        const resultPlaylists = await this._pool.query(query);

        if (!resultPlaylists.rowCount) {
            throw new NotFoundError('Playlist tidak ditemukan');
        }
        const playlists = resultPlaylists.rows[0];

        const querySongs = {
            text: `SELECT songs.id, songs.title, songs.performer
            FROM playlists
            INNER JOIN playlist_songs ON playlist_songs.playlist_id = playlists.id
            INNER JOIN songs ON songs.id = playlist_songs.song_id
            WHERE playlists.id = $1`,
            values: [playlistId],
        };

        const resultSongs = await this._pool.query(querySongs);
        if (!resultSongs.rowCount) {
            throw new InvariantError('Gagal mengambil lagu dari playlist');
        }

        return {
            plalists: {
                ...playlists,
                songs: resultSongs.rows,
            },
        };
    }
}

module.exports = PlaylistsService;