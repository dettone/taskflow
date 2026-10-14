import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { App } from './App';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('<App />', () => {
  it('mostra "API online" quando o health check responde ok', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({ status: 'ok', service: 'taskflow-api', uptime: 1, timestamp: 'now' }),
        { status: 200 },
      ),
    );

    render(<App />);

    expect(await screen.findByText('API online')).toBeInTheDocument();
  });

  it('mostra "API indisponível" quando a requisição falha', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('network'));

    render(<App />);

    expect(await screen.findByText('API indisponível')).toBeInTheDocument();
  });
});
