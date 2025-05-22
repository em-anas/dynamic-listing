import { createGlobalStyle } from 'styled-components';
import { cssVariables } from './theme';

export const GlobalStyles = createGlobalStyle`
  :root {
    ${Object.entries(cssVariables)
      .map(([key, value]) => `${key}: ${value};`)
      .join('\n    ')}
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
  }

  body {
    font-family: var(--font-family);
    font-size: var(--font-size-md);
    line-height: var(--line-height-normal);
    color: var(--color-text-primary);
    background-color: var(--color-background-primary);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    color: var(--color-text-primary);
    font-weight: var(--font-weight-semibold);
    line-height: var(--line-height-tight);
  }

  h1 {
    font-size: var(--font-size-xxl);
  }

  h2 {
    font-size: var(--font-size-xl);
  }

  h3 {
    font-size: var(--font-size-lg);
  }

  h4 {
    font-size: var(--font-size-md);
  }

  h5, h6 {
    font-size: var(--font-size-sm);
  }

  p {
    margin: 0 0 var(--spacing-md) 0;
    line-height: var(--line-height-relaxed);
  }

  a {
    color: var(--color-primary);
    text-decoration: none;
    transition: color var(--transition-fast);
    
    &:hover {
      color: var(--color-hover-primary);
    }

    &:active {
      color: var(--color-active-primary);
    }
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
    font-size: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ul, ol {
    padding-left: var(--spacing-lg);
    margin: var(--spacing-md) 0;
  }

  /* Ant Design Overrides */
  .ant-layout {
    background: var(--color-background-primary);
  }

  .ant-layout-header {
    background: var(--color-primary);
    height: auto;
    line-height: 1.5;
    padding: var(--spacing-md) var(--spacing-lg);
  }

  .ant-layout-content {
    padding: var(--spacing-lg) 0;
  }

  .ant-layout-footer {
    background: var(--color-background-secondary);
    padding: var(--spacing-lg) var(--spacing-md);
    text-align: center;
  }

  .ant-card {
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-sm);
    transition: box-shadow var(--transition-normal);
    
    &:hover {
      box-shadow: var(--shadow-md);
    }

    .ant-card-head {
      border-bottom: 1px solid var(--color-border);
      padding: var(--spacing-md) var(--spacing-lg);
    }

    .ant-card-body {
      padding: var(--spacing-lg);
    }
  }

  .ant-btn {
    border-radius: var(--border-radius-md);
    font-weight: var(--font-weight-medium);
    transition: all var(--transition-normal);
    height: auto;
    padding: var(--spacing-sm) var(--spacing-md);

    &.ant-btn-primary {
      background-color: var(--color-primary);
      border-color: var(--color-primary);

      &:hover {
        background-color: var(--color-hover-primary);
        border-color: var(--color-hover-primary);
      }

      &:active {
        background-color: var(--color-active-primary);
        border-color: var(--color-active-primary);
      }
    }

    &.ant-btn-default {
      border-color: var(--color-border);
      
      &:hover {
        border-color: var(--color-hover-primary);
        color: var(--color-hover-primary);
      }
    }
  }

  .ant-input {
    border-radius: var(--border-radius-md);
    padding: var(--spacing-sm) var(--spacing-md);
    border-color: var(--color-border);
    transition: all var(--transition-normal);

    &:hover {
      border-color: var(--color-hover-primary);
    }

    &:focus {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 2px var(--color-focus-primary);
    }
  }

  .ant-select {
    .ant-select-selector {
      border-radius: var(--border-radius-md) !important;
      padding: var(--spacing-sm) var(--spacing-md);
      border-color: var(--color-border) !important;
      height: auto !important;
      transition: all var(--transition-normal);
    }

    &:hover .ant-select-selector {
      border-color: var(--color-hover-primary) !important;
    }

    &.ant-select-focused .ant-select-selector {
      border-color: var(--color-primary) !important;
      box-shadow: 0 0 0 2px var(--color-focus-primary) !important;
    }
  }

  .ant-menu {
    &.ant-menu-dark {
      background: var(--color-primary);
      
      .ant-menu-item-selected {
        background-color: var(--color-active-primary);
      }
    }
  }

  .ant-modal-content {
    border-radius: var(--border-radius-lg);
    padding: var(--spacing-lg);
  }

  .ant-drawer-content {
    border-radius: var(--border-radius-lg) 0 0 var(--border-radius-lg);
  }

  .ant-table {
    .ant-table-thead > tr > th {
      background: var(--color-background-secondary);
      color: var(--color-text-primary);
      font-weight: var(--font-weight-semibold);
    }
  }

  .ant-pagination {
    .ant-pagination-item-active {
      border-color: var(--color-primary);
      
      a {
        color: var(--color-primary);
      }
    }
  }

  .ant-form-item-label > label {
    color: var(--color-text-primary);
    font-weight: var(--font-weight-medium);
  }
`; 