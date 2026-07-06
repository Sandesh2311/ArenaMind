import { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { LandingPage } from './components/LandingPage.jsx';
import { RoleTabs } from './components/ui/RoleTabs.jsx';
import { useDashboardPreferences } from './hooks/useDashboardPreferences.js';

const FanDashboard = lazy(() =>
  import('./components/dashboards/FanDashboard.jsx').then((module) => ({ default: module.FanDashboard }))
);
const OrganizerDashboard = lazy(() =>
  import('./components/dashboards/OrganizerDashboard.jsx').then((module) => ({ default: module.OrganizerDashboard }))
);
const VolunteerDashboard = lazy(() =>
  import('./components/dashboards/VolunteerDashboard.jsx').then((module) => ({ default: module.VolunteerDashboard }))
);

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

/**
 * Render the ArenaMind shell and coordinate top-level dashboard preferences.
 * @returns {JSX.Element}
 */
export default function App() {
  const { activeRole, language, handleRoleChange, handleLanguageChange } = useDashboardPreferences();

  return (
    <div className="min-h-screen">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <main id="main-content">
        <LandingPage />
        <section id="dashboards" className="px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="dashboards-title">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-arena-cyan">Role dashboards</p>
                <h2 id="dashboards-title" className="mt-3 text-3xl font-bold text-white md:text-5xl">
                  One platform, three operational views.
                </h2>
              </div>
              <RoleTabs activeRole={activeRole} onChange={handleRoleChange} />
            </div>
            <Suspense
              fallback={
                <div className="glass rounded-lg p-5 text-sm text-slate-300" role="status">
                  Loading dashboard...
                </div>
              }
            >
              <section
                id={`${activeRole}-dashboard-panel`}
                role="tabpanel"
                aria-labelledby={`${activeRole}-dashboard-tab`}
                aria-live="polite"
              >
                <DashboardRenderer activeRole={activeRole} language={language} onLanguageChange={handleLanguageChange} />
              </section>
            </Suspense>
          </div>
        </section>
      </main>
      <footer className="sr-only">ArenaMind AI accessibility and operational support information.</footer>
    </div>
  );
}
