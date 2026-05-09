import { useState, useCallback, useEffect } from 'react';
import api from '../utils/api';

/* ── Today's entries for a given date ────────────────── */
export function useEntries(date) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const fetch = useCallback(async () => {
    if (!date) return;
    setLoading(true); setError(null);
    try {
      const { data } = await api.get(`/entries?date=${date}`);
      setEntries(data.entries);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, [date]);

  useEffect(() => { fetch(); }, [fetch]);

  const addEntry = useCallback(async (payload) => {
    try {
      const { data } = await api.post('/entries', payload);
      setEntries(prev => [...prev, data.entry]);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Add failed' };
    }
  }, []);

  const deleteEntry = useCallback(async (id) => {
    try {
      await api.delete(`/entries/${id}`);
      setEntries(prev => prev.filter(e => e._id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Delete failed' };
    }
  }, []);

  const clearDay = useCallback(async () => {
    try {
      await api.delete(`/entries/clear/${date}`);
      setEntries([]);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Clear failed' };
    }
  }, [date]);

  const totals = entries.reduce(
    (acc, e) => ({ cal: acc.cal + e.calories, pro: acc.pro + e.protein }),
    { cal: 0, pro: 0 }
  );

  return { entries, loading, error, totals, addEntry, deleteEntry, clearDay, refetch: fetch };
}

/* ── Full history grouped by date ────────────────────── */
export function useHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/entries/history');
      setHistory(data.history);
    } catch { /* silent */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);
  return { history, loading, refetch: fetch };
}

/* ── Last 7-day daily stats ──────────────────────────── */
export function useStats() {
  const [stats,   setStats]   = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const go = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/entries/stats');
        setStats(data.stats);
      } catch { /**/ }
      finally { setLoading(false); }
    };
    go();
  }, []);

  return { stats, loading };
}
