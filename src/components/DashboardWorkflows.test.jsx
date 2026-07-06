import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { FanDashboard } from './dashboards/FanDashboard.jsx';
import { OrganizerDashboard } from './dashboards/OrganizerDashboard.jsx';
import { VolunteerDashboard } from './dashboards/VolunteerDashboard.jsx';

describe('dashboard workflows', () => {
  it('supports the fan flow from AI question to navigation recommendation', async () => {
    const user = userEvent.setup();
    render(<FanDashboard language="English" onLanguageChange={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: /Find my seat/i }));
    await user.click(screen.getByRole('button', { name: /Send/i }));

    expect(await screen.findByText(/Open your ticket QR and follow Gate B/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Navigation recommendations/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Route from Gate B to Section 214/i)).toBeInTheDocument();
  });

  it('renders organizer recommendations, analytics summaries, incidents, and emergency actions', () => {
    render(<OrganizerDashboard language="English" onLanguageChange={vi.fn()} />);

    expect(screen.getByLabelText(/Live Visitors: 73,420/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Tournament Operations Overview/i })).toBeInTheDocument();
    expect(screen.getByText(/Open Gate C overflow routing/i)).toBeInTheDocument();
    expect(screen.getByText(/Gate D density is 91%/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Queue analytics from 16:00 to 18:00/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Volunteer monitoring chart/i)).toBeInTheDocument();
    expect(screen.getByRole('table', { name: /3 active incidents/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Broadcast multilingual crowd advisory/i })).toBeInTheDocument();
  });

  it('supports the organizer AI flow from dashboard to incident summary', async () => {
    const user = userEvent.setup();
    render(<OrganizerDashboard language="English" onLanguageChange={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: /Emergency near Gate D/i }));
    await user.click(screen.getByRole('button', { name: /Send/i }));

    expect(await screen.findByText(/Gate D as high priority/i)).toBeInTheDocument();
    expect(screen.getByRole('row', { name: /INC-2041 Gate D High/i })).toBeInTheDocument();
  });

  it('renders lightweight tournament operations support modules for organizers', () => {
    render(<OrganizerDashboard language="English" onLanguageChange={vi.fn()} />);

    expect(screen.getByRole('heading', { name: /Tournament Operations Center/i })).toBeInTheDocument();
    expect(screen.getByText(/Multi Stadium Status/i)).toBeInTheDocument();
    expect(screen.getByText(/Accessibility Assistance/i)).toBeInTheDocument();
  });

  it('renders volunteer task priorities, translation helper, and accessible route workflow', async () => {
    const user = userEvent.setup();
    render(<VolunteerDashboard language="English" onLanguageChange={vi.fn()} />);

    expect(screen.getByLabelText(/Guide families from Gate B to Section 214\. Priority: High\. Due: Now/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Language assistance suggestions/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Translation assistant: Convert fan guidance/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Staff route from Section 110 to Medical Point M2/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Translate to Spanish/i }));
    await user.click(screen.getByRole('button', { name: /Send/i }));

    expect(await screen.findByText(/Por favor siga/i)).toBeInTheDocument();
  });
});
