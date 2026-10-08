import { NavLink, Outlet } from 'react-router-dom';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-ink/10 bg-white/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <NavLink to="/" className="flex items-center gap-3" aria-label="Template home">
            <span className="grid size-9 place-items-center rounded-xl bg-ink font-display text-sm font-bold text-mint">A</span>
            <span className="font-display text-sm font-bold tracking-tight">Northstar <span className="font-normal text-ink/50">Platform</span></span>
          </NavLink>
          <span className="hidden text-xs font-medium text-ink/50 sm:block">APPLICATION STARTER / 0.1</span>
          <span className="flex items-center gap-2 rounded-full border border-ink/10 bg-white px-3 py-1.5 text-xs font-semibold">
            <span className="size-2 rounded-full bg-signal" /> Development
          </span>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <Outlet />
      </main>
    </div>
  );
}
