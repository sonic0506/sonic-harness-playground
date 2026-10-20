import { http, HttpResponse } from 'msw';
import type { UserDto } from '../model/user.dto';

const PAGE_SIZE = 5;

const USERS: UserDto[] = [
  { id: '1', name: '김소닉', email: 'kim@sonic.dev', isActive: true },
  { id: '2', name: '이하네', email: 'lee@sonic.dev', isActive: false },
  { id: '3', name: '박스택', email: 'park@sonic.dev', isActive: true },
  { id: '4', name: '최쿼리', email: 'choi@sonic.dev', isActive: true },
  { id: '5', name: '정훅', email: 'jung@sonic.dev', isActive: false },
  { id: '6', name: '강타입', email: 'kang@sonic.dev', isActive: true },
  { id: '7', name: '김린트', email: 'kim.lint@sonic.dev', isActive: true },
];

export const userHandlers = [
  http.get('/api/users', ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') ?? '1');
    const q = (url.searchParams.get('q') ?? '').toLowerCase();
    const matched = USERS.filter(
      (user) =>
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q),
    );
    return HttpResponse.json(
      matched.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    );
  }),
];
