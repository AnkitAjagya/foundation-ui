// ============================================
// DESIGN SYSTEM TOKENS
// Complete token system for consistent styling
// ============================================

export const tokens = {
  // ==========================================
  // COLOR TOKENS
  // ==========================================
  colors: {
    // Primary palette - Blue/Indigo
    primary: {
      50: "hsl(226, 100%, 97%)",
      100: "hsl(226, 100%, 94%)",
      200: "hsl(226, 100%, 87%)",
      300: "hsl(226, 100%, 76%)",
      400: "hsl(226, 100%, 64%)",
      500: "hsl(226, 100%, 54%)", // Main
      600: "hsl(226, 100%, 47%)",
      700: "hsl(226, 100%, 40%)",
      800: "hsl(226, 100%, 33%)",
      900: "hsl(226, 100%, 27%)",
      950: "hsl(226, 100%, 17%)",
    },
    // Secondary palette - Slate
    secondary: {
      50: "hsl(210, 40%, 98%)",
      100: "hsl(210, 40%, 96%)",
      200: "hsl(214, 32%, 91%)",
      300: "hsl(213, 27%, 84%)",
      400: "hsl(215, 20%, 65%)",
      500: "hsl(215, 16%, 47%)",
      600: "hsl(215, 19%, 35%)",
      700: "hsl(215, 25%, 27%)",
      800: "hsl(217, 33%, 17%)",
      900: "hsl(222, 47%, 11%)",
      950: "hsl(229, 84%, 5%)",
    },
    // Accent palette - Violet
    accent: {
      50: "hsl(270, 100%, 98%)",
      100: "hsl(270, 100%, 95%)",
      200: "hsl(270, 100%, 90%)",
      300: "hsl(270, 100%, 82%)",
      400: "hsl(270, 100%, 70%)",
      500: "hsl(270, 100%, 60%)",
      600: "hsl(270, 100%, 50%)",
      700: "hsl(270, 100%, 42%)",
      800: "hsl(270, 100%, 35%)",
      900: "hsl(270, 100%, 28%)",
    },
    // Semantic colors
    success: {
      light: "hsl(142, 76%, 94%)",
      main: "hsl(142, 76%, 36%)",
      dark: "hsl(142, 76%, 28%)",
    },
    warning: {
      light: "hsl(38, 92%, 95%)",
      main: "hsl(38, 92%, 50%)",
      dark: "hsl(38, 92%, 40%)",
    },
    error: {
      light: "hsl(0, 84%, 95%)",
      main: "hsl(0, 84%, 60%)",
      dark: "hsl(0, 84%, 45%)",
    },
    info: {
      light: "hsl(199, 89%, 95%)",
      main: "hsl(199, 89%, 48%)",
      dark: "hsl(199, 89%, 38%)",
    },
    // Neutral
    muted: {
      light: "hsl(210, 40%, 96%)",
      main: "hsl(215, 16%, 47%)",
      dark: "hsl(215, 25%, 27%)",
    },
  },

  // ==========================================
  // TYPOGRAPHY SCALE
  // ==========================================
  typography: {
    fontFamily: {
      sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      display: "'Cal Sans', 'Inter', -apple-system, sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', monospace",
    },
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1rem" }],
      sm: ["0.875rem", { lineHeight: "1.25rem" }],
      base: ["1rem", { lineHeight: "1.5rem" }],
      lg: ["1.125rem", { lineHeight: "1.75rem" }],
      xl: ["1.25rem", { lineHeight: "1.75rem" }],
      "2xl": ["1.5rem", { lineHeight: "2rem" }],
      "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
      "5xl": ["3rem", { lineHeight: "1.16" }],
      "6xl": ["3.75rem", { lineHeight: "1.1" }],
      "7xl": ["4.5rem", { lineHeight: "1.05" }],
    },
    fontWeight: {
      thin: "100",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      black: "900",
    },
    letterSpacing: {
      tighter: "-0.05em",
      tight: "-0.025em",
      normal: "0",
      wide: "0.025em",
      wider: "0.05em",
      widest: "0.1em",
    },
  },

  // ==========================================
  // BORDER RADIUS
  // ==========================================
  borderRadius: {
    none: "0",
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    full: "9999px",
  },

  // ==========================================
  // SPACING SCALE
  // ==========================================
  spacing: {
    px: "1px",
    0: "0",
    0.5: "0.125rem",
    1: "0.25rem",
    1.5: "0.375rem",
    2: "0.5rem",
    2.5: "0.625rem",
    3: "0.75rem",
    3.5: "0.875rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    7: "1.75rem",
    8: "2rem",
    9: "2.25rem",
    10: "2.5rem",
    11: "2.75rem",
    12: "3rem",
    14: "3.5rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
    28: "7rem",
    32: "8rem",
    36: "9rem",
    40: "10rem",
    44: "11rem",
    48: "12rem",
    52: "13rem",
    56: "14rem",
    60: "15rem",
    64: "16rem",
    72: "18rem",
    80: "20rem",
    96: "24rem",
  },

  // ==========================================
  // SHADOWS
  // ==========================================
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    soft: "0 2px 15px -3px rgb(0 0 0 / 0.07), 0 10px 20px -2px rgb(0 0 0 / 0.04)",
    glow: "0 0 20px rgb(99 102 241 / 0.4)",
    "glow-lg": "0 0 40px rgb(99 102 241 / 0.3)",
    inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
    glass: "0 8px 32px 0 rgb(31 38 135 / 0.15)",
  },

  // ==========================================
  // OPACITY SCALE
  // ==========================================
  opacity: {
    0: "0",
    5: "0.05",
    10: "0.1",
    20: "0.2",
    25: "0.25",
    30: "0.3",
    40: "0.4",
    50: "0.5",
    60: "0.6",
    70: "0.7",
    75: "0.75",
    80: "0.8",
    90: "0.9",
    95: "0.95",
    100: "1",
  },

  // ==========================================
  // Z-INDEX SCALE
  // ==========================================
  zIndex: {
    auto: "auto",
    0: "0",
    10: "10",
    20: "20",
    30: "30",
    40: "40",
    50: "50",
    dropdown: "100",
    sticky: "200",
    fixed: "300",
    modal: "400",
    popover: "500",
    tooltip: "600",
    toast: "700",
    max: "9999",
  },

  // ==========================================
  // ANIMATION & TRANSITION TOKENS
  // ==========================================
  animation: {
    duration: {
      instant: "0ms",
      fastest: "50ms",
      faster: "100ms",
      fast: "150ms",
      normal: "200ms",
      slow: "300ms",
      slower: "400ms",
      slowest: "500ms",
      lazy: "700ms",
      gentle: "1000ms",
    },
    easing: {
      linear: "linear",
      ease: "ease",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      easeOut: "cubic-bezier(0, 0, 0.2, 1)",
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      smooth: "cubic-bezier(0.23, 1, 0.32, 1)",
    },
    keyframes: {
      fadeIn: {
        from: { opacity: "0" },
        to: { opacity: "1" },
      },
      fadeInUp: {
        from: { opacity: "0", transform: "translateY(20px)" },
        to: { opacity: "1", transform: "translateY(0)" },
      },
      fadeInDown: {
        from: { opacity: "0", transform: "translateY(-20px)" },
        to: { opacity: "1", transform: "translateY(0)" },
      },
      fadeInLeft: {
        from: { opacity: "0", transform: "translateX(-20px)" },
        to: { opacity: "1", transform: "translateX(0)" },
      },
      fadeInRight: {
        from: { opacity: "0", transform: "translateX(20px)" },
        to: { opacity: "1", transform: "translateX(0)" },
      },
      scaleIn: {
        from: { opacity: "0", transform: "scale(0.9)" },
        to: { opacity: "1", transform: "scale(1)" },
      },
      scaleOut: {
        from: { opacity: "1", transform: "scale(1)" },
        to: { opacity: "0", transform: "scale(0.9)" },
      },
      slideInUp: {
        from: { transform: "translateY(100%)" },
        to: { transform: "translateY(0)" },
      },
      slideInDown: {
        from: { transform: "translateY(-100%)" },
        to: { transform: "translateY(0)" },
      },
      slideInLeft: {
        from: { transform: "translateX(-100%)" },
        to: { transform: "translateX(0)" },
      },
      slideInRight: {
        from: { transform: "translateX(100%)" },
        to: { transform: "translateX(0)" },
      },
      pulse: {
        "0%, 100%": { opacity: "1" },
        "50%": { opacity: "0.5" },
      },
      shimmer: {
        "0%": { backgroundPosition: "-200% 0" },
        "100%": { backgroundPosition: "200% 0" },
      },
      float: {
        "0%, 100%": { transform: "translateY(0)" },
        "50%": { transform: "translateY(-10px)" },
      },
      wiggle: {
        "0%, 100%": { transform: "rotate(-3deg)" },
        "50%": { transform: "rotate(3deg)" },
      },
      spin: {
        from: { transform: "rotate(0deg)" },
        to: { transform: "rotate(360deg)" },
      },
      ping: {
        "75%, 100%": { transform: "scale(2)", opacity: "0" },
      },
      bounce: {
        "0%, 100%": { transform: "translateY(-25%)", animationTimingFunction: "cubic-bezier(0.8,0,1,1)" },
        "50%": { transform: "none", animationTimingFunction: "cubic-bezier(0,0,0.2,1)" },
      },
      shake: {
        "0%, 100%": { transform: "translateX(0)" },
        "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-4px)" },
        "20%, 40%, 60%, 80%": { transform: "translateX(4px)" },
      },
    },
  },

  // ==========================================
  // BLUR, GLASS, GRADIENT TOKENS
  // ==========================================
  blur: {
    none: "0",
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    "2xl": "24px",
    "3xl": "40px",
  },

  glass: {
    light: {
      background: "rgba(255, 255, 255, 0.25)",
      blur: "16px",
      border: "rgba(255, 255, 255, 0.18)",
    },
    dark: {
      background: "rgba(17, 25, 40, 0.75)",
      blur: "16px",
      border: "rgba(255, 255, 255, 0.125)",
    },
    frosted: {
      background: "rgba(255, 255, 255, 0.1)",
      blur: "24px",
      border: "rgba(255, 255, 255, 0.2)",
    },
  },

  gradients: {
    primary: "linear-gradient(135deg, hsl(226, 100%, 54%) 0%, hsl(270, 100%, 60%) 100%)",
    secondary: "linear-gradient(135deg, hsl(215, 25%, 27%) 0%, hsl(222, 47%, 11%) 100%)",
    accent: "linear-gradient(135deg, hsl(270, 100%, 60%) 0%, hsl(320, 100%, 60%) 100%)",
    success: "linear-gradient(135deg, hsl(142, 76%, 36%) 0%, hsl(152, 76%, 36%) 100%)",
    warning: "linear-gradient(135deg, hsl(38, 92%, 50%) 0%, hsl(28, 92%, 50%) 100%)",
    error: "linear-gradient(135deg, hsl(0, 84%, 60%) 0%, hsl(350, 84%, 60%) 100%)",
    hero: "linear-gradient(135deg, hsl(226, 100%, 54%) 0%, hsl(270, 100%, 50%) 50%, hsl(320, 100%, 55%) 100%)",
    glass: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
    shimmer: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
    radial: "radial-gradient(ellipse at center, hsl(226, 100%, 54%) 0%, transparent 70%)",
    mesh: `
      radial-gradient(at 40% 20%, hsl(226, 100%, 54%) 0px, transparent 50%),
      radial-gradient(at 80% 0%, hsl(270, 100%, 60%) 0px, transparent 50%),
      radial-gradient(at 0% 50%, hsl(226, 100%, 76%) 0px, transparent 50%),
      radial-gradient(at 80% 50%, hsl(320, 100%, 60%) 0px, transparent 50%),
      radial-gradient(at 0% 100%, hsl(270, 100%, 50%) 0px, transparent 50%)
    `,
  },

  // ==========================================
  // BREAKPOINTS
  // ==========================================
  breakpoints: {
    xs: "475px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
} as const;

export type DesignTokens = typeof tokens;
export default tokens;
