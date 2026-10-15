// Camada preparada para receber o back-end real.
// Quando a equipe liberar o acesso, altere estas duas constantes.
export const API_BASE_URL = 'https://SEU-BACKEND-AQUI/api';
export const USE_MOCK = true;

export async function apiFetch(path, options = {}) {
  if (USE_MOCK) {
    await new Promise(resolve => setTimeout(resolve, 350));
    return { ok: true, data: null };
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(data?.message || 'Erro na API');
  return { ok: true, data };
}

export async function createReport(report) {
  if (USE_MOCK) {
    return {
      id: `R-${String(Date.now()).slice(-4)}`,
      ...report,
      status: 'Em análise'
    };
  }
  return (await apiFetch('/ocorrencias', {
    method: 'POST',
    body: JSON.stringify(report)
  })).data;
}
