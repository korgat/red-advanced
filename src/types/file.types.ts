import type { EnumVideoPlayerQuality } from './video.types';

export interface UploadResponseItem {
  url: string;
  name: string;
  maxResolution?: EnumVideoPlayerQuality;
}

export interface IProgressProcessingResponse {
  fileName: string;
  status: number;
}
