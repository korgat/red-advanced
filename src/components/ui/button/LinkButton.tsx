import type { LinkProps } from 'next/link';
import Link from 'next/link';
import React, { type ReactNode } from 'react';

import { cn } from '@/lib/utils';

type TCombineProps = LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;

interface LinkButtonProps extends TCombineProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'simple';
}

const LinkButton = (props: LinkButtonProps) => {
  const { className = '', variant, children, ...rest } = props;

  return (
    <Link
      {...rest}
      className={cn(
        'flex items-center justify-center gap-2 py-2 px-10 font-semibold rounded transition-colors text-gray-500 hover:text-white disabled:bg-gray-400',
        {
          'bg-primary text-white hover:bg-red-400': variant === 'primary',
          'bg-gray-600 text-white hover:bg-gray-500': variant === 'secondary',
          'bg-border rounded font-medium hover:bg-gray-700/95': variant === 'simple'
        },
        [className]
      )}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
