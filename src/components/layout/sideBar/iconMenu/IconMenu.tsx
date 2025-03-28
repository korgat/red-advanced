import { usePathname } from 'next/navigation';
import { match } from 'path-to-regexp';
import React from 'react';

import IconMenuItem from './iconMenuItem/IconMenuItem';
import type { IIconMenuItem } from './iconMenuItem/IconMenuItem.types';
import { cn } from '@/lib/utils';

interface IconMenuProps extends React.HTMLAttributes<HTMLElement> {
  items: IIconMenuItem[];
  title?: string;
  border?: boolean;
  isSidebarOpen: boolean;
}

const IconMenu = (props: IconMenuProps) => {
  const { className = '', items, title, border, isSidebarOpen, ...rest } = props;
  const pathName = usePathname();

  return (
    <>
      <h5
        className={cn('text-sm opacity-50 mb-3 whitespace-nowrap', {
          'transition-opacity opacity-0': !isSidebarOpen
        })}
      >
        {title}
      </h5>
      <nav
        {...rest}
        className={cn(
          'mb-5',
          {
            'border-b border-border pb-5': border
          },
          [className]
        )}
      >
        <ul>
          {items.map(item => (
            <IconMenuItem
              key={item.name}
              icon={item.icon}
              name={item.name}
              link={item.link}
              active={!!match(item.link)(pathName)}
              isSidebarOpen={isSidebarOpen}
            />
          ))}
        </ul>
      </nav>
    </>
  );
};

export default IconMenu;
