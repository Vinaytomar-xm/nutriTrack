import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Register({ onSwitch }) {
  const { register, loading, error, clearError } = useAuth();
  const [form, setForm] = useState({ username:'', email:'', password:'', confirm:'' });
  const [localErr, setLocalErr] = useState('');

  useEffect(() => () => clearError(), [clearError]);

  const submit = (e) => {
    e.preventDefault();
    setLocalErr('');
    if (form.password !== form.confirm) { setLocalErr('Passwords do not match'); return; }
    if (form.password.length < 6)       { setLocalErr('Password must be at least 6 characters'); return; }
    register(form.username.trim(), form.email.trim(), form.password);
  };

  const displayErr = localErr || error;

  return (
    <div className="auth-wrap">
      <div className="auth-box">
        <div className="auth-logo">
          <div className="licon">🥗</div>
          <h1>NutriTrack</h1>
          <p>Create your free account</p>
        </div>
        <div className="auth-card">
          <h2>Create Account</h2>
          <form onSubmit={submit}>
            <div className="fg">
              <label>Username</label>
              <input type="text" placeholder="letters, numbers, underscores"
                value={form.username} autoFocus autoComplete="username"
                onChange={e => setForm({ ...form, username: e.target.value })} />
            </div>
            <div className="fg">
              <label>Email</label>
              <input type="email" placeholder="you@example.com"
                value={form.email} autoComplete="email"
                onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="fg">
              <label>Password</label>
              <input type="password" placeholder="at least 6 characters"
                value={form.password} autoComplete="new-password"
                onChange={e => setForm({ ...form, password: e.target.value })} />
            </div>
            <div className="fg">
              <label>Confirm Password</label>
              <input type="password" placeholder="repeat password"
                value={form.confirm} autoComplete="new-password"
                onChange={e => setForm({ ...form, confirm: e.target.value })} />
            </div>
            {displayErr && <div className="alert aerr">{displayErr}</div>}
            <button className="btn btn-p btn-full" type="submit" disabled={loading}
              style={{ marginTop:'1rem' }}>
              {loading ? <><span className="spin" /> Creating account…</> : 'Create Account →'}
            </button>
          </form>
          <p style={{ textAlign:'center', fontSize:'.84rem', color:'var(--txt3)', marginTop:'1rem' }}>
            Already have an account?{' '}
            <a href="#login" onClick={e => { e.preventDefault(); onSwitch(); }}
               style={{ color:'var(--grn)', textDecoration:'none', fontWeight:600 }}>
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
