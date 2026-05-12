import { http } from '@/services/api';
import { type AuthSessionDto, type LoginDto, type RegisterDto, type UserDto } from '@/types/dto';

export const authApi = {
  register(payload: RegisterDto): Promise<AuthSessionDto> {
    return http.post<AuthSessionDto, RegisterDto>('/auth/register', payload);
  },

  login(payload: LoginDto): Promise<AuthSessionDto> {
    return http.post<AuthSessionDto, LoginDto>('/auth/login', payload);
  },

  refresh(refreshToken: string): Promise<AuthSessionDto> {
    return http.post<AuthSessionDto, { refreshToken: string }>('/auth/refresh', {
      refreshToken,
    });
  },

  me(): Promise<UserDto> {
    return http.get<UserDto>('/auth/me');
  },

  logout(): Promise<void> {
    return http.postVoid('/auth/logout');
  },
};
