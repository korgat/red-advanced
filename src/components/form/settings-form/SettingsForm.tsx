'use client';

import React from 'react';
import { Controller } from 'react-hook-form';

import Button from '@/ui/button/Button';
import { Field, Textarea, UploadField } from '@/ui/field';

import { useSettingsForm } from './useSettingsForm';
import { cn } from '@/lib/utils';

interface SettingsFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const SettingsForm = (props: SettingsFormProps) => {
  const { className = '', ...rest } = props;
  const { register, isLoading, errors, isFormDataLoading, control, onSubmit } = useSettingsForm();

  if (isFormDataLoading) return <div>...Loading</div>;
  return (
    <div
      {...rest}
      className={cn('w-2/3', {}, [className])}
    >
      <form onSubmit={onSubmit}>
        <div className='grid grid-cols-2 gap-10'>
          <div>
            <Field
              label='Name'
              type='text'
              registration={register('name')}
              errorMessage={errors.name?.message}
              placeholder='Enter name:'
            />
            <Field
              label='Email'
              type='email'
              registration={register('email', { required: 'Password is required!' })}
              errorMessage={errors.email?.message}
              placeholder='Enter email:'
            />
            <Field
              label='Password'
              type='password'
              registration={register('password')}
              errorMessage={errors.password?.message}
              placeholder='Enter password:'
            />
            <Field
              label='Slug (alias)'
              type='text'
              registration={register('channel.slug')}
              errorMessage={errors.channel?.slug?.message}
              placeholder='Enter slug:'
            />
            <Textarea
              label='Description'
              registration={register('channel.description')}
              errorMessage={errors.channel?.description?.message}
              placeholder='Description:'
              rows={4}
            />
          </div>

          <div>
            <Controller
              control={control}
              name='channel.avatarUrl'
              render={({ fieldState, field }) => (
                <UploadField
                  label='Avatar'
                  folder='avatars'
                  value={field.value}
                  onSuccess={data => field.onChange(data.data[0].url)}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />

            <Controller
              control={control}
              name='channel.bannerUrl'
              render={({ field, fieldState }) => (
                <UploadField
                  label='Banner'
                  onSuccess={data => field.onChange(data.data[0].url)}
                  value={field.value}
                  errorMessage={fieldState.error?.message}
                  previewSizes={[446, 250]}
                  folder='banners'
                  overlay='/images/overlay.png'
                />
              )}
            />
          </div>
        </div>

        <div className='text-center mt-6'>
          <Button
            type='submit'
            variant='primary'
            isLoading={isLoading}
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SettingsForm;
