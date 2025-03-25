'use client';

async function initMocks() {
  if (typeof window === 'undefined') return;

  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('@/mocks/browser');
    worker.start({ onUnhandledRequest: 'bypass' });
  }
}

initMocks();