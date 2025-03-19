import dynamic from 'next/dynamic';
import React from 'react';

import SkeletonLoader from '@/ui/skeleton-loader/SkeletonLoader';

import HeaderButtons from './header-buttons/HeaderButtons';
import HeaderSearch from './header-search/HeaderSearch';
import { cn } from '@/lib/utils';

const DynamicHeaderProfile = dynamic(() => import('./header-profile/HeaderProfile'), {
  ssr: false,
  loading: () => <SkeletonLoader className='w-10 rounded-lg' />
});

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {}

const Header = (props: HeaderProps) => {
  const { className = '', ...rest } = props;

  return (
    <header
      {...rest}
      className={cn('flex items-center justify-between p-layout border-b border-border', {}, [
        className
      ])}
    >
      <HeaderSearch />
      <div className='flex items-center gap-8'>
        <HeaderButtons />
        <DynamicHeaderProfile />
      </div>
    </header>
  );
};

export default Header;
