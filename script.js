
const DB = [
    // DRINKS
    { name: "Water", isDrink: true, cal100: 0, pro100: 0 },
    { name: "Milk – Full Cream", isDrink: true, cal100: 61, pro100: 3.2 },
    { name: "Milk – Toned / Low Fat", isDrink: true, cal100: 42, pro100: 3.0 },
    { name: "Milk – Skimmed", isDrink: true, cal100: 35, pro100: 3.4 },
    { name: "Lassi (Plain)", isDrink: true, cal100: 62, pro100: 3.0 },
    { name: "Buttermilk", isDrink: true, cal100: 24, pro100: 1.0 },
    { name: "Milk Tea / Chai", isDrink: true, cal100: 55, pro100: 2.5 },
    { name: "Black Tea", isDrink: true, cal100: 2, pro100: 0 },
    { name: "Coffee with Milk", isDrink: true, cal100: 40, pro100: 2.0 },
    { name: "Black Coffee", isDrink: true, cal100: 5, pro100: 0.3 },
    { name: "Green Tea", isDrink: true, cal100: 2, pro100: 0 },
    { name: "Orange Juice", isDrink: true, cal100: 45, pro100: 0.7 },
    { name: "Apple Juice", isDrink: true, cal100: 46, pro100: 0.1 },
    { name: "Mango Juice", isDrink: true, cal100: 65, pro100: 0.4 },
    { name: "Cold Drink / Soda", isDrink: true, cal100: 42, pro100: 0 },
    { name: "Coconut Water", isDrink: true, cal100: 19, pro100: 0.7 },
    { name: "Protein Shake", isDrink: true, cal100: 50, pro100: 8.3 },
    { name: "Sports Drink", isDrink: true, cal100: 26, pro100: 0 },
    { name: "Energy Drink", isDrink: true, cal100: 45, pro100: 0 },
    { name: "Lemon Water", isDrink: true, cal100: 4, pro100: 0.1 },
    // GRAINS
    { name: "Roti / Chapati", isDrink: false, cal100: 297, pro100: 8.5 },
    { name: "Paratha (Plain)", isDrink: false, cal100: 326, pro100: 7.2 },
    { name: "Puri / Poori", isDrink: false, cal100: 450, pro100: 7.0 },
    { name: "Naan", isDrink: false, cal100: 310, pro100: 9.5 },
    { name: "White Rice (cooked)", isDrink: false, cal100: 130, pro100: 2.7 },
    { name: "Brown Rice (cooked)", isDrink: false, cal100: 111, pro100: 2.6 },
    { name: "Basmati Rice (cooked)", isDrink: false, cal100: 130, pro100: 2.7 },
    { name: "White Bread", isDrink: false, cal100: 265, pro100: 8.9 },
    { name: "Brown Bread", isDrink: false, cal100: 243, pro100: 10.7 },
    { name: "Idli", isDrink: false, cal100: 58, pro100: 2.0 },
    { name: "Dosa (plain)", isDrink: false, cal100: 168, pro100: 3.4 },
    { name: "Upma", isDrink: false, cal100: 109, pro100: 2.5 },
    { name: "Poha", isDrink: false, cal100: 130, pro100: 2.5 },
    { name: "Oats (cooked)", isDrink: false, cal100: 71, pro100: 2.5 },
    { name: "Oats (dry)", isDrink: false, cal100: 389, pro100: 16.9 },
    { name: "Cornflakes", isDrink: false, cal100: 357, pro100: 7.0 },
    { name: "Maggi Noodles", isDrink: false, cal100: 432, pro100: 12.0 },
    { name: "Pasta (cooked)", isDrink: false, cal100: 158, pro100: 5.8 },
    // DAL & LEGUMES
    { name: "Dal Tadka (cooked)", isDrink: false, cal100: 105, pro100: 6.8 },
    { name: "Rajma (cooked)", isDrink: false, cal100: 140, pro100: 8.7 },
    { name: "Chickpeas / Chole", isDrink: false, cal100: 164, pro100: 8.9 },
    { name: "Moong Dal (cooked)", isDrink: false, cal100: 105, pro100: 7.0 },
    { name: "Masoor Dal (cooked)", isDrink: false, cal100: 116, pro100: 9.0 },
    { name: "Urad Dal (cooked)", isDrink: false, cal100: 105, pro100: 7.7 },
    { name: "Sambar", isDrink: false, cal100: 56, pro100: 3.1 },
    { name: "Sprouted Moong", isDrink: false, cal100: 30, pro100: 3.0 },
    { name: "Peanuts (raw)", isDrink: false, cal100: 567, pro100: 25.8 },
    { name: "Roasted Chana", isDrink: false, cal100: 364, pro100: 18.0 },
    // VEGETABLES
    { name: "Potato Curry (Aloo)", isDrink: false, cal100: 110, pro100: 2.5 },
    { name: "Palak Paneer", isDrink: false, cal100: 160, pro100: 7.0 },
    { name: "Baingan Bharta", isDrink: false, cal100: 91, pro100: 2.5 },
    { name: "Okra / Bhindi", isDrink: false, cal100: 60, pro100: 2.0 },
    { name: "Cauliflower Sabzi", isDrink: false, cal100: 80, pro100: 2.0 },
    { name: "Matar Paneer", isDrink: false, cal100: 185, pro100: 8.0 },
    { name: "Mixed Veg Curry", isDrink: false, cal100: 95, pro100: 3.0 },
    { name: "Bottle Gourd / Lauki", isDrink: false, cal100: 17, pro100: 0.6 },
    { name: "Tomato (raw)", isDrink: false, cal100: 18, pro100: 0.9 },
    { name: "Onion (raw)", isDrink: false, cal100: 40, pro100: 1.1 },
    { name: "Cucumber", isDrink: false, cal100: 15, pro100: 0.6 },
    { name: "Mixed Salad", isDrink: false, cal100: 25, pro100: 1.5 },
    { name: "Spinach (raw)", isDrink: false, cal100: 23, pro100: 2.9 },
    // NON-VEG
    { name: "Chicken Breast (boiled)", isDrink: false, cal100: 165, pro100: 31.0 },
    { name: "Chicken Breast (grilled)", isDrink: false, cal100: 195, pro100: 29.0 },
    { name: "Chicken Curry", isDrink: false, cal100: 215, pro100: 18.0 },
    { name: "Chicken Biryani", isDrink: false, cal100: 180, pro100: 12.0 },
    { name: "Boiled Egg", isDrink: false, cal100: 155, pro100: 13.0 },
    { name: "Egg White", isDrink: false, cal100: 52, pro100: 11.0 },
    { name: "Omelette (2 eggs)", isDrink: false, cal100: 175, pro100: 14.0 },
    { name: "Egg Curry", isDrink: false, cal100: 195, pro100: 12.0 },
    { name: "Fish Curry", isDrink: false, cal100: 170, pro100: 20.0 },
    { name: "Mutton Curry", isDrink: false, cal100: 280, pro100: 20.0 },
    { name: "Tuna (canned)", isDrink: false, cal100: 132, pro100: 28.0 },
    // DAIRY
    { name: "Paneer", isDrink: false, cal100: 265, pro100: 18.0 },
    { name: "Curd / Dahi", isDrink: false, cal100: 98, pro100: 3.5 },
    { name: "Greek Yogurt", isDrink: false, cal100: 59, pro100: 10.0 },
    { name: "Butter", isDrink: false, cal100: 717, pro100: 0.8 },
    { name: "Ghee", isDrink: false, cal100: 900, pro100: 0 },
    { name: "Cheese Slice", isDrink: false, cal100: 402, pro100: 22.0 },
    { name: "Whey Protein (powder)", isDrink: false, cal100: 372, pro100: 75.0 },
    // SNACKS
    { name: "Samosa", isDrink: false, cal100: 308, pro100: 5.0 },
    { name: "Pakora / Bhajiya", isDrink: false, cal100: 285, pro100: 6.5 },
    { name: "Vada Pav", isDrink: false, cal100: 235, pro100: 5.0 },
    { name: "Pav Bhaji", isDrink: false, cal100: 170, pro100: 4.5 },
    { name: "Chole Bhature", isDrink: false, cal100: 250, pro100: 7.5 },
    { name: "Pizza Slice", isDrink: false, cal100: 250, pro100: 11.0 },
    { name: "Burger", isDrink: false, cal100: 295, pro100: 14.0 },
    { name: "Chips / Crisps", isDrink: false, cal100: 536, pro100: 6.5 },
    { name: "Popcorn (plain)", isDrink: false, cal100: 375, pro100: 11.0 },
    { name: "Dhokla", isDrink: false, cal100: 160, pro100: 5.0 },
    // FRUITS
    { name: "Banana", isDrink: false, cal100: 89, pro100: 1.1 },
    { name: "Apple", isDrink: false, cal100: 52, pro100: 0.3 },
    { name: "Mango", isDrink: false, cal100: 60, pro100: 0.8 },
    { name: "Orange", isDrink: false, cal100: 47, pro100: 0.9 },
    { name: "Grapes", isDrink: false, cal100: 69, pro100: 0.7 },
    { name: "Watermelon", isDrink: false, cal100: 30, pro100: 0.6 },
    { name: "Papaya", isDrink: false, cal100: 43, pro100: 0.5 },
    { name: "Guava", isDrink: false, cal100: 68, pro100: 2.6 },
    { name: "Strawberry", isDrink: false, cal100: 32, pro100: 0.7 },
    { name: "Dates (dried)", isDrink: false, cal100: 277, pro100: 1.8 },
    // SWEETS
    { name: "Gulab Jamun", isDrink: false, cal100: 376, pro100: 6.0 },
    { name: "Kheer", isDrink: false, cal100: 195, pro100: 4.5 },
    { name: "Atta Halwa", isDrink: false, cal100: 380, pro100: 5.0 },
    { name: "Ice Cream (Vanilla)", isDrink: false, cal100: 207, pro100: 3.5 },
    { name: "Dark Chocolate", isDrink: false, cal100: 546, pro100: 5.0 },
    { name: "Plain Cake", isDrink: false, cal100: 347, pro100: 5.0 },
    { name: "Rasgulla", isDrink: false, cal100: 186, pro100: 5.0 },
    { name: "Sugarcane Juice", isDrink: true, cal100: 100, pro100: 0.5 },
];

/* STATE */
let CU = null, VD = todayKey(), SEL = null, acRes = [], acIdx = -1, manOn = false;

/* UTILS */
function todayKey() { return new Date().toISOString().slice(0, 10); }
function ymd(n = 0) { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); }
function fmtFull(k) {
    const [y, m, d] = k.split('-');
    const ms = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const ds = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dt = new Date(+y, +m - 1, +d);
    const pre = k === todayKey() ? 'Today — ' : (k === ymd(-1) ? 'Yesterday — ' : '');
    return pre + ds[dt.getDay()] + ', ' + d + ' ' + ms[+m - 1] + ' ' + y;
}
function fmtShort(k) {
    const [y, m, d] = k.split('-');
    const ms = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return d + ' ' + ms[+m - 1] + (k === todayKey() ? ' (Today)' : '');
}
function fmtTime() { return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }); }
function sk(dk) { return `nt3_${CU}_${dk}`; }
function getE(dk) { try { return JSON.parse(localStorage.getItem(sk(dk))) || []; } catch { return []; } }
function saveE(dk, a) { localStorage.setItem(sk(dk), JSON.stringify(a)); }
function getS() { try { return JSON.parse(localStorage.getItem(`nt3s_${CU}`)) || { calGoal: 2000, proGoal: 100 }; } catch { return { calGoal: 2000, proGoal: 100 }; } }
function totals(a) { return a.reduce((t, e) => ({ cal: t.cal + e.cal, pro: t.pro + e.pro }), { cal: 0, pro: 0 }); }
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function setErr(id, msg) { const el = document.getElementById(id); if (el) el.innerHTML = msg ? `<div class="alert aerr">${msg}</div>` : ''; }
function setOk(id, msg) { const el = document.getElementById(id); if (!el) return; el.innerHTML = `<div class="alert aok">${msg}</div>`; setTimeout(() => { el.innerHTML = ''; }, 2200); }

/* AUTH */
function showPage(n) { document.querySelectorAll('.page').forEach(p => p.classList.remove('active')); document.getElementById('page-' + n).classList.add('active'); }

function doLogin() {
    const u = document.getElementById('li-u').value.trim();
    const p = document.getElementById('li-p').value;
    setErr('li-e', '');
    if (!u || !p) { setErr('li-e', 'Please enter username and password.'); return; }
    const users = JSON.parse(localStorage.getItem('nt3_u') || '{}');
    if (!users[u]) { setErr('li-e', 'User not found. Please register first.'); return; }
    if (users[u] !== btoa(p)) { setErr('li-e', 'Incorrect password.'); return; }
    CU = u; localStorage.setItem('nt3_sess', u); initApp(); showPage('app');
}

function doRegister() {
    const u = document.getElementById('rg-u').value.trim();
    const p = document.getElementById('rg-p').value;
    const p2 = document.getElementById('rg-p2').value;
    setErr('rg-e', '');
    if (u.length < 3) { setErr('rg-e', 'Username must be at least 3 characters.'); return; }
    if (p.length < 4) { setErr('rg-e', 'Password must be at least 4 characters.'); return; }
    if (p !== p2) { setErr('rg-e', 'Passwords do not match.'); return; }
    const users = JSON.parse(localStorage.getItem('nt3_u') || '{}');
    if (users[u]) { setErr('rg-e', 'Username already taken.'); return; }
    users[u] = btoa(p); localStorage.setItem('nt3_u', JSON.stringify(users));
    CU = u; localStorage.setItem('nt3_sess', u); initApp(); showPage('app');
}

function doLogout() {
    CU = null; localStorage.removeItem('nt3_sess');
    document.getElementById('li-u').value = '';
    document.getElementById('li-p').value = '';
    showPage('login');
}

/* INIT */
function initApp() {
    VD = todayKey();
    document.getElementById('uav').textContent = CU[0].toUpperCase();
    document.getElementById('unm').textContent = CU;
    document.getElementById('set-un').textContent = CU;
    const s = getS();
    document.getElementById('set-cal').value = s.calGoal;
    document.getElementById('set-pro').value = s.proGoal;
    switchTab('today');
}

/* TABS */
function switchTab(t) {
    ['today', 'history', 'settings'].forEach(x => {
        document.getElementById('tab-' + x).style.display = x === t ? 'block' : 'none';
        document.getElementById('nav-' + x).classList.toggle('active', x === t);
    });
    if (t === 'history') renderHistory();
    if (t === 'today') refreshToday();
}

/* DATE NAV */
function changeDate(dir) {
    const d = new Date(VD); d.setDate(d.getDate() + dir);
    const nk = d.toISOString().slice(0, 10);
    if (nk > todayKey()) return;
    VD = nk; refreshToday();
}

/* REFRESH TODAY */
function refreshToday() {
    const entries = getE(VD), s = getS(), t = totals(entries);
    document.getElementById('dlbl').textContent = fmtShort(VD);
    document.getElementById('th').textContent = VD === todayKey() ? "Today's Nutrition" : "Nutrition — " + fmtFull(VD);
    document.getElementById('tsub').textContent = fmtFull(VD);
    document.getElementById('btn-nxt').disabled = VD >= todayKey();
    document.getElementById('s-cal').textContent = Math.round(t.cal);
    document.getElementById('s-pro').textContent = t.pro.toFixed(1);
    document.getElementById('s-m').textContent = entries.length;
    document.getElementById('s-a').textContent = entries.length ? Math.round(t.cal / entries.length) : 0;
    document.getElementById('s-cg').textContent = s.calGoal;
    document.getElementById('s-pg').textContent = s.proGoal;
    const cp = Math.min(100, (t.cal / s.calGoal) * 100), pp = Math.min(100, (t.pro / s.proGoal) * 100);
    document.getElementById('cbar').style.width = cp + '%';
    document.getElementById('pbar').style.width = pp + '%';
    document.getElementById('cpt').textContent = `${Math.round(t.cal)} / ${s.calGoal} kcal`;
    document.getElementById('ppt').textContent = `${t.pro.toFixed(1)} / ${s.proGoal} g`;
    document.getElementById('ltit').textContent = (VD === todayKey() ? "Today's Log" : fmtFull(VD) + ' Log') + ` (${entries.length} items)`;
    renderLog(entries);
}

function renderLog(entries) {
    const el = document.getElementById('flist');
    if (!entries.length) {
        el.innerHTML = '<div class="empty"><div class="ei">🍽</div><p>Nothing logged yet.<br>Search for a food above to get started.</p></div>';
        return;
    }
    el.innerHTML = entries.map(e => `
    <div class="fe">
      <div class="ftm">${e.time}</div>
      <div class="fdt"></div>
      <div class="fin">
        <div class="fnm">${esc(e.name)}</div>
        <div class="fqt">${esc(e.disp)}</div>
      </div>
      <div class="fbg">
        <span class="badge bc">${Math.round(e.cal)} kcal</span>
        <span class="badge bp">${e.pro.toFixed(1)}g P</span>
      </div>
      <button class="btn-del" onclick="delEntry('${e.id}')" title="Delete">✕</button>
    </div>
  `).join('');
}

/* SEARCH */
function onSearch() {
    const q = document.getElementById('fsearch').value.trim().toLowerCase();
    SEL = null; document.getElementById('selnm').value = '';
    const acl = document.getElementById('acl');
    if (!q) { acl.classList.remove('open'); return; }
    acRes = DB.filter(f => f.name.toLowerCase().includes(q)).slice(0, 12);
    acIdx = -1;
    if (!acRes.length) {
        acl.innerHTML = '<div class="aci" style="color:var(--text3)">No results — use manual entry below ↓</div>';
    } else {
        acl.innerHTML = acRes.map((f, i) => `
      <div class="aci" id="ac${i}" onclick="selFood(${i})">
        <div class="anm">${esc(f.name)}<span class="atag ${f.isDrink ? 'd' : 'f'}">${f.isDrink ? 'Drink' : 'Food'}</span></div>
        <span class="ainf">${f.cal100} kcal / 100${f.isDrink ? 'ml' : 'g'}</span>
      </div>
    `).join('');
    }
    acl.classList.add('open');
}

function selFood(i) {
    SEL = acRes[i];
    document.getElementById('fsearch').value = SEL.name;
    document.getElementById('selnm').value = SEL.name;
    document.getElementById('acl').classList.remove('open');
    // Update unit selector
    const funit = document.getElementById('funit');
    const albl = document.getElementById('albl');
    if (SEL.isDrink) {
        funit.innerHTML = '<option value="ml">ml</option><option value="L">L</option>';
        albl.textContent = 'Amount (ml or L)';
    } else {
        funit.innerHTML = '<option value="g">g</option><option value="kg">kg</option>';
        albl.textContent = 'Amount (g or kg)';
    }
}

function onSKey(e) {
    const acl = document.getElementById('acl');
    if (!acl.classList.contains('open')) return;
    if (e.key === 'ArrowDown') { acIdx = Math.min(acIdx + 1, acRes.length - 1); hiAc(); e.preventDefault(); }
    else if (e.key === 'ArrowUp') { acIdx = Math.max(acIdx - 1, 0); hiAc(); e.preventDefault(); }
    else if (e.key === 'Enter' && acIdx >= 0) { selFood(acIdx); e.preventDefault(); }
    else if (e.key === 'Escape') { acl.classList.remove('open'); }
}
function hiAc() { document.querySelectorAll('.aci').forEach((el, i) => el.classList.toggle('sel', i === acIdx)); }
document.addEventListener('click', e => {
    if (!e.target.closest('#fsearch') && !e.target.closest('#acl'))
        document.getElementById('acl')?.classList.remove('open');
});

/* MANUAL */
function toggleManual() { manOn = !manOn; document.getElementById('mr').classList.toggle('vis', manOn); }

/* ADD ENTRY */
function addEntry() {
    const name = document.getElementById('fsearch').value.trim();
    const amt = parseFloat(document.getElementById('famt').value);
    const unit = document.getElementById('funit').value;
    setErr('aerr', '');
    if (!name) { setErr('aerr', 'Please search and select a food or drink.'); return; }
    if (isNaN(amt) || amt <= 0) { setErr('aerr', 'Please enter a valid amount greater than 0.'); return; }

    let cal, pro, disp;
    if (manOn) {
        cal = parseFloat(document.getElementById('mcal').value) || 0;
        pro = parseFloat(document.getElementById('mpro').value) || 0;
        disp = `${amt} ${unit}`;
    } else if (SEL) {
        // Convert to 100-unit base (g or ml)
        const base = (unit === 'kg' || unit === 'L') ? amt * 1000 : amt;
        cal = (SEL.cal100 / 100) * base;
        pro = (SEL.pro100 / 100) * base;
        disp = SEL.isDrink
            ? (unit === 'L' ? `${amt} L` : `${amt} ml`)
            : (unit === 'kg' ? `${amt} kg` : `${amt} g`);
    } else {
        setErr('aerr', 'Please select an item from the dropdown, or toggle manual entry.'); return;
    }

    const entries = getE(VD);
    entries.push({ id: Date.now().toString(), name, disp, cal: Math.round(cal * 10) / 10, pro: Math.round(pro * 10) / 10, time: fmtTime() });
    saveE(VD, entries);

    document.getElementById('fsearch').value = '';
    document.getElementById('selnm').value = '';
    document.getElementById('famt').value = '';
    document.getElementById('mcal').value = '';
    document.getElementById('mpro').value = '';
    SEL = null;
    // Reset unit to default g/kg
    document.getElementById('funit').innerHTML = '<option value="g">g</option><option value="kg">kg</option>';
    document.getElementById('albl').textContent = 'Amount';

    setOk('aerr', `✓ "${name}" added!`);
    refreshToday();
}

function delEntry(id) { saveE(VD, getE(VD).filter(e => e.id !== id)); refreshToday(); }

/* SETTINGS */
function saveSettings() {
    localStorage.setItem(`nt3s_${CU}`, JSON.stringify({
        calGoal: parseInt(document.getElementById('set-cal').value) || 2000,
        proGoal: parseInt(document.getElementById('set-pro').value) || 100,
    }));
    refreshToday();
}
function clearToday() { if (!confirm('Delete all entries for this day?')) return; saveE(VD, []); refreshToday(); }

/* HISTORY */
function renderHistory() {
    const keys = Object.keys(localStorage)
        .filter(k => k.startsWith(`nt3_${CU}_`))
        .map(k => k.replace(`nt3_${CU}_`, ''))
        .filter(d => { try { return getE(d).length > 0; } catch { return false; } })
        .sort((a, b) => b.localeCompare(a));
    const el = document.getElementById('hlist');
    if (!keys.length) {
        el.innerHTML = '<div class="empty" style="margin-top:2rem"><div class="ei">📅</div><p>No history yet.<br>Log a few days and it will appear here!</p></div>';
        return;
    }
    el.innerHTML = keys.map(d => {
        const entries = getE(d), t = totals(entries);
        return `<div class="hc">
      <div class="hh">
        <div><div class="hdate">${fmtFull(d)}</div><div class="hcnt">${entries.length} item${entries.length !== 1 ? 's' : ''}</div></div>
        <button class="exbtn" onclick="toggleHist('hd-${d}',this)">Show ▾</button>
      </div>
      <div class="htot">
        <span class="hbg cal">${Math.round(t.cal)} kcal</span>
        <span class="hbg pro">${t.pro.toFixed(1)}g protein</span>
      </div>
      <div class="hitems" id="hd-${d}">
        ${entries.map(e => `
          <div class="hr">
            <div><div class="hn">${esc(e.name)}</div><div class="hm">${esc(e.disp)} · ${e.time}</div></div>
            <div class="hv">${Math.round(e.cal)} kcal · ${e.pro.toFixed(1)}g P</div>
          </div>
        `).join('')}
      </div>
    </div>`;
    }).join('');
}
function toggleHist(id, btn) { const o = document.getElementById(id).classList.toggle('open'); btn.textContent = o ? 'Hide ▴' : 'Show ▾'; }

/* EXPORT CSV */
function exportCSV() {
    const keys = Object.keys(localStorage).filter(k => k.startsWith(`nt3_${CU}_`)).map(k => k.replace(`nt3_${CU}_`, '')).sort();
    let rows = ['Date,Time,Name,Amount,Calories (kcal),Protein (g)'];
    keys.forEach(d => getE(d).forEach(e => { rows.push(`${d},${e.time},"${e.name}","${e.disp}",${Math.round(e.cal)},${e.pro.toFixed(1)}`); }));
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([rows.join('\n')], { type: 'text/csv' }));
    a.download = `nutritrack_${CU}_${todayKey()}.csv`;
    a.click();
}

/* AUTO-LOGIN */
window.addEventListener('DOMContentLoaded', () => {
    const sess = localStorage.getItem('nt3_sess');
    const users = JSON.parse(localStorage.getItem('nt3_u') || '{}');
    if (sess && users[sess]) { CU = sess; initApp(); showPage('app'); }
});
document.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    if (document.getElementById('page-login').classList.contains('active')) doLogin();
    else if (document.getElementById('page-register').classList.contains('active')) doRegister();
});
