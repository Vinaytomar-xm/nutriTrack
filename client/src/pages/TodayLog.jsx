import React, { useState, useEffect, useRef } from 'react';
import { useEntries } from '../hooks/useEntries';
import { useAuth }    from '../context/AuthContext';
import FOOD_DB        from '../utils/foodDb';

const todayKey = () => new Date().toISOString().slice(0, 10);

function fmtFull(k) {
  const [y,m,d] = k.split('-');
  const ms = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const ds = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const dt = new Date(+y,+m-1,+d);
  const pre = k === todayKey() ? 'Today — ' : (k === ymd(-1) ? 'Yesterday — ' : '');
  return pre + ds[dt.getDay()] + ', ' + d + ' ' + ms[+m-1] + ' ' + y;
}
function fmtShort(k) {
  const [,m,d] = k.split('-');
  const ms = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return d + ' ' + ms[+m-1] + (k === todayKey() ? ' (Today)' : '');
}
function ymd(offset = 0) {
  const d = new Date(); d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}

export default function TodayLog() {
  const { user }   = useAuth();
  const [date, setDate] = useState(todayKey());
  const { entries, loading, totals, addEntry, deleteEntry } = useEntries(date);

  const [search,   setSearch]   = useState('');
  const [selFood,  setSelFood]  = useState(null);
  const [amt,      setAmt]      = useState('');
  const [unit,     setUnit]     = useState('g');
  const [manOn,    setManOn]    = useState(false);
  const [mCal,     setMCal]     = useState('');
  const [mPro,     setMPro]     = useState('');
  const [acOpen,   setAcOpen]   = useState(false);
  const [acIdx,    setAcIdx]    = useState(-1);
  const [acRes,    setAcRes]    = useState([]);
  const [addErr,   setAddErr]   = useState('');
  const [addOk,    setAddOk]    = useState('');
  const [adding,   setAdding]   = useState(false);

  const swRef = useRef(null);
  const settings = user?.settings || { calGoal:2000, proGoal:100 };

  // Autocomplete filter
  useEffect(() => {
    if (!search.trim()) { setAcRes([]); setAcOpen(false); return; }
    const r = FOOD_DB.filter(f => f.name.toLowerCase().includes(search.toLowerCase())).slice(0, 12);
    setAcRes(r); setAcOpen(r.length > 0); setAcIdx(-1);
  }, [search]);

  // Close dropdown on outside click
  useEffect(() => {
    const h = e => { if (swRef.current && !swRef.current.contains(e.target)) setAcOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const pick = (food) => {
    setSelFood(food);
    setSearch(food.name);
    setUnit(food.isDrink ? 'ml' : 'g');
    setAcOpen(false);
  };

  const onKey = (e) => {
    if (!acOpen) return;
    if (e.key === 'ArrowDown') { setAcIdx(i => Math.min(i+1, acRes.length-1)); e.preventDefault(); }
    else if (e.key === 'ArrowUp')  { setAcIdx(i => Math.max(i-1, 0)); e.preventDefault(); }
    else if (e.key === 'Enter' && acIdx >= 0) { pick(acRes[acIdx]); e.preventDefault(); }
    else if (e.key === 'Escape') setAcOpen(false);
  };

  const changeDate = (dir) => {
    const d = new Date(date); d.setDate(d.getDate() + dir);
    const nk = d.toISOString().slice(0, 10);
    if (nk > todayKey()) return;
    setDate(nk);
  };

  const handleAdd = async () => {
    setAddErr(''); setAddOk('');
    if (!search.trim())                       { setAddErr('Search and select a food or drink.'); return; }
    const n = parseFloat(amt);
    if (isNaN(n) || n <= 0)                   { setAddErr('Enter a valid amount greater than 0.'); return; }
    if (!manOn && !selFood)                   { setAddErr('Select an item from the list, or use manual entry.'); return; }

    let calories, protein, displayAmount;
    if (manOn) {
      calories = parseFloat(mCal) || 0;
      protein  = parseFloat(mPro) || 0;
      displayAmount = `${n} ${unit}`;
    } else {
      const base = (unit === 'kg' || unit === 'L') ? n * 1000 : n;
      calories = (selFood.cal100 / 100) * base;
      protein  = (selFood.pro100 / 100) * base;
      displayAmount = unit === 'L' ? `${n} L` : unit === 'kg' ? `${n} kg` : `${n} ${unit}`;
    }

    setAdding(true);
    const res = await addEntry({
      name: search.trim(), displayAmount, calories, protein, date,
      isDrink: selFood?.isDrink || false,
      loggedAt: new Date().toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit', hour12:true }),
    });
    setAdding(false);

    if (res.success) {
      const savedName = search.trim();
      setSearch(''); setSelFood(null); setAmt(''); setMCal(''); setMPro(''); setUnit('g');
      setAddOk(`✓ "${savedName}" added!`);
      setTimeout(() => setAddOk(''), 2200);
    } else {
      setAddErr(res.message);
    }
  };

  const calPct = Math.min(100, (totals.cal / settings.calGoal) * 100);
  const proPct = Math.min(100, (totals.pro / settings.proGoal) * 100);

  return (
    <div>
      {/* Header + date nav */}
      <div className="pghdr">
        <div>
          <h2>{date === todayKey() ? "Today's Nutrition" : 'Nutrition — ' + fmtFull(date)}</h2>
          <p>{fmtFull(date)}</p>
        </div>
        <div className="dn">
          <button onClick={() => changeDate(-1)}>&#8592;</button>
          <span className="dlbl">{fmtShort(date)}</span>
          <button onClick={() => changeDate(1)} disabled={date >= todayKey()}>&#8594;</button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="sg">
        <div className="scard cg">
          <div className="sl">Calories</div>
          <div><span className="sv">{Math.round(totals.cal)}</span><span className="su">kcal</span></div>
          <div className="ss">Goal: {settings.calGoal} kcal</div>
        </div>
        <div className="scard ca">
          <div className="sl">Protein</div>
          <div><span className="sv">{totals.pro.toFixed(1)}</span><span className="su">g</span></div>
          <div className="ss">Goal: {settings.proGoal} g</div>
        </div>
        <div className="scard cb">
          <div className="sl">Meals</div>
          <div><span className="sv">{entries.length}</span></div>
          <div className="ss">Entries logged</div>
        </div>
        <div className="scard cp">
          <div className="sl">Avg / Meal</div>
          <div><span className="sv">{entries.length ? Math.round(totals.cal/entries.length) : 0}</span><span className="su">kcal</span></div>
          <div className="ss">Per entry</div>
        </div>
      </div>

      {/* Progress bars */}
      <div className="pw">
        <div className="pr"><span>Calories</span><span>{Math.round(totals.cal)} / {settings.calGoal} kcal</span></div>
        <div className="pb"><div className="pf g" style={{ width: calPct+'%' }} /></div>
        <div className="pr"><span>Protein</span><span>{totals.pro.toFixed(1)} / {settings.proGoal} g</span></div>
        <div className="pb"><div className="pf a" style={{ width: proPct+'%' }} /></div>
      </div>

      {/* Add food card */}
      <div className="card">
        <div className="ctit">+ Add Food or Drink</div>

        <div className="sw" ref={swRef}>
          <span className="si">🔍</span>
          <input type="search"
            placeholder="Search food or drink (e.g. rice, chicken, water, milk…)"
            value={search} autoComplete="off"
            onChange={e => { setSearch(e.target.value); setSelFood(null); }}
            onKeyDown={onKey}
          />
          {acOpen && (
            <div className="acl">
              {acRes.map((f,i) => (
                <div key={f.name} className={`aci${i===acIdx?' sel':''}`} onMouseDown={() => pick(f)}>
                  <span className="anm">
                    {f.name}
                    <span className={`atag ${f.isDrink?'d':'f'}`}>{f.isDrink?'Drink':'Food'}</span>
                  </span>
                  <span className="ainf">{f.cal100} kcal/100{f.isDrink?'ml':'g'}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="aform">
          <div className="fg">
            <label>{selFood?.isDrink ? 'Amount (ml or L)' : 'Amount (g or kg)'}</label>
            <div className="input-unit">
              <input type="number" placeholder="e.g. 200" min="0" step="any"
                value={amt} onChange={e => setAmt(e.target.value)}
                onKeyDown={e => e.key==='Enter' && handleAdd()} />
              <select value={unit} onChange={e => setUnit(e.target.value)}>
                {selFood?.isDrink
                  ? <><option value="ml">ml</option><option value="L">L</option></>
                  : <><option value="g">g</option><option value="kg">kg</option></>
                }
              </select>
            </div>
          </div>
          <div className="fg">
            <label>Selected Item</label>
            <input type="text" readOnly
              value={selFood ? selFood.name : ''}
              placeholder="Search above first"
              style={{ cursor:'not-allowed', opacity:.55 }} />
          </div>
          <div className="brow">
            <button className="btn btn-p btn-full" onClick={handleAdd} disabled={adding}>
              {adding ? <><span className="spin" /> Saving…</> : 'Add Entry'}
            </button>
          </div>
        </div>

        <button className="mtog" onClick={() => setManOn(v => !v)}>
          ✏ Item not found? Enter nutrition manually
        </button>

        {manOn && (
          <div className="mrow vis">
            <div className="fg">
              <label>Calories (kcal)</label>
              <input type="number" placeholder="0" min="0" value={mCal} onChange={e => setMCal(e.target.value)} />
            </div>
            <div className="fg">
              <label>Protein (g)</label>
              <input type="number" placeholder="0" min="0" value={mPro} onChange={e => setMPro(e.target.value)} />
            </div>
          </div>
        )}

        {addErr && <div className="alert aerr">{addErr}</div>}
        {addOk  && <div className="alert aok">{addOk}</div>}
      </div>

      {/* Log list */}
      <div className="card">
        <div className="ctit">
          {date===todayKey() ? "Today's Log" : fmtFull(date)+' Log'} ({entries.length} items)
        </div>
        {loading ? (
          <span className="spin-lg" />
        ) : entries.length === 0 ? (
          <div className="empty">
            <div className="ei">🍽</div>
            <p>Nothing logged yet.<br />Search for a food above to get started.</p>
          </div>
        ) : (
          entries.map(e => (
            <div key={e._id} className="fe">
              <div className="ftm">{e.loggedAt}</div>
              <div className="fdt" />
              <div className="fin">
                <div className="fnm">{e.name}</div>
                <div className="fqt">{e.displayAmount} · {e.loggedAt}</div>
              </div>
              <div className="fbg">
                <span className="badge bc">{Math.round(e.calories)} kcal</span>
                <span className="badge bp">{e.protein.toFixed(1)}g P</span>
              </div>
              <button className="btn-del" onClick={() => deleteEntry(e._id)} title="Delete">✕</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
