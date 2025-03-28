'use client';

import React, { useState } from 'react';

import VideoForm from '@/components/form/video-form/VideoForm';

import Heading from '@/ui/heading/Heading';

import DragDropField from './uploadForm/dragDrop/dragDrop';
import { useUploadForm } from './uploadForm/useUploadForm';
import { cn } from '@/lib/utils';

interface UploadSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

const UploadSection = (props: UploadSectionProps) => {
  const { className = '', ...rest } = props;
  const [isVideoProcessed, setIsVideoProcessed] = useState(false);
  const { form, isPublishing, onSubmit } = useUploadForm();

  return (
    <div
      {...rest}
      className={cn('h-full flex justify-center bg-black/30 z-50', {}, [className])}
    >
      <div className='h-max bg-gray-800 rounded-lg p-6 mt-20 min-w-[550px]'>
        <Heading className='text-xl'>Upload video</Heading>
        {!isVideoProcessed && (
          <DragDropField
            setIsVideoProcessed={setIsVideoProcessed}
            isVideoProcessed={isVideoProcessed}
            form={form}
          />
        )}
        {isVideoProcessed && (
          <VideoForm
            form={form}
            isPending={isPublishing}
            onSubmit={onSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default UploadSection;
