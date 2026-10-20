import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense, useDeferredValue } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useUserListSearchParams } from './model/use-user-list-search-params';
import { UserListSection } from './ui/user-list-section';

export function UserListPage() {
  const [{ page, q }, setSearchParams] = useUserListSearchParams();
  // 입력 중에 목록이 fallback으로 깜빡이지 않도록 이전 목록을 유지해요.
  const deferred = useDeferredValue({ page, q });

  return (
    <main>
      <h1>사용자</h1>
      <input
        type="search"
        aria-label="사용자 검색"
        value={q}
        onChange={(event) =>
          void setSearchParams({ q: event.target.value, page: 1 })
        }
      />
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary }) => (
              <div role="alert">
                <p>사용자를 불러오지 못했어요.</p>
                <button type="button" onClick={resetErrorBoundary}>
                  다시 시도
                </button>
              </div>
            )}
          >
            <Suspense fallback={<p>불러오는 중이에요.</p>}>
              <UserListSection page={deferred.page} q={deferred.q} />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => void setSearchParams({ page: page - 1 })}
      >
        이전
      </button>
      <span> {page} </span>
      <button
        type="button"
        onClick={() => void setSearchParams({ page: page + 1 })}
      >
        다음
      </button>
    </main>
  );
}
