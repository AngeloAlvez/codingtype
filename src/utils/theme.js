import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5a4b7c',
      light: '#7d6ea8',
      dark: '#4a3d66',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#6b5a91',
      light: '#9c8bb5',
      dark: '#5a4b7c',
      contrastText: '#ffffff',
    },
    success: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
      contrastText: '#ffffff',
    },
    error: {
      main: '#f44336',
      light: '#ef5350',
      dark: '#d32f2f',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ff9800',
      light: '#FFE082',
      dark: '#f57c00',
      contrastText: '#000000',
    },
    info: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
      contrastText: '#ffffff',
    },
    background: {
      default: '#a8a4c7',
      paper: '#ffffff',
    },
    grey: {
      50: '#f8f8f8',
      100: '#f0f0f0',
      200: '#e8e8e8',
      300: '#d0d0d0',
      400: '#b0b0b0',
      500: '#909090',
      600: '#606060',
      700: '#404040',
      800: '#202020',
      900: '#101010',
    },
  },
  typography: {
    fontFamily: '"JetBrains Mono", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Orbitron", monospace',
      fontWeight: 900,
    },
    h2: {
      fontFamily: '"Orbitron", monospace',
      fontWeight: 700,
    },
    h3: {
      fontFamily: '"Orbitron", monospace',
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
          fontSize: '0.9rem',
          fontWeight: 600,
        },
        contained: {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          '&:hover': {
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          height: 8,
        },
      },
    },
  },
});

export default theme;
