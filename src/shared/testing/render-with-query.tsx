import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { NuqsTestingAdapter } from 'nuqs/adapters/testing';
import type { ReactNode } from 'react';

// 테스트마다 새 QueryClient(retry 없음)로 감싸요.
export function renderWithQuery(ui: ReactNode) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <NuqsTestingAdapter>{ui}</NuqsTestingAdapter>
    </QueryClientProvider>,
  );
}
