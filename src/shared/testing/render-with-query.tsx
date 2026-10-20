/// <reference types="@testing-library/jest-dom/vitest" />
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { NuqsTestingAdapter } from 'nuqs/adapters/testing';
import type { ReactNode } from 'react';

interface RenderOptions {
  /** URL 시작 값. 예: '?page=2&q=kim' */
  searchParams?: string;
}

// 테스트마다 새 QueryClient(retry 없음)와 URL 상태 adapter로 감싸요.
// hasMemory: 테스트 중 URL을 바꾸는 동작(검색 입력, 페이지 이동)이 다음 렌더에 반영돼요.
export function renderWithQuery(
  ui: ReactNode,
  { searchParams = '' }: RenderOptions = {},
) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <NuqsTestingAdapter searchParams={searchParams} hasMemory>
        {ui}
      </NuqsTestingAdapter>
    </QueryClientProvider>,
  );
}
