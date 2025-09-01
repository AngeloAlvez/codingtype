import { useEffect } from 'react';
import { useTyping } from '../contexts/TypingContext';
import { TYPING_ACTIONS } from '../contexts/TypingContext';
import { TimerHook } from '../types';

export const useTimer = (): TimerHook => {
  const { state, dispatch } = useTyping();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (state.isTimerRunning && state.timer > 0) {
      interval = setInterval(() => {
        dispatch({
          type: TYPING_ACTIONS.SET_TIMER,
          payload: state.timer - 1
        });

        if (state.timer <= 1) {
          dispatch({ type: TYPING_ACTIONS.SET_TIMER_RUNNING, payload: false });
          dispatch({ type: TYPING_ACTIONS.SET_SHOW_RESULTS, payload: true });
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [state.isTimerRunning, state.timer, dispatch]);

  return {
    timer: state.timer,
    isRunning: state.isTimerRunning,
    start: () => dispatch({ type: TYPING_ACTIONS.SET_TIMER_RUNNING, payload: true }),
    stop: () => dispatch({ type: TYPING_ACTIONS.SET_TIMER_RUNNING, payload: false }),
    reset: () => dispatch({ type: TYPING_ACTIONS.SET_TIMER, payload: 60 }),
  };
};
