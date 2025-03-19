'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useSelector } from 'react-redux';

import { selectUser } from '@/store/auth/auth.selectors';

import CommentInput from './CommentInput';
import { DynamicComments } from './CommentItem';
import { cn } from '@/lib/utils';
import { commentService } from '@/services/comments';
import type { IComment } from '@/types/comments.types';

interface CommentsProps extends React.HTMLAttributes<HTMLDivElement> {
  publicId: string;
  videoId: string;
  comments: IComment[];
  slug: string;
}

const Comments = (props: CommentsProps) => {
  const { className = '', publicId, videoId, comments, slug, ...rest } = props;
  const user = useSelector(selectUser);
  const { data } = useQuery({
    queryKey: ['comments', publicId],
    queryFn: () => commentService.getCommentsPublicId(publicId),
    initialData: comments
  });

  return (
    <div
      {...rest}
      className={cn('', {}, [className])}
    >
      {user && (
        <CommentInput
          className='mb-12'
          publicId={publicId}
          videoId={videoId}
        />
      )}
      <ul>
        {data.map(comment => (
          <DynamicComments
            key={comment.id}
            user={user}
            publicId={publicId}
            comment={comment}
            slug={slug}
          />
        ))}
      </ul>
    </div>
  );
};

export default Comments;
