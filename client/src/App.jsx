import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Login    from './pages/Login';
import Register from './pages/Register';
import TodayLog from './pages/TodayLog';
import History  from './pages/History';
import Settings from './pages/Settings';

export default function App() {
  const { user, token, logout } = useAuth();
  const [authView, setAuthView] = useState('login');
  const [tab, setTab]           = useState('today');

  // Not authenticated — show login or register
  if (!token || !user) {
    return authView === 'login'
      ? <Login    onSwitch={() => setAuthView('register')} />
      : <Register onSwitch={() => setAuthView('login')} />;
  }

  const tabs = [
    { id:'today',    label:"Today's Log", icon:'📊' },
    { id:'history',  label:'History',     icon:'📅' },
    { id:'settings', label:'Settings',    icon:'⚙️'  },
  ];

  const Page = tab === 'today' ? TodayLog : tab === 'history' ? History : Settings;

  return (
    <div className="app-layout">

      {/* ── Sidebar (desktop) / Bottom nav (mobile) ── */}
      <aside className="sidebar">
        {/* Logo — hidden on mobile via CSS */}
        <div className="sb-logo">
          <div className="icon">🥗</div>
          <span>NutriTrack</span>
        </div>

        <div className="nav-lbl">Menu</div>

        {tabs.map(t => (
          <button
            key={t.id}
            className={`nav-item${tab === t.id ? ' active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            <span className="ni">{t.icon}</span>
            {t.label}
          </button>
        ))}

        {/* User chip + sign out — hidden on mobile */}
        <div className="sb-foot">
          <div className="uchip">
            <div className="uav">{user.username[0].toUpperCase()}</div>
            <div>
              <div className="unm">{user.username}</div>
              <div className="usub">Member</div>
            </div>
          </div>
          <button className="btn btn-g btn-full" style={{ marginTop:'7px' }} onClick={logout}>
            ← Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="mc">
        <Page />
      </main>
    </div>
  );
}
