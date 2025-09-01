import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import codingMock from '@/mocks/codes.mocks';
import { 
  TypingState, 
  TypingAction, 
  TypingContextType, 
  Language
} from '@/types';

// Estados iniciais
const initialState: TypingState = {
  selectedLanguage: 'react',
  currentCodeIndex: Math.floor(Math.random() * codingMock.data.react.length),
  userInput: '',
  currentWordIndex: 0,
  timer: 60,
  isTimerRunning: false,
  showResults: false,
  correctWords: 0,
  incorrectWords: 0,
  totalTypedWords: 0,
  wordStatus: [],
  completedCodes: 0,
  correctCharacters: 0,
  incorrectCharacters: 0,
  totalTypedCharacters: 0,
  hasStartedTyping: false,
};

// Actions
export const TYPING_ACTIONS = {
  SET_LANGUAGE: 'SET_LANGUAGE',
  SET_USER_INPUT: 'SET_USER_INPUT',
  SET_CURRENT_WORD_INDEX: 'SET_CURRENT_WORD_INDEX',
  SET_TIMER: 'SET_TIMER',
  SET_TIMER_RUNNING: 'SET_TIMER_RUNNING',
  SET_SHOW_RESULTS: 'SET_SHOW_RESULTS',
  UPDATE_WORD_STATS: 'UPDATE_WORD_STATS',
  UPDATE_CHARACTER_STATS: 'UPDATE_CHARACTER_STATS',
  SET_WORD_STATUS: 'SET_WORD_STATUS',
  INCREMENT_COMPLETED_CODES: 'INCREMENT_COMPLETED_CODES',
  SET_HAS_STARTED_TYPING: 'SET_HAS_STARTED_TYPING',
  RESET_TEST: 'RESET_TEST',
  NEXT_CODE: 'NEXT_CODE',
} as const;

// Utility function
const getRandomCodeIndex = (language: Language): number => {
  const codes = codingMock.data[language];
  return Math.floor(Math.random() * codes.length);
};

// Reducer
const typingReducer = (state: TypingState, action: TypingAction): TypingState => {
  switch (action.type) {
    case TYPING_ACTIONS.SET_LANGUAGE:
      return {
        ...state,
        selectedLanguage: action.payload,
        currentCodeIndex: getRandomCodeIndex(action.payload),
      };

    case TYPING_ACTIONS.SET_USER_INPUT:
      return { ...state, userInput: action.payload };

    case TYPING_ACTIONS.SET_CURRENT_WORD_INDEX:
      return { ...state, currentWordIndex: action.payload };

    case TYPING_ACTIONS.SET_TIMER:
      return { ...state, timer: action.payload };

    case TYPING_ACTIONS.SET_TIMER_RUNNING:
      return { ...state, isTimerRunning: action.payload };

    case TYPING_ACTIONS.SET_SHOW_RESULTS:
      return { ...state, showResults: action.payload };

    case TYPING_ACTIONS.UPDATE_WORD_STATS:
      return {
        ...state,
        correctWords: state.correctWords + (action.payload.correct ? 1 : 0),
        incorrectWords: state.incorrectWords + (action.payload.correct ? 0 : 1),
        totalTypedWords: state.totalTypedWords + 1,
      };

    case TYPING_ACTIONS.UPDATE_CHARACTER_STATS:
      return {
        ...state,
        correctCharacters: state.correctCharacters + action.payload.correct,
        incorrectCharacters: state.incorrectCharacters + action.payload.incorrect,
        totalTypedCharacters: state.totalTypedCharacters + action.payload.total,
      };

    case TYPING_ACTIONS.SET_WORD_STATUS:
      return { ...state, wordStatus: action.payload };

    case TYPING_ACTIONS.INCREMENT_COMPLETED_CODES:
      return { ...state, completedCodes: state.completedCodes + 1 };

    case TYPING_ACTIONS.SET_HAS_STARTED_TYPING:
      return { ...state, hasStartedTyping: action.payload };

    case TYPING_ACTIONS.NEXT_CODE:
      return {
        ...state,
        currentCodeIndex: getRandomCodeIndex(state.selectedLanguage),
        currentWordIndex: 0,
        userInput: '',
        wordStatus: [],
      };

    case TYPING_ACTIONS.RESET_TEST:
      return {
        ...initialState,
        selectedLanguage: state.selectedLanguage,
        currentCodeIndex: getRandomCodeIndex(state.selectedLanguage),
      };

    default:
      return state;
  }
};

// Context
const TypingContext = createContext<TypingContextType | undefined>(undefined);

// Provider Props
interface TypingProviderProps {
  children: ReactNode;
}

// Provider
export const TypingProvider: React.FC<TypingProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(typingReducer, initialState);

  const value: TypingContextType = {
    state,
    dispatch,
    // Helper functions
    getCurrentCode: () => {
      return codingMock.data[state.selectedLanguage][state.currentCodeIndex]?.code || '';
    },
    getWords: () => {
      const code = codingMock.data[state.selectedLanguage][state.currentCodeIndex]?.code || '';
      return code.split(/\s+/).filter((word: string) => word.length > 0);
    },
    calculateWPM: () => {
      const timeElapsed = (60 - state.timer) / 60;
      return timeElapsed > 0 ? Math.round(state.correctWords / timeElapsed) : 0;
    },
    calculateAccuracy: () => {
      return state.totalTypedWords > 0 
        ? Math.round((state.correctWords / state.totalTypedWords) * 100) 
        : 0;
    },
    formatTime: (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    },
  };

  return (
    <TypingContext.Provider value={value}>
      {children}
    </TypingContext.Provider>
  );
};

// Hook personalizado
export const useTyping = (): TypingContextType => {
  const context = useContext(TypingContext);
  if (!context) {
    throw new Error('useTyping must be used within a TypingProvider');
  }
  return context;
};

export default TypingContext;
