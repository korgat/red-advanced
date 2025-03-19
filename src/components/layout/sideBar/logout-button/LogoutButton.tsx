import { useMutation } from '@tanstack/react-query';
import { LogOut } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

import { selectIsAuth } from '@/store/auth/auth.selectors';

import { PUBLIC } from '@/configs/public.pages';
import { STUDIO } from '@/configs/studio.pages';
import { cn } from '@/lib/utils';
import { authService } from '@/services/auth';

interface LogoutButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const LogoutButton = (props: LogoutButtonProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const { className = '', ...rest } = props;
  const isAuth = useSelector(selectIsAuth);
  const { mutate, isPending } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout(),
    onError: () => {
      toast.error('Logout error!');
    },
    onSuccess: () => {
      toast.success('Logout successfully!');
      if (pathName.includes(STUDIO.SETTINGS) || pathName.includes(STUDIO.HOME)) {
        router.push(PUBLIC.HOME);
      }
    }
  });

  return isAuth ? (
    <button
      {...rest}
      className={cn(
        'flex items-center gap-5 py-1.5 group whitespace-nowrap',
        {
          'pointer-events-none': isPending
        },
        [className]
      )}
      title='Logout'
      onClick={() => mutate()}
    >
      <LogOut className='min-w-6 group-hover:rotate-12 group-hover:text-primary transition' />
      <span className='border-b border-transparent group-hover:translate-x-0.5 group-hover:text-primary transition'>
        {isPending ? 'Processing...' : 'Logout'}
      </span>
    </button>
  ) : null;
};

export default LogoutButton;
