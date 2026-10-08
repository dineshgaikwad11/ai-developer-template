import { useHealthQuery } from '../api/healthApi';
import { formatTimestamp } from '../../../utils/formatTimestamp';

export function HealthPage() {
  const health = useHealthQuery();

  return (
    <>
      <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-signal">Workspace / Overview</p>
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">System status</h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-ink/60">A live view of the application API and its readiness for requests.</p>
        </div>
        <button
          className="w-fit rounded-lg border border-ink/15 bg-white px-4 py-2.5 text-sm font-semibold shadow-sm transition hover:border-ink/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal disabled:cursor-wait disabled:opacity-50"
          onClick={() => void health.refetch()}
          disabled={health.isFetching}
        >
          {health.isFetching ? 'Checking…' : 'Refresh status'}
        </button>
      </div>

      <section className="grid gap-4 md:grid-cols-[1.4fr_1fr]" aria-label="API health">
        <article className="relative overflow-hidden rounded-2xl border border-ink/10 bg-white p-6 shadow-sm sm:p-8">
          <div className="absolute right-0 top-0 h-1 w-full bg-mint" />
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-sm font-medium text-ink/55">API availability</p>
              <h2 className="mt-5 font-display text-2xl font-bold">{health.data?.status ?? (health.isPending ? 'Connecting' : 'Unavailable')}</h2>
            </div>
            <span className={`grid size-12 place-items-center rounded-xl ${health.isSuccess ? 'bg-mint/60 text-ink' : health.isError ? 'bg-red-100 text-red-800' : 'bg-canvas text-ink/50'}`} aria-hidden="true">
              <span className={`size-3 rounded-full ${health.isSuccess ? 'bg-emerald-700' : health.isError ? 'bg-red-600' : 'bg-ink/30'}`} />
            </span>
          </div>
          <p className="mt-6 max-w-lg text-sm leading-6 text-ink/60" role="status">
            {health.isError ? 'The API could not be reached. Check that the backend is running and try again.' : health.isPending ? 'Waiting for a response from the backend health endpoint.' : 'The API is responding and ready to accept requests.'}
          </p>
          {health.data && <p className="mt-5 border-t border-ink/10 pt-4 text-xs text-ink/50">Last checked {formatTimestamp(health.data.checkedAt)}</p>}
        </article>

        <article className="rounded-2xl border border-ink/10 bg-ink p-6 text-white shadow-sm sm:p-8">
          <p className="text-sm font-medium text-white/55">Starter architecture</p>
          <h2 className="mt-5 font-display text-xl font-bold">Ready to extend</h2>
          <ul className="mt-5 space-y-3 text-sm text-white/75">
            <li className="flex items-center gap-3"><span className="size-1.5 rounded-full bg-mint" /> ASP.NET Core + CQRS</li>
            <li className="flex items-center gap-3"><span className="size-1.5 rounded-full bg-mint" /> React Query + feature modules</li>
            <li className="flex items-center gap-3"><span className="size-1.5 rounded-full bg-mint" /> Strict TypeScript + Vite</li>
          </ul>
        </article>
      </section>
    </>
  );
}
