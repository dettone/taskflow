import { useEffect, useState } from 'react';
import { fetchHealth } from './api';

type Status = 'loading' | 'ok' | 'error';

const LABELS: Record<Status, string> = {
  loading: 'Verificando API…',
  ok: 'API online',
  error: 'API indisponível',
};

export function App() {
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    const controller = new AbortController();
    fetchHealth(controller.signal)
      .then(() => setStatus('ok'))
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setStatus('error');
      });
    return () => controller.abort();
  }, []);

  return (
    <main className="card">
      <h1>TaskFlow</h1>
      <p>Plataforma colaborativa de projetos e tarefas</p>
      <span className={`badge badge--${status}`} role="status">
        {LABELS[status]}
      </span>
    </main>
  );
}
