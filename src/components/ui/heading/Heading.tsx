import type { LucideIcon } from 'lucide-react';
import React, { type ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  icon?: LucideIcon;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const Heading = (props: HeadingProps) => {
  const { className, icon: Icon, children, tag: Tag = 'h2', ...rest } = props;

  return (
    <div
      {...rest}
      className={cn('flex items-center gap-1.5 mb-4 text-gray-200 text-lg font-semibold', {}, [
        className
      ])}
    >
      {Icon && <Icon className='text-primary' />}
      <Tag>{children}</Tag>
    </div>
  );
};

export default Heading;
