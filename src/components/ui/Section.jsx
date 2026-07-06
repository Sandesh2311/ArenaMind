import PropTypes from 'prop-types';

export function Section({ id, eyebrow, title, children, className = '' }) {
  return (
    <section id={id} className={`px-4 py-16 sm:px-6 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-7xl">
        {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-arena-cyan">{eyebrow}</p>}
        {title && <h2 className="max-w-3xl text-3xl font-bold text-white md:text-5xl">{title}</h2>}
        {children}
      </div>
    </section>
  );
}

Section.propTypes = {
  id: PropTypes.string,
  eyebrow: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};
