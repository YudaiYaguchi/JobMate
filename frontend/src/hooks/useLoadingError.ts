import { LoadingState } from '../types/LoadingState';

export const useLoadingError = (states: LoadingState[]) => {
  const isLoading = states.some(state => state.loading);
  const error = states.map(state => state.error).find(error => error) || '';

  return {
    isLoading,
    error,
    hasError: !!error
  };
}; 