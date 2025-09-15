import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { 
  fetchCurrentUser, 
  logout as logoutAction,
  selectCurrentUser, 
  selectIsAuthenticated, 
  selectAuthLoading, 
  selectAuthError,
  selectAuthInitialized,
  clearError 
} from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const initialized = useSelector(selectAuthInitialized);

  // Auto-fetch user on mount if not initialized
  useEffect(() => {
    if (!initialized && !loading) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, initialized, loading]);

  const refetchUser = () => {
    dispatch(fetchCurrentUser());
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    initialized,
    refetchUser,
    logout,
    clearAuthError
  };
};