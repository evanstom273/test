import { useState } from 'react';
import Nav from './components/Nav';
import CharacterSelect from './views/CharacterSelect';
import Timeline from './views/Timeline';
import BossTracker from './views/BossTracker';
import BuildTracker from './views/BuildTracker';
import Journal from './views/Journal';
import Export from './views/Export';

export type View = 'character' | 'timeline' | 'bosses' | 'build' | 'journal' | 'export';

export default function App() {
  const [view, setView] = useState<View>('character');

  if (view === 'character') {
    return <CharacterSelect onEnter={() => setView('timeline')} />;
  }

  return (
    <div style={{ background: '#121212', minHeight: '100vh' }}>
      <Nav current={view} onNavigate={setView} />
      {view === 'timeline' && <Timeline />}
      {view === 'bosses' && <BossTracker />}
      {view === 'build' && <BuildTracker />}
      {view === 'journal' && <Journal />}
      {view === 'export' && <Export />}
    </div>
  );
}
