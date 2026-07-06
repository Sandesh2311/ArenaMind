import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import App from './App.jsx';
import { FanDashboard } from './components/dashboards/FanDashboard.jsx';
import { RoleTabs } from './components/ui/RoleTabs.jsx';

function RoleTabsHarness() {
  const [activeRole, setActiveRole] = useState('fan');

  return <RoleTabs activeRole={activeRole} onChange={setActiveRole} />;
}

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

  it('supports keyboard navigation for dashboard role tabs', async () => {
    const user = userEvent.setup();
    render(<RoleTabsHarness />);

    await user.tab();
    expect(screen.getByRole('tab', { name: 'Fan' })).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    await waitFor(() => expect(screen.getByRole('tab', { name: 'Organizer' })).toHaveFocus());
    expect(screen.getByRole('tab', { name: 'Organizer' })).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{ArrowDown}');
    await waitFor(() => expect(screen.getByRole('tab', { name: 'Volunteer' })).toHaveFocus());

    await user.keyboard('{ArrowRight}');
    await waitFor(() => expect(screen.getByRole('tab', { name: 'Fan' })).toHaveFocus());

    await user.keyboard('{End}');
    await waitFor(() => expect(screen.getByRole('tab', { name: 'Volunteer' })).toHaveFocus());

    await user.keyboard('{ArrowLeft}');
    await waitFor(() => expect(screen.getByRole('tab', { name: 'Organizer' })).toHaveFocus());

    await user.keyboard('{ArrowUp}');
    await waitFor(() => expect(screen.getByRole('tab', { name: 'Fan' })).toHaveFocus());

    await user.keyboard('{Home}');
    await waitFor(() => expect(screen.getByRole('tab', { name: 'Fan' })).toHaveFocus());

    await user.keyboard('{ArrowLeft}');
    await waitFor(() => expect(screen.getByRole('tab', { name: 'Volunteer' })).toHaveFocus());
  });

  it('renders fan dashboard accessible service and route summaries', () => {
    render(<FanDashboard language="English" onLanguageChange={vi.fn()} />);

    expect(screen.getByRole('region', { name: /AI Stadium Assistant/i })).toBeInTheDocument();
    expect(screen.getByRole('list', { name: /Fan service options/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Route from Gate B to Section 214/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/17:00: Brazil vs France, Gates open/i)).toBeInTheDocument();
  });
});
