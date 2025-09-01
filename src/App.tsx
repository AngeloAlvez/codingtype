import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, Box } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Context
import { TypingProvider } from '@/contexts';


import {AnimatedLogo, ControlPanel, CodeDisplay, TypingInput, ProgressDisplay, ResultsModal} from '@/components'

// Theme
import theme from '@/utils/theme';

// Custom hook for timer
import { useTimer } from '@/hooks';

const AppContent: React.FC = () => {
  // Initialize timer hook
  useTimer();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #a8a4c7 0%, #d8d4e8 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            backgroundColor: 'background.paper',
            borderRadius: 3,
            p: 4,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Logo */}
          <AnimatedLogo />

          {/* Controls */}
          <ControlPanel />

          {/* Code Display */}
          <CodeDisplay />

          {/* Typing Input */}
          <TypingInput />

          {/* Progress */}
          <ProgressDisplay />

          {/* Results Modal */}
          <ResultsModal />
        </Box>
      </Container>
    </Box>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TypingProvider>
        <AppContent />
      </TypingProvider>
    </ThemeProvider>
  );
};

export default App;
