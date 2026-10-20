/// <reference types="@testing-library/jest-dom/vitest" />
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { NuqsTestingAdapter } from 'nuqs/adapters/testing';
import type { ReactNode } from 'react';

interface RenderOptions {
  /** URL 시작 값. 예: '?page=2&q=kim' */
  searchParams?: string;
}

// 테스트마다 새 QueryClient(retry 없음)로 감싸요.
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
