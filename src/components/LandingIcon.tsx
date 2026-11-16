export type IconName =
  | 'cap' | 'users' | 'layers' | 'pair' | 'hands' | 'board' | 'project' | 'group'
  | 'code' | 'game' | 'ai' | 'shield' | 'report' | 'parents' | 'guarantee';

export default function Icon({ name, size = 24, color = '#122e4f' }: { name: IconName; size?: number; color?: string }) {
  const paths: Record<IconName, React.ReactNode> = {
    cap: <><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11.5V16c2 2 10 2 12 0v-4.5" /></>,
    users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6" /><path d="M16 5.2a3.2 3.2 0 010 5.6M18 14.3c1.9.9 3 2.9 3 5.7" /></>,
    layers: <><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5" /></>,
    pair: <><circle cx="8" cy="8" r="3" /><circle cx="17" cy="9" r="2.4" /><path d="M2.5 20c0-3.3 2.4-5.7 5.5-5.7s5.5 2.4 5.5 5.7M15 14.5c3.3-.6 6 1.7 6 5" /></>,
    hands: <><path d="M4 13V6.5a1.5 1.5 0 013 0V12M7 11V5a1.5 1.5 0 013 0v6M10 11V6a1.5 1.5 0 013 0v7l2.2-2.200a1.6 1.6 0 012.4 2.100L14 19c-1 1.3-2.3 2-4 2H9c-3 0-5-2-5-5z" /></>,
    board: <><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M12 16v4M8 20h8M7 9l2 2-2 2M12 13h4" /></>,
    project: <><path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.300l6.1-.700z" /></>,
    group: <><circle cx="12" cy="7" r="3" /><circle cx="5" cy="10" r="2.2" /><circle cx="19" cy="10" r="2.2" /><path d="M6.5 20c0-3 2.4-5.3 5.5-5.300s5.5 2.3 5.5 5.300M1.8 18.500c0-2.2 1.4-3.8 3.2-3.800M22.2 18.500c0-2.2-1.4-3.8-3.2-3.8" /></>,
    code: <><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 5l-3 14" /></>,
    game: <><rect x="2.5" y="7" width="19" height="10" rx="5" /><path d="M7 10.500v3M5.5 12h3M15.5 11h.01M18 13h.01" /></>,
    ai: <><rect x="6" y="6" width="12" height="12" rx="3" /><path d="M9.5 10.500v.01M14.5 10.500v.01M9.5 14.500h5M12 3v3M12 18v3M3 12h3M18 12h3" /></>,
    shield: <><path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6z" /><path d="M9 12l2.2 2.200L15.5 10" /></>,
    report: <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h3" /></>,
    parents: <><circle cx="8" cy="7" r="2.8" /><circle cx="16.5" cy="7.5" r="2.3" /><path d="M3 19c0-3 2.2-5 5-5s5 2 5 5M14.5 13.300c3-.3 6 1.5 6 5.2" /><circle cx="12.5" cy="16.5" r="1.6" /></>,
    guarantee: <><circle cx="12" cy="10" r="6" /><path d="M9.3 10l1.9 1.9 3.5-3.600M8.5 15l-1.5 6 5-2.5 5 2.5-1.5-6" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

