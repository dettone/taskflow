const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export interface HealthResponse {
  status: 'ok';
  service: string;
  uptime: number;
  timestamp: string;
}

export async function fetchHealth(signal?: AbortSignal): Promise<HealthResponse> {
  const res = await fetch(`${API_URL}/health`, { signal });
  if (!res.ok) throw new Error(`API respondeu ${res.status}`);
  return (await res.json()) as HealthResponse;
}
