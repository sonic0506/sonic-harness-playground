import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';

import { renderWithQuery, server } from '@/shared/testing';

import { UserListPage } from './user-list-page';

describe('UserListPage', () => {
  it('사용자의 이름, 이메일, 활성 여부를 보여 줘요', async () => {
    renderWithQuery(<UserListPage />);

    expect(await screen.findByText('김소닉')).toBeInTheDocument();
    expect(screen.getByText('kim@sonic.dev')).toBeInTheDocument();
    expect(screen.getAllByText('활성').length).toBeGreaterThan(0);
    expect(screen.getAllByText('비활성').length).toBeGreaterThan(0);
  });

  it('사용자가 없으면 빈 상태를 보여 줘요', async () => {
    server.use(http.get('/api/users', () => HttpResponse.json([])));
    renderWithQuery(<UserListPage />);

    expect(await screen.findByText('사용자가 없어요.')).toBeInTheDocument();
  });

  it('서버 에러가 나면 다시 시도 버튼을 보여 주고, 누르면 다시 불러와요', async () => {
    const user = userEvent.setup();
    server.use(
      http.get('/api/users', () => new HttpResponse(null, { status: 500 }), {
        once: true,
      }),
    );
    renderWithQuery(<UserListPage />);

    expect(await screen.findByRole('alert')).toHaveTextContent(
      '사용자를 불러오지 못했어요.',
    );

    await user.click(screen.getByRole('button', { name: '다시 시도' }));

    expect(await screen.findByText('김소닉')).toBeInTheDocument();
  });

  it('URL에 검색어가 있으면 그 결과만 보여 줘요', async () => {
    renderWithQuery(<UserListPage />, { searchParams: '?q=kim' });

    expect(await screen.findByText('김린트')).toBeInTheDocument();
    expect(screen.getByRole('searchbox', { name: '사용자 검색' })).toHaveValue(
      'kim',
    );
    expect(screen.queryByText('이하네')).not.toBeInTheDocument();
  });

  it('URL에 페이지가 있으면 그 페이지를 보여 줘요', async () => {
    renderWithQuery(<UserListPage />, { searchParams: '?page=2' });

    expect(await screen.findByText('강타입')).toBeInTheDocument();
    expect(screen.queryByText('김소닉')).not.toBeInTheDocument();
  });

  it('검색어를 입력하면 그 결과만 보여 줘요', async () => {
    const user = userEvent.setup();
    renderWithQuery(<UserListPage />);
    await screen.findByText('이하네');

    await user.type(
      screen.getByRole('searchbox', { name: '사용자 검색' }),
      'lee',
    );

    expect(await screen.findByText('이하네')).toBeInTheDocument();
    expect(screen.queryByText('김소닉')).not.toBeInTheDocument();
  });

  it('다음, 이전을 누르면 페이지를 옮겨요', async () => {
    const user = userEvent.setup();
    renderWithQuery(<UserListPage />);
    expect(screen.getByRole('button', { name: '이전' })).toBeDisabled();

    await user.click(screen.getByRole('button', { name: '다음' }));
    expect(await screen.findByText('강타입')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '이전' }));
    expect(await screen.findByText('김소닉')).toBeInTheDocument();
  });
});
