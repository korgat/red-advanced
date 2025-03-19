import { axiosAuth } from '@/api/axios';

import type { IPlaylist, IPlaylistData } from '@/types/playlists.types';

class PlaylistService {
  private _PLAYLISTS = '/playlists';

  getUserPlaylists() {
    return axiosAuth.get<IPlaylist[]>(this._PLAYLISTS);
  }

  getPlaylistById(playlistId: string) {
    return axiosAuth.get<IPlaylist>(`${this._PLAYLISTS}/${playlistId}`);
  }

  toggleVideoInPlaylist(playlistId: string, videoId: string) {
    return axiosAuth.post(`${this._PLAYLISTS}/${playlistId}/toggle-video`, {
      videoId
    });
  }

  createPlaylist(playlist: IPlaylistData) {
    return axiosAuth.post(this._PLAYLISTS, playlist);
  }
}

export const playlistService = new PlaylistService();
