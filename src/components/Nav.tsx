import { useStore, currentLevel } from '../store/context';
import { type View } from '../App';

interface NavProps {
  current: View;
  onNavigate: (v: View) => void;
}

const links: { label: string; view: View }[] = [
  { label: 'Timeline', view: 'timeline' },
  { label: 'Bosses', view: 'bosses' },
  { label: 'Build', view: 'build' },
  { label: 'Journal', view: 'journal' },
  { label: 'Archive', view: 'export' },
];

export default function Nav({ current, onNavigate }: NavProps) {
  const { state, clearJourney } = useStore();
  const char = state.character;
  const level = currentLevel(state.builds);

  function handleDelete() {
    if (window.confirm(`Delete ${char?.name} and all journey data? This cannot be undone.`)) {
      clearJourney();
      onNavigate('character');
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3.5 border-b"
      style={{ background: '#121212', borderColor: '#2A2925' }}>
      <div className="flex items-center gap-1">
        <button onClick={() => onNavigate('character')}
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A876] rounded">
          <span className="w-7 h-7 rounded-full border flex items-center justify-center text-xs font-display font-semibold transition-colors"
            style={{ borderColor: '#C9A876', color: '#C9A876' }}>
            {char ? char.name.charAt(0).toUpperCase() : '?'}
          </span>
          <span className="font-display text-base font-semibold tracking-wide hidden sm:block" style={{ color: '#E8E3D8' }}>
            {char ? char.name : 'New Tarnished'}
            {char && <span className="font-normal text-sm ml-1.5" style={{ color: '#5A5650' }}>· {char.class} · NG{char.ngCycle > 1 ? `+${char.ngCycle - 1}` : ''}</span>}
          </span>
        </button>
        {char && (
          <button onClick={handleDelete}
            className="ml-1 px-1.5 py-0.5 text-xs rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B2E2E]"
            style={{ color: '#3A3835' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#8B2E2E')}
            onMouseLeave={e => (e.currentTarget.style.color = '#3A3835')}
            title="Delete character">
            ✕
          </button>
        )}
      </div>

      <div className="flex items-center gap-0.5">
        {links.map(({ label, view }) => (
          <button key={view} onClick={() => onNavigate(view)}
            className={`px-3 py-1.5 text-sm rounded transition-colors font-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A876] ${
              current === view ? 'text-[#C9A876]' : 'text-[#5A5650] hover:text-[#E8E3D8]'
            }`}>
            {label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 text-xs font-body" style={{ color: '#5A5650' }}>
        {state.builds.length > 0 && <span className="hidden sm:inline">Lv {level}</span>}
        {state.builds.length > 0 && state.totalHours > 0 && <span className="hidden sm:inline">·</span>}
        {state.totalHours > 0 && <span className="hidden sm:inline">{state.totalHours} hrs</span>}
        <span className="w-2 h-2 rounded-full ml-1" style={{ background: '#C9A876', boxShadow: '0 0 6px #C9A876' }} title="Site of Grace" />
      </div>
    </nav>
  );
}
