// test-utils.tsx
import { cleanup, render as rtlRender } from '@testing-library/react';
import { afterEach } from 'vitest';
import { ReactElement } from 'react';

afterEach(() => {
  cleanup();
});

function customRender(ui: ReactElement, options = {}) {
  return rtlRender(ui, {
    wrapper: ({ children }) => children,
    ...options,
  });
}

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { customRender as render };
