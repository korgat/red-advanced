import { EnumVideoPlayerQuality } from '@/types/video.types';

export const defaultVideoQuality = EnumVideoPlayerQuality['1080p'];

export interface HTMLCustomVideoElement extends HTMLVideoElement {
  mozRequestFullScreen?: () => Promise<void>;
  webkitRequestFullscreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
}
