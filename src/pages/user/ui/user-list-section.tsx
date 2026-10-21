import { type GetUsersParams, UserRow, useUsersQuery } from '@/entities/user';

export function UserListSection({ page, q }: GetUsersParams) {
  const { data: users } = useUsersQuery({ page, q });

  if (users.length === 0) return <p>사용자가 없어요.</p>;
  return (
    <ul>
      {users.map((user) => (
        <UserRow key={user.id} user={user} />
      ))}
    </ul>
  );
}
