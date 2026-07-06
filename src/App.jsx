import { useState } from 'react';
import PropTypes from 'prop-types';
import { LandingPage } from './components/LandingPage.jsx';
import { FanDashboard } from './components/dashboards/FanDashboard.jsx';
import { OrganizerDashboard } from './components/dashboards/OrganizerDashboard.jsx';
import { VolunteerDashboard } from './components/dashboards/VolunteerDashboard.jsx';
import { RoleTabs } from './components/ui/RoleTabs.jsx';

function DashboardRenderer({ activeRole, language, onLanguageChange }) {
  if (activeRole === 'organizer') {
    return <OrganizerDashboard language={language} onLanguageChange={onLanguageChange} />;
  }

  if (activeRole === 'volunteer') {
    return <VolunteerDashboard language={language} onLanguageChange={onLanguageChange} />;
  }

  return <FanDashboard language={language} onLanguageChange={onLanguageChange} />;
}

DashboardRenderer.propTypes = {
  activeRole: PropTypes.oneOf(['fan', 'organizer', 'volunteer']).isRequired,
  language: PropTypes.string.isRequired,
  onLanguageChange: PropTypes.func.isRequired
};

export default function App() {
  const [activeRole, setActiveRole] = useState('fan');
  const [language, setLanguage] = useState('English');

  return (
    <div className="min-h-screen">
      <LandingPage />
      <section id="dashboards" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-arena-cyan">Role dashboards</p>
              <h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">One platform, three operational views.</h2>
            </div>
            <RoleTabs activeRole={activeRole} onChange={setActiveRole} />
          </div>
          <DashboardRenderer activeRole={activeRole} language={language} onLanguageChange={setLanguage} />
        </div>
      </section>
    </div>
  );
}
