import React from 'react';

import VideoNotFound from '@/ui/video-not-found/VideoNotFound';

import PlaylistItem from './PlaylistItem';
import { cn } from '@/lib/utils';
import type { IPlaylist } from '@/types/playlists.types';

interface PlaylistProps extends React.HTMLAttributes<HTMLDivElement> {
  playlists: IPlaylist[];
}

const Playlist = (props: PlaylistProps) => {
  const { className = '', playlists, ...rest } = props;

  return playlists?.length ? (
    <div
      {...rest}
      className={cn('grid grid-cols-5 gap-6 mt-4', {}, [className])}
    >
      {playlists.map(playlist => (
        <PlaylistItem
          key={playlist.id}
          playlistTitle={playlist.title}
          lastVideoThumbnail={playlist.videos[playlist.videos.length - 1].thumbnailUrl}
          videoAmount={playlist.videos.length}
          id={playlist.id}
        />
      ))}
    </div>
  ) : (
    <VideoNotFound className='h-full' />
  );
};

export default Playlist;
