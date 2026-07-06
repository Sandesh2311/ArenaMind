import PropTypes from 'prop-types';
import { memo, useCallback, useRef } from 'react';
import { ROLES } from '../../constants/app.js';

function RoleTabsComponent({ activeRole, onChange }) {
  const tabRefs = useRef([]);

  const focusRole = useCallback(
    (nextIndex) => {
      const nextRole = ROLES[nextIndex];
      onChange(nextRole.id);
      window.requestAnimationFrame(() => tabRefs.current[nextIndex]?.focus());
    },
    [onChange]
  );

  const handleKeyDown = useCallback(
    (event) => {
      const currentIndex = ROLES.findIndex((role) => role.id === activeRole);
      const lastIndex = ROLES.length - 1;

      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        focusRole(currentIndex === lastIndex ? 0 : currentIndex + 1);
      }

      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        focusRole(currentIndex === 0 ? lastIndex : currentIndex - 1);
      }

      if (event.key === 'Home') {
        event.preventDefault();
        focusRole(0);
      }

      if (event.key === 'End') {
        event.preventDefault();
        focusRole(lastIndex);
      }
    },
    [activeRole, focusRole]
  );

  return (
    <div className="glass inline-flex rounded-lg p-1" role="tablist" aria-label="Dashboard role">
      {ROLES.map((role, index) => (
        <button
          key={role.id}
          ref={(element) => {
            tabRefs.current[index] = element;
          }}
          id={`${role.id}-dashboard-tab`}
          type="button"
          role="tab"
          aria-selected={activeRole === role.id}
          aria-controls={`${role.id}-dashboard-panel`}
          tabIndex={activeRole === role.id ? 0 : -1}
          onKeyDown={handleKeyDown}
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

RoleTabsComponent.propTypes = {
  activeRole: PropTypes.oneOf(['fan', 'organizer', 'volunteer']).isRequired,
  onChange: PropTypes.func.isRequired
};

export const RoleTabs = memo(RoleTabsComponent);
