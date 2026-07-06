import PropTypes from 'prop-types';
import { Suspense } from 'react';
import { useVisibleOnce } from '../hooks/useVisibleOnce.js';

export function LazyVisible({ children, fallback, className = '', rootMargin }) {
  const { ref, isVisible } = useVisibleOnce(rootMargin);

  return (
    <div ref={ref} className={className}>
      {isVisible ? <Suspense fallback={fallback}>{children}</Suspense> : fallback}
    </div>
  );
}

LazyVisible.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node.isRequired,
  className: PropTypes.string,
  rootMargin: PropTypes.string
};
