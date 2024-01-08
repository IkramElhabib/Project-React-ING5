import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import { expect as vitestExpect } from 'vitest';

// extends Vitest's expect method with methods from react-testing-library
vitestExpect.extend(matchers);

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
