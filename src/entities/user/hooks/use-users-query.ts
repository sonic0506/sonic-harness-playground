import { useSuspenseQuery } from '@tanstack/react-query';

import { userQueries } from '../api/user.queries';
import type { GetUsersParams } from '../model/user.dto';

export function useUsersQuery(params: GetUsersParams) {
  return useSuspenseQuery(userQueries.list(params));
}
