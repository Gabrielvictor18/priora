import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initialReports } from './data/mock';

const KEY = '@priora:reports:v2-clean';
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [reports, setReports] = useState(initialReports);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(KEY);
        if (raw) setReports(JSON.parse(raw));
      } catch (e) {}
      setReady(true);
    })();
  }, []);

  useEffect(() => {
    if (ready) AsyncStorage.setItem(KEY, JSON.stringify(reports)).catch(() => {});
  }, [reports, ready]);

  const addReport = (draft) => {
    const now = new Date();
    const id = `R-${now.getTime().toString().slice(-6)}`;
    const report = {
      id,
      ...draft,
      date: now.toLocaleDateString('pt-BR'),
      address: draft.address || null,
      // O status real poderá ser substituído pelo backend/IA.
      // A interface aceita todos os estados previstos na documentação.
      status: draft.status || 'Registrado',
      createdAt: now.toISOString(),
    };
    setReports(prev => [report, ...prev]);
    return report;
  };

  const cancelReport = (id) => setReports(prev => prev.filter(r => r.id !== id));
  const getReport = (id) => reports.find(r => r.id === id);

  const value = useMemo(() => ({ reports, addReport, cancelReport, getReport }), [reports]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const value = useContext(AppContext);
  if (!value) throw new Error('useApp precisa estar dentro de AppProvider');
  return value;
}
