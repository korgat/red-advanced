import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Edit, ExternalLink, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import toast, { type Toast } from 'react-hot-toast';

import { PUBLIC } from '@/configs/public.pages';
import { STUDIO } from '@/configs/studio.pages';
import { cn } from '@/lib/utils';
import { studioVideoService } from '@/services/studio-video';

interface ItemActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  publicId: string;
  id: string;
}

const ItemActions = (props: ItemActionsProps) => {
  const { className = '', publicId, id, ...rest } = props;

  const queryClient = useQueryClient();

  const { mutate: deleteVideo, isPending: isDeletePending } = useMutation({
    mutationKey: ['delete a video'],
    mutationFn: () => studioVideoService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['studioVideoList']
      });
      toast.success('Successfully deleted!');
    }
  });

  const handleDelete = () => {
    toast((t: Toast) => (
      <div>
        <p>Are you sure you want to delete this video?</p>
        <div className='flex justify-end gap-4 mt-2'>
          <button
            onClick={() => {
              deleteVideo();
              toast.dismiss(t.id);
            }}
            className='text-red-600'
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className='text-gray-400'
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div
      {...rest}
      className={cn('', {}, [className])}
    >
      <Link
        href={PUBLIC.VIDEO(publicId)}
        className='text-white transition-opacity opacity-70 hover:opacity-100'
        target='_blank'
        title='Open in a new tab'
      >
        <ExternalLink size={22} />
      </Link>
      <Link
        href={STUDIO.EDIT_VIDEO(id)}
        className='text-blue-600 transition-opacity opacity-70 hover:opacity-100'
        title='Edit a video'
      >
        <Edit size={22} />
      </Link>
      <button
        onClick={handleDelete}
        className='text-red-600 transition-opacity opacity-70 hover:opacity-100'
        title='Delete a video'
        disabled={isDeletePending}
      >
        <Trash2 size={22} />
      </button>
    </div>
  );
};

export default ItemActions;
