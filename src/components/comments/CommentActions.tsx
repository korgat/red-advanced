import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { cn } from '@/lib/utils';
import { commentService } from '@/services/comments';
import type { IComment } from '@/types/comments.types';

interface CommentActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  comment: IComment;
  publicId: string;
  commentText: string;
}

const CommentActions = (props: CommentActionsProps) => {
  const { className = '', comment, publicId, commentText, ...rest } = props;
  const queryClient = useQueryClient();

  const { mutate: deleteComment, isPending: isDeleting } = useMutation({
    mutationKey: ['delete-comment', comment.id],
    mutationFn: () => commentService.delete(comment.id),
    onSuccess: () => {
      queryClient.setQueryData<IComment[]>(['comments', publicId], oldData => {
        if (!oldData) return [];
        return oldData.filter(c => c.id !== comment.id);
      });
    }
  });

  const { mutate: updateComment, isPending: isUpdating } = useMutation({
    mutationKey: ['update-comment', comment.id],
    mutationFn: () =>
      commentService.update(comment.id, {
        text: commentText,
        videoId: publicId
      }),
    onSuccess: () => {
      queryClient.setQueryData<IComment[]>(['comments', publicId], oldData => {
        if (!oldData) return [];

        return oldData.map(c => (c.id === comment.id ? { ...c, text: commentText } : c));
      });
    }
  });

  const isLoading = isDeleting || isUpdating;
  return (
    <div
      {...rest}
      className={cn('flex items-center gap-4', {}, [className])}
    >
      <button
        disabled={isLoading}
        className='text-white/80 hover:text-white text-sm'
        onClick={() => updateComment()}
      >
        Save
      </button>
      <button
        disabled={isLoading}
        className='text-white/80 hover:text-primary text-sm'
        onClick={() => deleteComment()}
      >
        Delete
      </button>
    </div>
  );
};

export default CommentActions;
