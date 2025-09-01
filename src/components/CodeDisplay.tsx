import React from 'react';
import { Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTyping } from '@/contexts/TypingContext';
import { WordStatus } from '@/types';

const CodePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  minHeight: 200,
  backgroundColor: theme.palette.grey[50],
  border: `2px solid ${theme.palette.grey[300]}`,
  fontFamily: '"JetBrains Mono", "Courier New", monospace',
  fontSize: '16px',
  lineHeight: 1.5,
  overflow: 'auto',
  
  [theme.breakpoints.down('md')]: {
    fontSize: '14px',
    padding: theme.spacing(2),
  },
}));

interface WordSpanProps {
  status: WordStatus;
}

const WordSpan = styled('span')<WordSpanProps>(({ theme, status }) => {
  let styles: React.CSSProperties = {
    padding: '2px 4px',
    borderRadius: '3px',
    fontFamily: 'inherit',
  };

  switch (status) {
    case 'correct':
      styles = {
        ...styles,
        backgroundColor: theme.palette.success.main,
        color: theme.palette.success.contrastText,
      };
      break;
    case 'incorrect':
      styles = {
        ...styles,
        backgroundColor: theme.palette.error.main,
        color: theme.palette.error.contrastText,
      };
      break;
    case 'current':
      styles = {
        ...styles,
        backgroundColor: theme.palette.warning.light,
        color: theme.palette.warning.contrastText,
      };
      break;
    default:
      styles = {
        ...styles,
        backgroundColor: 'transparent',
      };
  }

  return styles;
});

export const CodeDisplay: React.FC = () => {
  const { state, getWords } = useTyping();
  const words = getWords();

  const renderCode = () => {
    return words.map((word, index) => {
      let status: WordStatus = '';
      
      if (index < state.currentWordIndex) {
        status = (state.wordStatus[index] as WordStatus) || '';
      } else if (index === state.currentWordIndex) {
        status = 'current';
      }

      return (
        <WordSpan key={index} status={status}>
          {word}{' '}
        </WordSpan>
      );
    });
  };

  return (
    <CodePaper elevation={2}>
      <Box component="pre" sx={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {renderCode()}
      </Box>
    </CodePaper>
  );
};

export default CodeDisplay;
