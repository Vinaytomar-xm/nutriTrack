import React, { useState } from 'react';
import { useHistory } from '../hooks/useEntries';

function fmtDate(k) {
  const [y,m,d] = k.split('-');
  const ms = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const ds = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const dt = new Date(+y,+m-1,+d);
  const today = new Date().toISOString().slice(0,10);
  const pre = k===today ? 'Today — ' : '';
  return pre + ds[dt.getDay()] + ', ' + d + ' ' + ms[+m-1] + ' ' + y;
}

export default function History() {
  const { history, loading } = useHistory();
  const [open, setOpen]      = useState({});
  const [exporting, setExp]  = useState(false);

  const toggle = (date) => setOpen(p => ({ ...p, [date]: !p[date] }));

  const exportCSV = () => {
    setExp(true);
    const rows = ['Date,Time,Name,Amount,Calories (kcal),Protein (g)'];
    history.forEach(day =>
      day.entries.forEach(e =>
        rows.push(`${day._id},${e.loggedAt},"${e.name}","${e.displayAmount}",${Math.round(e.calories)},${e.protein.toFixed(1)}`)
      )
    );
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([rows.join('\n')], { type:'text/csv' }));
    a.download = `nutritrack_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    setExp(false);
  };

  return (
    <div>
      <div className="pghdr">
        <div><h2>History</h2><p>All your past logs — saved in MongoDB</p></div>
        <button className="btn btn-s btn-sm" onClick={exportCSV} disabled={exporting || !history.length}>
          {exporting ? '…' : '⬇ Export CSV'}
        </button>
      </div>

      {loading ? (
        <span className="spin-lg" />
      ) : history.length === 0 ? (
        <div className="empty" style={{ marginTop:'2rem' }}>
          <div className="ei">📅</div>
          <p>No history yet.<br />Log a few days and it will appear here.</p>
        </div>
      ) : (
        history.map(day => (
          <div key={day._id} className="hc">
            <div className="hh">
              <div>
                <div className="hdate">{fmtDate(day._id)}</div>
                <div className="hcnt">{day.count} item{day.count!==1?'s':''}</div>
              </div>
              <button className="exbtn" onClick={() => toggle(day._id)}>
                {open[day._id] ? 'Hide ▴' : 'Show ▾'}
              </button>
            </div>
            <div className="htot">
              <span className="hbg c">{Math.round(day.totalCalories)} kcal</span>
              <span className="hbg p">{day.totalProtein.toFixed(1)}g protein</span>
            </div>
            {open[day._id] && (
              <div className="hitems open">
                {day.entries.map(e => (
                  <div key={e._id} className="hrow">
                    <div>
                      <div className="hn">{e.name}</div>
                      <div className="hm">{e.displayAmount} · {e.loggedAt}</div>
                    </div>
                    <div className="hv">{Math.round(e.calories)} kcal · {e.protein.toFixed(1)}g P</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
