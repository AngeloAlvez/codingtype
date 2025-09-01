export interface CodeSample {
  id: string;
  code: string;
  language?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface CodeMockData {
  data: {
    react: CodeSample[];
    node: CodeSample[];
    java: CodeSample[];
    swift: CodeSample[];
  };
}

export type Language = 'react' | 'node' | 'java' | 'swift';

export interface TypingState {
  selectedLanguage: Language;
  currentCodeIndex: number;
  userInput: string;
  currentWordIndex: number;
  timer: number;
  isTimerRunning: boolean;
  showResults: boolean;
  correctWords: number;
  incorrectWords: number;
  totalTypedWords: number;
  wordStatus: ('correct' | 'incorrect')[];
  completedCodes: number;
  correctCharacters: number;
  incorrectCharacters: number;
  totalTypedCharacters: number;
  hasStartedTyping: boolean;
}

export interface TypingContextType {
  state: TypingState;
  dispatch: React.Dispatch<TypingAction>;
  getCurrentCode: () => string;
  getWords: () => string[];
  calculateWPM: () => number;
  calculateAccuracy: () => number;
  formatTime: (seconds: number) => string;
}

export interface WordStats {
  correct: boolean;
}

export interface CharacterStats {
  correct: number;
  incorrect: number;
  total: number;
}

export type TypingAction =
  | { type: 'SET_LANGUAGE'; payload: Language }
  | { type: 'SET_USER_INPUT'; payload: string }
  | { type: 'SET_CURRENT_WORD_INDEX'; payload: number }
  | { type: 'SET_TIMER'; payload: number }
  | { type: 'SET_TIMER_RUNNING'; payload: boolean }
  | { type: 'SET_SHOW_RESULTS'; payload: boolean }
  | { type: 'UPDATE_WORD_STATS'; payload: WordStats }
  | { type: 'UPDATE_CHARACTER_STATS'; payload: CharacterStats }
  | { type: 'SET_WORD_STATUS'; payload: ('correct' | 'incorrect')[] }
  | { type: 'INCREMENT_COMPLETED_CODES' }
  | { type: 'SET_HAS_STARTED_TYPING'; payload: boolean }
  | { type: 'RESET_TEST' }
  | { type: 'NEXT_CODE' };

export interface TimerHook {
  timer: number;
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

export interface TypingLogicHook {
  handleInputChange: (value: string) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  resetTest: () => void;
  getNextCode: () => void;
  getInputStatus: () => 'correct' | 'incorrect' | '';
  closeResults: () => void;
}

export type InputStatus = 'correct' | 'incorrect' | '';
export type WordStatus = 'correct' | 'incorrect' | 'current' | '';
