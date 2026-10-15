import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Search, Eye, FileText, CheckSquare, LoaderCircle, ArrowLeft,
  ChevronDown, X, ShieldCheck, LockKeyhole
} from "lucide-react";
import "./styles.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const complaints = [];

const stats = { total: 0, completed: 0, analysis: 0 };

async function api(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });
  if (!response.ok) throw new Error("Falha na comunicação com o servidor.");
  return response.json();
}

function StatCards() {
  return (
    <section className="stats">
      <div className="stat-card"><FileText size={29}/><div><small>Denúncias realizadas</small><strong>{stats.total.toLocaleString("pt-BR")}</strong></div></div>
      <div className="stat-card"><CheckSquare size={30}/><div><small>Denúncias concluídas</small><strong>{stats.completed.toLocaleString("pt-BR")}</strong></div></div>
      <div className="stat-card"><LoaderCircle size={30}/><div><small>Denúncias em análise</small><strong>{stats.analysis}</strong></div></div>
    </section>
  );
}

function Login({ onLogin }) {
  const [admin, setAdmin] = useState(false);
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await api('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ cpf, password })
      });
      if (data?.token) localStorage.setItem('priora_token', data.token);
      onLogin(data);
    } catch (error) {
      alert(error.message || 'Não foi possível realizar o login.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <form className="login-card" onSubmit={submit}>
        <div className="brand-mark">{admin ? "Á" : "PRIORA"}</div>
        <div className="brand-subtitle">
          {admin ? "Área administrativa" : "G E S T Ã O D E D E N Ú N C I A S · I N F R A E S T R U T U R A"}
        </div>
        <div className="green-line" />
        <h2>{admin ? "Entrar com Sou Gov.br" : "Entrar com Priora"}</h2>

        <label>CPF</label>
        <input value={cpf} onChange={e => setCpf(e.target.value)} placeholder="000.000.000-00" inputMode="numeric"/>

        <label>SENHA</label>
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Digite sua senha" type="password"/>

        <a href="#" onClick={e => e.preventDefault()} className="forgot">Esqueci minha senha</a>
        <button className="primary-btn" disabled={loading}>{loading ? "ENTRANDO..." : "ENTRAR"}</button>
        <div className="signup">Ainda não tem conta? <a href="#" onClick={e => e.preventDefault()}>Cadastre-se</a></div>
        <div className="secure"><LockKeyhole size={11}/> CONEXÃO SEGURA</div>
      </form>
      <div className="gov-mark">✦</div>
    </main>
  );
}

function ListView({ onOpen }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Filtrar");
  const [sort, setSort] = useState("Mais recentes");

  const rows = useMemo(() => {
    let result = complaints.filter(c => {
      const q = search.toLowerCase();
      return !q || [c.problem, c.category, c.address, String(c.id)].some(v => v.toLowerCase().includes(q));
    });
    if (filter === "Alta") result = result.filter(c => c.priority === "Alta");
    if (filter === "Média") result = result.filter(c => c.priority === "Média");
    if (filter === "Baixa") result = result.filter(c => c.priority === "Baixa");
    if (sort === "Prioridades") {
      const order = { Alta: 0, Média: 1, Baixa: 2 };
      result = [...result].sort((a,b) => order[a.priority] - order[b.priority]);
    }
    return result;
  }, [search, filter, sort]);

  return (
    <>
      <div className="toolbar">
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option>Filtrar</option><option>Alta</option><option>Média</option><option>Baixa</option>
        </select>
        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option>Mais recentes</option><option>Prioridades</option><option>ID</option>
        </select>
        <div className="searchbox"><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar denúncia"/><Search size={17}/></div>
      </div>

      <div className="table">
        <div className="thead">
          <span>ID</span><span>Problema</span><span>Categoria</span><span>Data/Hora</span><span>Situação</span><span>Prioridade</span><span></span>
        </div>
        {rows.length === 0 && <div className="empty-state">Nenhuma denúncia encontrada.</div>}
        {rows.map(c => (
          <div className="trow" key={c.id}>
            <b className="id-badge">#{c.id}</b>
            <div className="problem-cell"><img src={c.image} /><div><b>{c.problem}</b><small>⌖ {c.address}</small></div></div>
            <b>{c.category}</b>
            <b className="date">{c.date}<br/><span>{c.time}</span></b>
            <span className="status">{c.status}</span>
            <span className={`priority ${c.priority.toLowerCase().replace("é","e")}`}>{c.priority}</span>
            <button className="icon-btn" onClick={() => onOpen(c)} aria-label="Visualizar"><Eye size={18}/></button>
          </div>
        ))}
      </div>
      <StatCards />
    </>
  );
}

function Detail({ complaint, onBack }) {
  const [action, setAction] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [sent, setSent] = useState(false);

  async function send() {
    try {
      await api(`/denuncias/${complaint.id}/resposta`, {
        method: 'POST',
        body: JSON.stringify({ action })
      });
      setShowConfirm(false);
      setSent(true);
    } catch (error) {
      alert(error.message || 'Não foi possível enviar a resposta.');
    }
  }

  return (
    <main className="detail-page">
      <div className="detail-header" onClick={onBack}><ArrowLeft size={21}/> Detalhes</div>
      <StatCards />
      <section className="detail-card">
        <div className="photo-wrap"><img src={complaint.image}/></div>
        <div className="detail-grid">
          <div><label>Problema</label><input readOnly value={complaint.problem}/></div>
          <div><label>Categoria</label><input readOnly value={complaint.category}/></div>
          <div><label>Orgão responsável</label><input readOnly value={complaint.agency}/></div>
          <div><label>Data da denúncia</label><input readOnly value={complaint.date}/></div>
          <div className="description"><label>Descrição do Problema</label><textarea readOnly value={complaint.description}/></div>
          <div className="action"><label>O que será feito</label><textarea value={action} onChange={e => setAction(e.target.value)} /></div>
          <div><label>Solução</label><input value={sent ? "Resposta enviada" : ""} readOnly={sent}/></div>
          <div className="send-wrap"><button className="primary-btn" onClick={() => setShowConfirm(true)} disabled={sent}>{sent ? "Resposta enviada" : "Enviar Resposta"}</button></div>
        </div>
      </section>

      {showConfirm && <div className="overlay"><div className="confirm">
        <button className="close" onClick={() => setShowConfirm(false)}><X/></button>
        <h3>Certeza que deseja enviar resposta?</h3>
        <div className="confirm-summary"><b>{complaint.problem}</b><span>{complaint.category}</span><p>{complaint.description}</p></div>
        <div className="confirm-actions"><button onClick={() => setShowConfirm(false)}>Cancelar</button><button className="primary-btn" onClick={send}>Sim</button></div>
      </div></div>}
    </main>
  );
}

function App() {
  const [logged, setLogged] = useState(false);
  const [selected, setSelected] = useState(null);

  if (!logged) return <Login onLogin={() => setLogged(true)} />;
  if (selected) return <Detail complaint={selected} onBack={() => setSelected(null)} />;

  return (
    <main className="app">
      <ListView onOpen={setSelected}/>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
