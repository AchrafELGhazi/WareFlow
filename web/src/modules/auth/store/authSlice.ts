import { User } from '@/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Auth state interface
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Try to parse user data from localStorage
const getUserFromStorage = (): User | null => {
  const userString = localStorage.getItem('user');
  if (!userString) return null;

  try {
    return JSON.parse(userString);
  } catch (error) {
    console.error('Failed to parse user data from localStorage:', error);
    return null;
  }
};

// Initial state
const initialState: AuthState = {
  user: getUserFromStorage(),
  token: localStorage.getItem('token'),
  isAuthenticated: !!(localStorage.getItem('token') && getUserFromStorage()),
  isLoading: false,
};

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Set user credentials after login/signup
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      // Store both token and user in localStorage
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },

    // Clear user credentials on logout
    clearCredentials: state => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      // Clear both from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },

    // Update loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Update user info only
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;

      // Update user in localStorage when it changes
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
  },
});

// Export actions and reducer
export const { setCredentials, clearCredentials, setLoading, setUser } =
  authSlice.actions;

export default authSlice.reducer;
