'use client';

import React from 'react';

import { useSearch } from './useSearch';
import { cn } from '@/lib/utils';

interface HeaderSearchProps extends React.HTMLAttributes<HTMLDivElement> {}

const HeaderSearch = (props: HeaderSearchProps) => {
  const { className = '', ...rest } = props;
  const { value, setValue, keyDownHandler } = useSearch();
  return (
    <div
      {...rest}
      className={cn('flex items-center justify-center w-full', {}, [className])}
    >
      <input
        className='w-1/3 px-4 py-2 rounded-full border border-border outline-none bg-transparent'
        type='search'
        placeholder='Type to search'
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={keyDownHandler}
      />
    </div>
  );
};

export default HeaderSearch;
