import PropTypes from 'prop-types';
import { ROLES } from '../../constants/app.js';

export function RoleTabs({ activeRole, onChange }) {
  return (
    <div className="glass inline-flex rounded-lg p-1" role="tablist" aria-label="Dashboard role">
      {ROLES.map((role) => (
        <button
          key={role.id}
          type="button"
          role="tab"
          aria-selected={activeRole === role.id}
          onClick={() => onChange(role.id)}
          className={`min-h-11 rounded-md px-5 text-sm font-semibold transition ${
            activeRole === role.id ? 'bg-arena-cyan text-slate-950' : 'text-slate-200 hover:bg-white/10'
          }`}
        >
          {role.label}
        </button>
      ))}
    </div>
  );
}

RoleTabs.propTypes = {
  activeRole: PropTypes.oneOf(['fan', 'organizer', 'volunteer']).isRequired,
  onChange: PropTypes.func.isRequired
};
