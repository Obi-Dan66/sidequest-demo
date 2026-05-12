import { http } from '@/services/api';
import { type UploadDto } from '@/types/dto';

export const uploadsApi = {
  upload(file: File): Promise<UploadDto> {
    const form = new FormData();
    form.append('file', file);
    return http.post<UploadDto, FormData>('/uploads', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
