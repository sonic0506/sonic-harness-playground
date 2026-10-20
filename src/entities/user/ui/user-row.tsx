import type { UserDto } from '../model/user.dto';

interface UserRowProps {
  user: UserDto;
}

export function UserRow({ user }: UserRowProps) {
  return (
    <li>
      <strong>{user.name}</strong> <span>{user.email}</span>{' '}
      <span>{user.isActive ? '활성' : '비활성'}</span>
    </li>
  );
}
