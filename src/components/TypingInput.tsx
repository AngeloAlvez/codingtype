import React from 'react';
import { TextField, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTyping } from '@/contexts/TypingContext';
import { useTypingLogic } from '@/hooks/useTypingLogic';
import { InputStatus } from '@/types';

interface StyledTextFieldProps {
  inputStatus: InputStatus;
}

const StyledTextField = styled(TextField)<StyledTextFieldProps>(({ theme, inputStatus }) => {
  let borderColor = theme.palette.grey[400];
  let backgroundColor = theme.palette.background.paper;

  switch (inputStatus) {
    case 'correct':
      borderColor = theme.palette.success.main;
      backgroundColor = theme.palette.success.light + '20';
      break;
    case 'incorrect':
      borderColor = theme.palette.error.main;
      backgroundColor = theme.palette.error.light + '20';
      break;
    default:
      break;
  }

  return {
    '& .MuiOutlinedInput-root': {
      fontFamily: '"JetBrains Mono", "Courier New", monospace',
      fontSize: '16px',
      backgroundColor,
      transition: 'all 0.3s ease',
      
      '& fieldset': {
        borderColor,
        borderWidth: '2px',
      },
      
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
      
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
        borderWidth: '2px',
      },
      
      '&.Mui-disabled': {
        backgroundColor: theme.palette.grey[200],
        color: theme.palette.grey[600],
      },
    },
    
    [theme.breakpoints.down('md')]: {
      '& .MuiOutlinedInput-root': {
        fontSize: '14px',
      },
    },
  };
});

export const TypingInput: React.FC = () => {
  const { state } = useTyping();
  const { handleInputChange, handleKeyDown, getInputStatus } = useTypingLogic();

  const inputStatus = getInputStatus();

  return (
    <Box mb={3}>
      <StyledTextField
        fullWidth
        value={state.userInput}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Digite a palavra atual..."
        disabled={state.timer === 0}
        inputStatus={inputStatus}
        variant="outlined"
        autoFocus
        InputProps={{
          autoComplete: 'off',
          spellCheck: false,
        }}
      />
    </Box>
  );
};

export default TypingInput;
