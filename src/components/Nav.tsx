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
  { label: 'Export', view: 'export' },
];

export default function Nav({ current, onNavigate }: NavProps) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b"
      style={{ background: '#121212', borderColor: '#2A2925' }}
    >
      <button
        onClick={() => onNavigate('character')}
        className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A876] rounded"
      >
        <span
          className="w-7 h-7 rounded-full border flex items-center justify-center text-xs font-display font-semibold transition-colors"
          style={{ borderColor: '#C9A876', color: '#C9A876' }}
        >
          A
        </span>
        <span
          className="font-display text-lg font-semibold tracking-wide hidden sm:block"
          style={{ color: '#E8E3D8' }}
        >
          Aethon{' '}
          <span className="font-normal text-sm" style={{ color: '#5A5650' }}>
            · Vagabond · NG
          </span>
        </span>
      </button>

      <div className="flex items-center gap-1">
        {links.map(({ label, view }) => (
          <button
            key={view}
            onClick={() => onNavigate(view)}
            className={`px-3 py-1.5 text-sm rounded transition-colors font-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A876] ${
              current === view
                ? 'text-[#C9A876]'
                : 'text-[#5A5650] hover:text-[#E8E3D8]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 text-xs font-body" style={{ color: '#5A5650' }}>
        <span className="hidden sm:inline">Lv 112</span>
        <span className="hidden sm:inline">·</span>
        <span className="hidden sm:inline">87 hrs</span>
        <span
          className="w-2 h-2 rounded-full ml-1"
          style={{ background: '#C9A876', boxShadow: '0 0 6px #C9A876' }}
          title="Site of Grace"
        />
      </div>
    </nav>
  );
}
