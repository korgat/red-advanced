import React from 'react';
import type { UseFormReturn } from 'react-hook-form';

import type { TVideoForm } from '@/components/form/video-form/videoForm.types';

import { useUploadField } from '@/ui/field/upload-field/useUploadField';

import DragDropText from './dragDropText';
import { useDragDrop } from './useDargDrop';
import { cn } from '@/lib/utils';

interface DragDropFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  form: UseFormReturn<TVideoForm, object, undefined>;
  setIsVideoProcessed: React.Dispatch<React.SetStateAction<boolean>>;
  isVideoProcessed: boolean;
}

const DragDropField = (props: DragDropFieldProps) => {
  const { className = '', form, isVideoProcessed, setIsVideoProcessed, ...rest } = props;
  const fileName = form.watch('videoFileName');
  const { isLoading, isSuccess, uploadFile } = useUploadField({
    folder: 'videos',
    onSuccess: async ({ data }) => {
      const file = data[0];
      if (!file) return;

      form.reset({
        videoFileName: file.name,
        maxResolution: file.maxResolution,
        title: file.name
      });

      const { toast } = await import('react-hot-toast');
      toast.success('Video start processing');
    },
    onError: async () => {
      const { toast } = await import('react-hot-toast');
      toast.error('Failed to upload the video');
    }
  });

  const { handleDragLeave, handleDragOver, handleDrop, inputChangeHandler, isDragging, progress } =
    useDragDrop({ uploadFile, fileName, isVideoProcessed, setIsVideoProcessed });

  return (
    <div
      {...rest}
      className={cn('', {}, [className])}
    >
      <label
        className={cn(
          'flex flex-col items-center justify-center px-4 py-6 h-48 border border-dashed border-gray-500 rounded-md cursor-pointer transition-all duration-200 min-w-[500px]',
          {
            'bg-gray-700 border-solid': isDragging,
            'border-solid': progress || isSuccess || isLoading
          }
        )}
        style={
          progress
            ? {
                background: `linear-gradient(to right, #166534 ${progress}%, transparent ${progress}%)`
              }
            : {}
        }
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <DragDropText
          isDragging={isDragging}
          isLoading={isLoading || isSuccess || !!progress}
        />
        <input
          type='file'
          accept='video/*'
          className='hidden'
          onChange={inputChangeHandler}
        />
      </label>
    </div>
  );
};

export default DragDropField;
