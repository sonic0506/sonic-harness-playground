import '@/app/styles/index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@/app/app';
import { env } from '@/shared/config';

async function enableMocking() {
  if (!env.DEV) return;
  const { worker } = await import('@/app/mocks/browser');
  await worker.start({ onUnhandledFrame: 'bypass' });
}

const root = document.getElementById('root');
if (!root) throw new Error('index.html에 #root가 없어요');

void enableMocking().then(() => {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
