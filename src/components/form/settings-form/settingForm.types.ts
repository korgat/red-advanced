import type { IChannel } from '@/types/chanel.types';
import type { IFullUser } from '@/types/user.types';

export interface ISettingsForm extends Pick<IFullUser, 'name' | 'email'> {
  password?: string;
  channel?: Pick<IChannel, 'avatarUrl' | 'bannerUrl' | 'slug' | 'description'>;
}
