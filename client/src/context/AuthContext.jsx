import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import api from '../utils/api';

const Ctx = createContext(null);

const init = {
  user:    JSON.parse(localStorage.getItem('nt_user') || 'null'),
  token:   localStorage.getItem('nt_token') || null,
  loading: false,
  error:   null,
};

function reducer(s, a) {
  switch (a.type) {
    case 'LOADING':
      return { ...s, loading: true, error: null };
    case 'SUCCESS':
      localStorage.setItem('nt_token', a.p.token);
      localStorage.setItem('nt_user',  JSON.stringify(a.p.user));
      return { ...s, loading: false, error: null, token: a.p.token, user: a.p.user };
    case 'ERROR':
      return { ...s, loading: false, error: a.p };
    case 'LOGOUT':
      localStorage.removeItem('nt_token');
      localStorage.removeItem('nt_user');
      return { ...s, user: null, token: null, loading: false, error: null };
    case 'UPD_SETTINGS': {
      const u = { ...s.user, settings: a.p };
      localStorage.setItem('nt_user', JSON.stringify(u));
      return { ...s, user: u };
    }
    case 'CLEAR_ERR':
      return { ...s, error: null };
    default: return s;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, init);

  // Verify stored token on first load
  useEffect(() => {
    if (!state.token) return;
    api.get('/auth/me')
      .then(({ data }) => dispatch({ type: 'SUCCESS', p: { token: state.token, user: data.user } }))
      .catch(() => dispatch({ type: 'LOGOUT' }));
    // eslint-disable-next-line
  }, []);

  const login = useCallback(async (login, password) => {
    dispatch({ type: 'LOADING' });
    try {
      const { data } = await api.post('/auth/login', { login, password });
      dispatch({ type: 'SUCCESS', p: data });
    } catch (err) {
      dispatch({ type: 'ERROR', p: err.response?.data?.message || 'Login failed' });
    }
  }, []);

  const register = useCallback(async (username, email, password) => {
    dispatch({ type: 'LOADING' });
    try {
      const { data } = await api.post('/auth/register', { username, email, password });
      dispatch({ type: 'SUCCESS', p: data });
    } catch (err) {
      dispatch({ type: 'ERROR', p: err.response?.data?.message || 'Registration failed' });
    }
  }, []);

  const logout = useCallback(() => dispatch({ type: 'LOGOUT' }), []);

  const updateSettings = useCallback(async (calGoal, proGoal) => {
    try {
      const { data } = await api.put('/auth/settings', { calGoal, proGoal });
      dispatch({ type: 'UPD_SETTINGS', p: data.settings });
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Failed to save' };
    }
  }, []);

  const clearError = useCallback(() => dispatch({ type: 'CLEAR_ERR' }), []);

  return (
    <Ctx.Provider value={{ ...state, login, register, logout, updateSettings, clearError }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
