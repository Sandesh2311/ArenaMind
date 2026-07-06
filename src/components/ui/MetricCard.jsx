import PropTypes from 'prop-types';

const toneMap = {
  cyan: 'text-arena-cyan',
  mint: 'text-arena-mint',
  gold: 'text-arena-gold',
  coral: 'text-arena-coral'
};

export function MetricCard({ label, value, trend, tone = 'cyan' }) {
  return (
    <article className="glass rounded-lg p-5 transition duration-300 hover:-translate-y-1 hover:shadow-glow">
      <p className="text-sm text-slate-300">{label}</p>
      <div className="mt-3 flex items-end justify-between gap-3">
        <strong className="text-3xl font-bold text-white">{value}</strong>
        <span className={`text-sm font-semibold ${toneMap[tone]}`}>{trend}</span>
      </div>
    </article>
  );
}

MetricCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  trend: PropTypes.string.isRequired,
  tone: PropTypes.oneOf(['cyan', 'mint', 'gold', 'coral'])
};
