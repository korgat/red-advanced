import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import type { ICommentForm } from './coments.types';
import { commentService } from '@/services/comments';
import type { IComment } from '@/types/comments.types';

export const useCommentsForm = (videoId: string, publicId: string) => {
  const queryClient = useQueryClient();
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset
  } = useForm<ICommentForm>();

  const { mutate, isPending: isCommentPending } = useMutation({
    mutationKey: ['comment'],
    mutationFn: (data: ICommentForm) =>
      commentService.create({ text: data.comment, videoId: videoId }),
    onError: err => {
      if (axios.isAxiosError(err)) {
        toast.error('Error occurred');
      }
    },
    onSuccess: response => {
      const newComment = response.data;

      queryClient.setQueryData<IComment[]>(['comments', publicId], oldData => {
        if (!oldData) return [newComment];
        return [newComment, ...oldData];
      });
      reset();
    }
  });

  const onSubmit = handleSubmit(data => {
    mutate(data);
  });

  return {
    onSubmit,
    register,
    errors,
    isLoading: isCommentPending
  };
};
