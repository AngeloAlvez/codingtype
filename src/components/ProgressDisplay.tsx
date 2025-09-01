import React from 'react';
import { Box, LinearProgress, Typography, Paper } from '@mui/material';
import { useTyping } from '../contexts/TypingContext';

export const ProgressDisplay: React.FC = () => {
  const { state, getWords } = useTyping();
  const words = getWords();
  const progress = words.length > 0 ? (state.currentWordIndex / words.length) * 100 : 0;

  return (
    <Paper elevation={1} sx={{ p: 2, mb: 3, backgroundColor: 'grey.50' }}>
      <Box mb={1}>
        <Typography variant="body1" fontWeight="bold" color="primary.main" textAlign="center">
          Progresso: {state.currentWordIndex} / {words.length} palavras
        </Typography>
      </Box>
      
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: 'grey.300',
          '& .MuiLinearProgress-bar': {
            borderRadius: 4,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          },
        }}
      />
      
      <Box mt={1} textAlign="center">
        <Typography variant="body2" color="text.secondary">
          {Math.round(progress)}% completo
        </Typography>
      </Box>
    </Paper>
  );
};

export default ProgressDisplay;
