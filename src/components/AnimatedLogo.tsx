import React from 'react';
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTyping } from '../contexts/TypingContext';

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
  gap: theme.spacing(1),
  fontFamily: '"Orbitron", monospace',
  fontWeight: 900,
}));

const LogoCoding = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  fontWeight: 900,
  color: theme.palette.primary.main,
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
  fontFamily: '"Orbitron", monospace',
  [theme.breakpoints.down('md')]: {
    fontSize: '2.2rem',
  },
}));

interface LogoTypeProps {
  hasStartedTyping: boolean;
}

const LogoType = styled(Typography)<LogoTypeProps>(({ theme, hasStartedTyping }) => ({
  fontSize: '3rem',
  fontWeight: 900,
  color: theme.palette.secondary.main,
  fontFamily: '"Orbitron", monospace',
  position: 'relative',
  overflow: 'hidden',
  borderRight: hasStartedTyping ? 'none' : `3px solid ${theme.palette.secondary.main}`,
  animation: hasStartedTyping 
    ? 'none' 
    : 'typewriter 6s steps(4) infinite, blink 1s infinite',
  width: hasStartedTyping ? '4ch' : 'auto',
  
  '@keyframes typewriter': {
    '0%': { width: 0 },
    '20%': { width: '4ch' },
    '70%': { width: '4ch' },
    '100%': { width: 0 },
  },
  
  '@keyframes blink': {
    '0%, 50%': { borderColor: theme.palette.secondary.main },
    '51%, 100%': { borderColor: 'transparent' },
  },
  
  [theme.breakpoints.down('md')]: {
    fontSize: '2.2rem',
  },
}));

export const AnimatedLogo: React.FC = () => {
  const { state } = useTyping();

  return (
    <LogoContainer>
      <LogoCoding variant="h1">
        typing
      </LogoCoding>
      <LogoType 
        variant="h1" 
        hasStartedTyping={state.hasStartedTyping}
      >
        code
      </LogoType>
    </LogoContainer>
  );
};

export default AnimatedLogo;
