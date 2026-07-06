import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { AIAssistant } from './AIAssistant.jsx';

describe('AIAssistant', () => {
  it('renders example prompts and sends a local answer', async () => {
    const user = userEvent.setup();
    render(<AIAssistant role="fan" language="English" onLanguageChange={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: /Where is Gate B/i }));
    await user.click(screen.getByRole('button', { name: /Send/i }));

    expect(await screen.findByText(/east arrival plaza/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Source: local/i).length).toBeGreaterThan(0);
  });
});
