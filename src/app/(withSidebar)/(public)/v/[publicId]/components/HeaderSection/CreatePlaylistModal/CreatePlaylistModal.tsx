import { m } from 'framer-motion';
import { X } from 'lucide-react';
import React, { type RefObject } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/ui/button/Button';
import { Field } from '@/ui/field';
import Heading from '@/ui/heading/Heading';
import SkeletonLoader from '@/ui/skeleton-loader/SkeletonLoader';

import type { TCreatePlaylistForm } from './CreatePlaylistModal.types';
import { cn } from '@/lib/utils';

interface CreatePlaylistModalProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
  onCreate: (title: string) => void;
  ref: RefObject<HTMLDivElement | null>;
  isPending: boolean;
}

const CreatePlaylistModal = (props: CreatePlaylistModalProps) => {
  const { className = '', onClose, onCreate, ref, isPending, ...rest } = props;
  const {
    formState: { errors },
    register,
    handleSubmit
  } = useForm<TCreatePlaylistForm>();

  const onSubmit = (data: TCreatePlaylistForm) => {
    onCreate(data.title);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 50
      }}
      {...rest}
      className={cn('', {}, [className])}
    >
      <m.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'relative',
          width: '26rem'
        }}
      >
        <div
          className='bg-gray-800 rounded-lg p-6'
          ref={ref}
        >
          <button
            onClick={onClose}
            className='absolute top-2 right-2 text-white'
            title='Close a modal'
          >
            <X />
          </button>
          <Heading className='text-xl'>Create a playlist</Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            {isPending ? (
              <SkeletonLoader count={1} />
            ) : (
              <Field
                label='Title'
                type='text'
                registration={register('title', { required: 'Title is required!' })}
                errorMessage={errors.title?.message}
                placeholder='Enter title:'
              />
            )}
            <div className='text-center mt-4'>
              <Button
                type='submit'
                isLoading={isPending}
              >
                Create
              </Button>
            </div>
          </form>
        </div>
      </m.div>
    </div>
  );
};

export default CreatePlaylistModal;
