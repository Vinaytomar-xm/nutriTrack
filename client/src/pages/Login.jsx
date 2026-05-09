import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login({ onSwitch }) {
  const { login, loading, error, clearError } = useAuth();
  const [form, setForm] = useState({ login: '', password: '' });

  useEffect(() => () => clearError(), [clearError]);

  const submit = (e) => {
    e.preventDefault();
    if (!form.login.trim() || !form.password) return;
    login(form.login.trim(), form.password);
  };

  return (
    <div className="auth-wrap">
      <div className="auth-box">
        <div className="auth-logo">
          <div className="licon">🥗</div>
          <h1>NutriTrack</h1>
          <p>Track your daily calories &amp; protein</p>
        </div>
        <div className="auth-card">
          <h2>Sign In</h2>
          <form onSubmit={submit}>
            <div className="fg">
              <label>Username or Email</label>
              <input type="text" placeholder="your username or email"
                value={form.login} autoFocus autoComplete="username"
                onChange={e => setForm({ ...form, login: e.target.value })} />
            </div>
            <div className="fg">
              <label>Password</label>
              <input type="password" placeholder="password"
                value={form.password} autoComplete="current-password"
                onChange={e => setForm({ ...form, password: e.target.value })} />
            </div>
            {error && <div className="alert aerr">{error}</div>}
            <button className="btn btn-p btn-full" type="submit" disabled={loading}
              style={{ marginTop: '1rem' }}>
              {loading ? <><span className="spin" /> Signing in…</> : 'Sign In →'}
            </button>
          </form>
          <p style={{ textAlign:'center', fontSize:'.84rem', color:'var(--txt3)', marginTop:'1rem' }}>
            No account?{' '}
            <a href="#reg" onClick={e => { e.preventDefault(); onSwitch(); }}
               style={{ color:'var(--grn)', textDecoration:'none', fontWeight:600 }}>
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
