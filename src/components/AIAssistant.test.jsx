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

  it('announces validation failures without submitting a valid prompt', async () => {
    const user = userEvent.setup();
    render(<AIAssistant role="fan" language="English" onLanguageChange={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: /Send/i }));

    expect(await screen.findByText(/Enter a stadium question first/i)).toBeInTheDocument();
    expect(screen.getByRole('log', { name: /assistant conversation/i })).toBeInTheDocument();
  });

  it('updates prompt text from examples and reports language changes', async () => {
    const user = userEvent.setup();
    const onLanguageChange = vi.fn();
    render(<AIAssistant role="volunteer" language="English" onLanguageChange={onLanguageChange} />);

    await user.click(screen.getByRole('button', { name: /Translate to Spanish/i }));
    expect(screen.getByLabelText(/Ask ArenaMind/i)).toHaveValue('Translate to Spanish');

    await user.selectOptions(screen.getByLabelText(/Assistant language/i), 'Hindi');
    expect(onLanguageChange).toHaveBeenCalledWith('Hindi');
  });

  it('accepts typed prompts and clears the input after submit', async () => {
    const user = userEvent.setup();
    render(<AIAssistant role="fan" language="English" onLanguageChange={vi.fn()} />);

    const promptInput = screen.getByLabelText(/Ask ArenaMind/i);
    await user.type(promptInput, 'Nearest washroom');
    expect(promptInput).toHaveValue('Nearest washroom');

    await user.click(screen.getByRole('button', { name: /Send/i }));

    expect(await screen.findByText(/Bay 207/i)).toBeInTheDocument();
    expect(promptInput).toHaveValue('');
  });
});
