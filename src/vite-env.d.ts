/// <reference types="vite/client" />

// Add process.env declaration to fix linting issues
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
  }
}

declare const process: {
  env: {
    NODE_ENV: 'development' | 'production' | 'test';
    [key: string]: string;
  }
}
