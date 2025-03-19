'use client';

import { useParams } from 'next/navigation';
import React from 'react';

import VideoForm from '@/components/form/video-form/VideoForm';

import Heading from '@/ui/heading/Heading';

import { useEditVideoForm } from './useEditVideoForm';
import { cn } from '@/lib/utils';

interface EditSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

const EditSection = (props: EditSectionProps) => {
  const { className = '', ...rest } = props;
  const { id } = useParams();
  const { form, isPublishing, onSubmit } = useEditVideoForm(id as string);

  return (
    <div
      {...rest}
      className={cn('h-full flex justify-center bg-black/30 z-50', {}, [className])}
    >
      <div className='h-max bg-gray-800 rounded-lg p-6 mt-20 min-w-[550px]'>
        <Heading className='text-xl'>Edit video</Heading>
        <VideoForm
          form={form}
          isPending={isPublishing}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default EditSection;
