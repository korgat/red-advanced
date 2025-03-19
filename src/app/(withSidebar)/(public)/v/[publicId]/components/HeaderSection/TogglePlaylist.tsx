import { AnimatePresence, m } from 'framer-motion';
import { ListPlus } from 'lucide-react';
import React from 'react';

import { useOutside } from '@/hooks/useOutside';
import { useUserPlaylists } from '@/hooks/usePlaylist';

import { CreatePlaylistModal } from './CreatePlaylistModal';
import { cn } from '@/lib/utils';

interface TogglePlaylistProps extends React.HTMLAttributes<HTMLDivElement> {
  videoPublicId: string;
  videoId: string;
}

const TogglePlaylist = (props: TogglePlaylistProps) => {
  const { className = '', videoPublicId, videoId, ...rest } = props;
  const { isShow, ref, setIsShow } = useOutside<HTMLUListElement>(false);
  const {
    isShow: isShowModal,
    ref: modalRef,
    setIsShow: setShowModal
  } = useOutside<HTMLDivElement>(false);
  const {
    playlists,
    isCreatingPending,
    isTogglingPlaylistVideo,
    createPlaylist,
    togglePlaylistVideo
  } = useUserPlaylists();

  const createPlaylistHandler = (title: string) => {
    createPlaylist({
      title,
      videoPublicId
    });
    setShowModal(false);
  };

  const togglePlaylistHandler = (playlistId: string) => {
    togglePlaylistVideo({
      playlistId,
      videoId
    });
  };

  return (
    <div
      {...rest}
      className={cn('relative inline-block', {}, [className])}
    >
      <button
        className='flex gap-2 items-center opacity-80 hover:opacity-100 transition-opacity'
        onClick={() => setIsShow(true)}
      >
        <ListPlus size={20} />
        <span className='leading-5'>Save</span>
      </button>

      <AnimatePresence>
        {isShow && (
          <m.ul
            ref={ref}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{
              duration: 0.3,
              damping: 0
            }}
            className='bg-gray-800 py-2 px-4 rounded absolute bottom-8 right-0 z-10 shadow w-max max-h-80 overflow-y-scroll flex flex-col'
          >
            <li className='mb-2 pb-2 border-b self-center'>
              <button
                onClick={() => {
                  setShowModal(true);
                  setIsShow(false);
                }}
                className='flex items-center gap-2 disabled:text-red-400 transition-colors hover:text-primary'
              >
                Create new
              </button>
            </li>
            {playlists?.data.map(playlists => (
              <li
                key={playlists.id}
                className='mb-1 self-end w-full'
              >
                <button
                  disabled={isTogglingPlaylistVideo}
                  onClick={() => {
                    togglePlaylistHandler(playlists.id);
                    setIsShow(false);
                  }}
                  className={cn(
                    'gap-2 disabled:text-red-400 transition-colors hover:text-primary w-full text-right block',
                    {
                      'text-primary': playlists.videos.some(
                        playlistVideo => playlistVideo.id === videoId
                      )
                    }
                  )}
                >
                  {playlists.title}
                </button>
              </li>
            ))}
          </m.ul>
        )}
      </AnimatePresence>
      {isShowModal && (
        <CreatePlaylistModal
          ref={modalRef}
          isPending={isCreatingPending}
          onCreate={createPlaylistHandler}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default TogglePlaylist;
