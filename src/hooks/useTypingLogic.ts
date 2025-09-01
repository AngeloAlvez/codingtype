import { useTyping } from '../contexts/TypingContext';
import { TYPING_ACTIONS } from '../contexts/TypingContext';
import { TypingLogicHook, InputStatus } from '../types';

export const useTypingLogic = (): TypingLogicHook => {
  const { state, dispatch, getWords } = useTyping();

  const handleInputChange = (value: string): void => {
    // Marcar que a digitação começou na primeira tecla
    if (!state.hasStartedTyping && value.length > 0) {
      dispatch({ type: TYPING_ACTIONS.SET_HAS_STARTED_TYPING, payload: true });
    }
    
    // Iniciar timer na primeira digitação
    if (!state.isTimerRunning && value.length > 0 && state.timer === 60) {
      dispatch({ type: TYPING_ACTIONS.SET_TIMER_RUNNING, payload: true });
    }

    // Não permitir espaços múltiplos ou espaços no início
    if (value.includes('  ') || value.startsWith(' ')) {
      return;
    }

    dispatch({ type: TYPING_ACTIONS.SET_USER_INPUT, payload: value });

    // Verificar se terminou com espaço
    if (value.endsWith(' ')) {
      checkCurrentWord();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      checkCurrentWord();
    }
  };

  const checkCurrentWord = (): void => {
    const words = getWords();
    const currentWord = words[state.currentWordIndex];
    const trimmedInput = state.userInput.trim();

    if (currentWord && trimmedInput) {
      const isCorrect = currentWord === trimmedInput;
      
      // Atualizar status da palavra
      const newWordStatus = [...state.wordStatus];
      newWordStatus[state.currentWordIndex] = isCorrect ? 'correct' : 'incorrect';
      dispatch({ type: TYPING_ACTIONS.SET_WORD_STATUS, payload: newWordStatus });

      // Atualizar estatísticas de palavras
      dispatch({
        type: TYPING_ACTIONS.UPDATE_WORD_STATS,
        payload: { correct: isCorrect }
      });

      // Atualizar estatísticas de caracteres
      const correctChars = Math.min(trimmedInput.length, currentWord.length);
      const totalChars = trimmedInput.length;

      dispatch({
        type: TYPING_ACTIONS.UPDATE_CHARACTER_STATS,
        payload: {
          correct: isCorrect ? correctChars : 0,
          incorrect: isCorrect ? 0 : totalChars,
          total: totalChars
        }
      });

      // Avançar para próxima palavra
      dispatch({ 
        type: TYPING_ACTIONS.SET_CURRENT_WORD_INDEX, 
        payload: state.currentWordIndex + 1 
      });
      dispatch({ type: TYPING_ACTIONS.SET_USER_INPUT, payload: '' });
      
      // Verificar se completou o código
      if (state.currentWordIndex + 1 >= words.length) {
        dispatch({ type: TYPING_ACTIONS.INCREMENT_COMPLETED_CODES });
        
        // Se ainda há tempo, ir para o próximo código
        if (state.timer > 0 && state.isTimerRunning) {
          dispatch({ type: TYPING_ACTIONS.NEXT_CODE });
        } else {
          dispatch({ type: TYPING_ACTIONS.SET_TIMER_RUNNING, payload: false });
          dispatch({ type: TYPING_ACTIONS.SET_SHOW_RESULTS, payload: true });
        }
      }
    }
  };

  const resetTest = (): void => {
    dispatch({ type: TYPING_ACTIONS.RESET_TEST });
  };

  const getNextCode = (): void => {
    if (!state.isTimerRunning) {
      resetTest();
    } else {
      dispatch({ type: TYPING_ACTIONS.NEXT_CODE });
    }
  };

  const getInputStatus = (): InputStatus => {
    if (!state.userInput || state.timer === 0) return '';
    
    const words = getWords();
    const currentWord = words[state.currentWordIndex];
    const trimmedInput = state.userInput.trim();
    
    if (currentWord && currentWord.startsWith(trimmedInput)) {
      return 'correct';
    }
    return 'incorrect';
  };

  const closeResults = (): void => {
    dispatch({ type: TYPING_ACTIONS.SET_SHOW_RESULTS, payload: false });
    resetTest();
  };

  return {
    handleInputChange,
    handleKeyDown,
    resetTest,
    getNextCode,
    getInputStatus,
    closeResults,
  };
};
