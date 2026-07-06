import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from './App.jsx';

describe('App', () => {
  it('renders the ArenaMind landing page and switches roles', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByRole('heading', { name: 'ArenaMind AI' })).toBeInTheDocument();
    await user.click(screen.getByRole('tab', { name: 'Organizer' }));
    expect(await screen.findByRole('heading', { name: /Crowd heatmap/i }, { timeout: 15000 })).toBeInTheDocument();
    await user.click(screen.getByRole('tab', { name: 'Volunteer' }));
    expect(await screen.findByRole('heading', { name: /Assigned tasks/i }, { timeout: 15000 })).toBeInTheDocument();
  }, 20000);
});
