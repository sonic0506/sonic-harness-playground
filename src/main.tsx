import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/app/app';
import '@/app/styles/index.css';

async function enableMocking() {
  if (!import.meta.env.DEV) return;
  const { worker } = await import('@/app/mocks/browser');
  await worker.start({ onUnhandledFrame: 'bypass' });
}

void enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
