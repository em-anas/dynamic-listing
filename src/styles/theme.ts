import type { DefaultTheme } from 'styled-components';

interface CustomTheme extends DefaultTheme {
  colors: {
    primary: string;
    secondary: string;
    error: string;
    warning: string;
    success: string;
    text: {
      primary: string;
      secondary: string;
      disabled: string;
    };
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    border: string;
    hover: {
      primary: string;
      secondary: string;
    };
    active: {
      primary: string;
      secondary: string;
    };
    focus: {
      primary: string;
      secondary: string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    fontWeight: {
      regular: number;
      medium: number;
      semibold: number;
      bold: number;
    };
    lineHeight: {
      tight: number;
      normal: number;
      relaxed: number;
    };
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    round: string;
  };
  shadows: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  zIndex: {
    dropdown: number;
    sticky: number;
    fixed: number;
    modal: number;
    popover: number;
    tooltip: number;
  };
  transitions: {
    fast: string;
    normal: string;
    slow: string;
  };
}

export const theme: CustomTheme = {
  colors: {
    primary: '#1890ff',
    secondary: '#52c41a',
    error: '#ff4d4f',
    warning: '#faad14',
    success: '#52c41a',
    text: {
      primary: 'rgba(0, 0, 0, 0.85)',
      secondary: 'rgba(0, 0, 0, 0.45)',
      disabled: 'rgba(0, 0, 0, 0.25)',
    },
    background: {
      primary: '#ffffff',
      secondary: '#f5f5f5',
      tertiary: '#fafafa',
    },
    border: '#d9d9d9',
    hover: {
      primary: '#40a9ff',
      secondary: '#73d13d',
    },
    active: {
      primary: '#096dd9',
      secondary: '#389e0d',
    },
    focus: {
      primary: 'rgba(24, 144, 255, 0.2)',
      secondary: 'rgba(82, 196, 26, 0.2)',
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '20px',
      xl: '24px',
      xxl: '32px',
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  borderRadius: {
    sm: '2px',
    md: '4px',
    lg: '8px',
    xl: '16px',
    round: '50%',
  },
  shadows: {
    none: 'none',
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
  },
  breakpoints: {
    xs: '480px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1600px',
  },
  zIndex: {
    dropdown: 1050,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1060,
    tooltip: 1070,
  },
  transitions: {
    fast: '0.1s ease-in-out',
    normal: '0.2s ease-in-out',
    slow: '0.3s ease-in-out',
  },
};

// CSS Variables for dynamic theming
export const cssVariables = {
  '--color-primary': theme.colors.primary,
  '--color-secondary': theme.colors.secondary,
  '--color-error': theme.colors.error,
  '--color-warning': theme.colors.warning,
  '--color-success': theme.colors.success,
  '--color-text-primary': theme.colors.text.primary,
  '--color-text-secondary': theme.colors.text.secondary,
  '--color-text-disabled': theme.colors.text.disabled,
  '--color-background-primary': theme.colors.background.primary,
  '--color-background-secondary': theme.colors.background.secondary,
  '--color-background-tertiary': theme.colors.background.tertiary,
  '--color-border': theme.colors.border,
  '--color-hover-primary': theme.colors.hover.primary,
  '--color-hover-secondary': theme.colors.hover.secondary,
  '--color-active-primary': theme.colors.active.primary,
  '--color-active-secondary': theme.colors.active.secondary,
  '--color-focus-primary': theme.colors.focus.primary,
  '--color-focus-secondary': theme.colors.focus.secondary,
  
  '--spacing-xs': theme.spacing.xs,
  '--spacing-sm': theme.spacing.sm,
  '--spacing-md': theme.spacing.md,
  '--spacing-lg': theme.spacing.lg,
  '--spacing-xl': theme.spacing.xl,
  '--spacing-xxl': theme.spacing.xxl,
  
  '--font-family': theme.typography.fontFamily,
  '--font-size-xs': theme.typography.fontSize.xs,
  '--font-size-sm': theme.typography.fontSize.sm,
  '--font-size-md': theme.typography.fontSize.md,
  '--font-size-lg': theme.typography.fontSize.lg,
  '--font-size-xl': theme.typography.fontSize.xl,
  '--font-size-xxl': theme.typography.fontSize.xxl,
  
  '--font-weight-regular': theme.typography.fontWeight.regular.toString(),
  '--font-weight-medium': theme.typography.fontWeight.medium.toString(),
  '--font-weight-semibold': theme.typography.fontWeight.semibold.toString(),
  '--font-weight-bold': theme.typography.fontWeight.bold.toString(),
  
  '--line-height-tight': theme.typography.lineHeight.tight.toString(),
  '--line-height-normal': theme.typography.lineHeight.normal.toString(),
  '--line-height-relaxed': theme.typography.lineHeight.relaxed.toString(),
  
  '--border-radius-sm': theme.borderRadius.sm,
  '--border-radius-md': theme.borderRadius.md,
  '--border-radius-lg': theme.borderRadius.lg,
  '--border-radius-xl': theme.borderRadius.xl,
  '--border-radius-round': theme.borderRadius.round,
  
  '--shadow-none': theme.shadows.none,
  '--shadow-sm': theme.shadows.sm,
  '--shadow-md': theme.shadows.md,
  '--shadow-lg': theme.shadows.lg,
  '--shadow-xl': theme.shadows.xl,
  
  '--transition-fast': theme.transitions.fast,
  '--transition-normal': theme.transitions.normal,
  '--transition-slow': theme.transitions.slow,
  
  '--breakpoint-xs': theme.breakpoints.xs,
  '--breakpoint-sm': theme.breakpoints.sm,
  '--breakpoint-md': theme.breakpoints.md,
  '--breakpoint-lg': theme.breakpoints.lg,
  '--breakpoint-xl': theme.breakpoints.xl,
  '--breakpoint-xxl': theme.breakpoints.xxl,
  
  '--z-index-dropdown': theme.zIndex.dropdown.toString(),
  '--z-index-sticky': theme.zIndex.sticky.toString(),
  '--z-index-fixed': theme.zIndex.fixed.toString(),
  '--z-index-modal': theme.zIndex.modal.toString(),
  '--z-index-popover': theme.zIndex.popover.toString(),
  '--z-index-tooltip': theme.zIndex.tooltip.toString(),
} as const; 