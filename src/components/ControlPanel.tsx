import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Button,
  useTheme,
  useMediaQuery,
  SelectChangeEvent
} from '@mui/material';
import { Timer, Refresh } from '@mui/icons-material';
import { useTyping } from '@/contexts/TypingContext';
import { TYPING_ACTIONS } from '@/contexts/TypingContext';
import { useTypingLogic } from '@/hooks';
import { Language } from '@/types';

export const ControlPanel: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { state, dispatch, formatTime } = useTyping();
  const { getNextCode } = useTypingLogic();

  const handleLanguageChange = (event: SelectChangeEvent<Language>) => {
    const newLanguage = event.target.value as Language;
    dispatch({ type: TYPING_ACTIONS.SET_LANGUAGE, payload: newLanguage });
    dispatch({ type: TYPING_ACTIONS.RESET_TEST });
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={3}
      flexDirection={isMobile ? 'column' : 'row'}
      gap={2}
    >
      {/* Seletor de Linguagem */}
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel id="language-select-label">Linguagem</InputLabel>
        <Select
          labelId="language-select-label"
          value={state.selectedLanguage}
          label="Linguagem"
          onChange={handleLanguageChange}
        >
          <MenuItem value="react">React</MenuItem>
          <MenuItem value="node">Node.js</MenuItem>
          <MenuItem value="java">Java</MenuItem>
          <MenuItem value="swift">Swift</MenuItem>
        </Select>
      </FormControl>

      {/* Timer */}
      <Chip
        icon={<Timer />}
        label={formatTime(state.timer)}
        color="primary"
        variant="filled"
        size="medium"
        sx={{
          fontSize: '1.1rem',
          fontWeight: 'bold',
          padding: theme.spacing(1),
          minWidth: 100,
        }}
      />

      {/* Botão Próximo Código */}
      <Button
        variant="contained"
        startIcon={<Refresh />}
        onClick={getNextCode}
        size="medium"
        sx={{ minWidth: 150 }}
      >
        Próximo Código
      </Button>
    </Box>
  );
};

export default ControlPanel;
