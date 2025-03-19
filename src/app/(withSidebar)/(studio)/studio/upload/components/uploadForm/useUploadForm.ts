import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import type { TVideoForm } from '@/components/form/video-form/videoForm.types';

import { STUDIO } from '@/configs/studio.pages';
import { studioVideoService } from '@/services/studio-video';

export const useUploadForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useForm<TVideoForm>({
    mode: 'onChange'
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['publish-video'],
    mutationFn: (data: TVideoForm) => studioVideoService.create(data),
    async onSuccess() {
      form.reset();
      const { toast } = await import('react-hot-toast');
      toast.success('Video successfully published!');
      queryClient.removeQueries({ queryKey: ['video-progress'] });
      router.push(STUDIO.HOME);
    },
    async onError() {
      const { toast } = await import('react-hot-toast');
      toast.error('Video creating has error!');
    }
  });

  const onSubmit = form.handleSubmit((data: TVideoForm) => {
    mutate(data);
  });
  return {
    form,
    isPublishing: isPending,
    onSubmit
  };
};
