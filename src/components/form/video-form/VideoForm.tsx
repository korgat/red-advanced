import Image from 'next/image';
import React from 'react';
import { Controller, type UseFormReturn } from 'react-hook-form';

import Button from '@/ui/button/Button';
import { Field, Textarea, UploadField } from '@/ui/field';
import { TagsField } from '@/ui/field/tags-field/TagsField';

import type { TVideoForm } from './videoForm.types';
import { cn } from '@/lib/utils';

interface VideoFormProps extends React.HTMLAttributes<HTMLFormElement> {
  isPending: boolean;
  form: UseFormReturn<TVideoForm, object, undefined>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

const VideoForm = (props: VideoFormProps) => {
  const { className = '', isPending, form, onSubmit, ...rest } = props;
  const fileName = form.watch('videoFileName');
  const thumbnail = form.watch('thumbnailUrl');

  return (
    <form
      {...rest}
      className={cn(
        'grid grid-cols-[2.5fr,1fr] gap-x-10',
        {
          'opacity-50': isPending
        },
        [className]
      )}
      onSubmit={onSubmit}
    >
      <Field
        className='col-start-1'
        label='Title'
        type='text'
        registration={form.register('title', { required: 'Title is required!' })}
        errorMessage={form.formState.errors.title?.message}
        placeholder='Enter title:'
      />
      <Textarea
        className='col-start-1'
        label='Description'
        registration={form.register('description', { required: 'Title is required!' })}
        errorMessage={form.formState.errors.description?.message}
        placeholder='Description:'
        rows={4}
      />
      <Controller
        control={form.control}
        name='thumbnailUrl'
        rules={{ required: 'Thumbnail is required' }}
        render={({ fieldState, field }) => (
          <UploadField
            className='col-start-1'
            label='Thumbnail:'
            folder='thumbnails'
            previewSizes={[250, 141]}
            value={field.value}
            onSuccess={data => field.onChange(data.data[0].url)}
            errorMessage={fieldState.error?.message}
          />
        )}
      />
      <Controller
        control={form.control}
        name='tags'
        rules={{ required: 'Tags is required' }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TagsField
            className='col-start-1'
            label='Tags:'
            onTagsChange={onChange}
            tags={value}
            error={error?.message}
          />
        )}
      />
      <div className='bg-gray-900 col-start-2 row-start-1 row-span-3 h-max rounded-md overflow-hidden border border-border'>
        {thumbnail ? (
          <Image
            alt={fileName}
            src={thumbnail}
            width={300}
            height={169}
          />
        ) : (
          <div className='bg-gray-700 w-[300] h-[169] flex justify-center items-center text-sm'>
            <span>Thumbnail didn&apos;t load</span>
          </div>
        )}
        <div className='py-2 px-3 text-base'>File name: {fileName}</div>
      </div>
      <div className='text-right mt-4 row-start-5 col-start-2'>
        <Button
          variant='primary'
          type='submit'
          isLoading={isPending}
          disabled={isPending}
        >
          Publish
        </Button>
      </div>
    </form>
  );
};

export default VideoForm;
