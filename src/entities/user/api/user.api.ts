import { http } from '@/shared/api';

import type { GetUsersParams, UserDto } from '../model/user.dto';

export const getUsers = ({ page, q }: GetUsersParams) =>
  http<UserDto[]>(`/users?${new URLSearchParams({ page: String(page), q })}`);
