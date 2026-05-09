import React, { useState } from 'react';
import { useAuth }  from '../context/AuthContext';
import { useStats } from '../hooks/useEntries';

export default function Settings() {
  const { user, updateSettings, logout } = useAuth();
  const { stats } = useStats();
  const [calGoal, setCalGoal] = useState(user?.settings?.calGoal || 2000);
  const [proGoal, setProGoal] = useState(user?.settings?.proGoal || 100);
  const [saved,   setSaved]   = useState('');
  const [err,     setErr]     = useState('');

  const save = async () => {
    setErr(''); setSaved('');
    if (calGoal < 500 || calGoal > 6000) { setErr('Calorie goal must be 500–6000'); return; }
    if (proGoal < 10  || proGoal > 500)  { setErr('Protein goal must be 10–500 g'); return; }
    const res = await updateSettings(Number(calGoal), Number(proGoal));
    if (res.success) { setSaved('Goals saved!'); setTimeout(() => setSaved(''), 2000); }
    else setErr(res.message);
  };

  // Build last 7 days for bar chart
  const last7 = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0,10);
    const lbl = i===0 ? 'Today' : ['Su','Mo','Tu','We','Th','Fr','Sa'][d.getDay()];
    const stat = stats.find(s => s._id === key);
    last7.push({ key, lbl, cal: stat?.calories || 0 });
  }
  const maxCal = Math.max(...last7.map(d=>d.cal), calGoal, 1);

  return (
    <div>
      <div className="pghdr"><div><h2>Settings</h2><p>Goals, account info, weekly overview</p></div></div>

      {/* Weekly bar chart */}
      <div className="card">
        <div className="ctit">Last 7 Days — Calories</div>
        <div className="chart-wrap">
          {last7.map(d => (
            <div key={d.key} className="bar-col" title={`${d.lbl}: ${Math.round(d.cal)} kcal`}>
              <div className="bar-bg">
                <div className="bar-fill" style={{ height: `${(d.cal/maxCal)*100}%` }} />
              </div>
              <span className="bar-lbl">{d.lbl}</span>
            </div>
          ))}
        </div>
        <p style={{ marginTop:'.5rem', fontSize:'.74rem', color:'var(--txt3)' }}>
          Daily goal: {calGoal} kcal
        </p>
      </div>

      {/* Goals */}
      <div className="stg">
        <div className="stl">Daily Goals</div>
        <div className="sti">
          <div><div className="ti">Calorie Goal</div><div className="de">Calories per day (kcal)</div></div>
          <input type="number" value={calGoal} min="500" max="6000"
            onChange={e => setCalGoal(+e.target.value)} />
        </div>
        <div className="sti">
          <div><div className="ti">Protein Goal</div><div className="de">Protein per day (grams)</div></div>
          <input type="number" value={proGoal} min="10" max="500"
            onChange={e => setProGoal(+e.target.value)} />
        </div>
        {err   && <div className="alert aerr">{err}</div>}
        {saved && <div className="alert aok">{saved}</div>}
        <button className="btn btn-p" style={{ marginTop:'.75rem' }} onClick={save}>Save Goals</button>
      </div>

      {/* Account */}
      <div className="stg">
        <div className="stl">Account</div>
        <div className="sti">
          <div><div className="ti">Username</div><div className="de">{user?.username}</div></div>
        </div>
        <div className="sti">
          <div><div className="ti">Email</div><div className="de">{user?.email}</div></div>
        </div>
        <div className="sti">
          <div>
            <div className="ti">Member Since</div>
            <div className="de">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})
                : '–'}
            </div>
          </div>
        </div>
        <div className="sti">
          <div><div className="ti">Sign Out</div><div className="de">Log out of this device</div></div>
          <button className="btn btn-s btn-sm" onClick={logout}>Sign Out</button>
        </div>
      </div>
    </div>
  );
}
