// App shell + hash router. Pages are lazy chunks so the bank and Pyodide only load where needed.
// Routes (hash paths kept): #/ Home · #/latihan Practice · #/soal-lalu[/paper] Past papers · #/ujian Mock · #/kartu Cards · #/sintaks[/id] Syntax · #/progres Progress · #/problems[/id] Problems · #/bank · #/sandbox (Playground) · #/library[/src[/page]] · #/learn[/deck[/section]]
import { Suspense, lazy, useCallback, useEffect, useState, type ComponentType } from 'react'
import { PAGE_COUNT, PageCtx, PageLightbox } from './lib/kit'
import type { PageRef } from './types'
import { AppIcon, IconBook, IconCards, IconChart, IconChecklist, IconGrid, IconLayers, IconPanels, IconPencil, IconSlides, IconSparkles, IconTimer } from './lib/icons'
import './practice/practice.css'

const Home = lazy(() => import('./pages/Home'))
const BankBrowser = lazy(() => import('./pages/BankBrowser'))
const Sandbox = lazy(() => import('./pages/Sandbox'))
const Practice = lazy(() => import('./practice/Practice'))
const Past = lazy(() => import('./practice/Past'))
const Mock = lazy(() => import('./practice/Mock'))
const Cards = lazy(() => import('./practice/Cards'))
const Progress = lazy(() => import('./practice/Progress'))
const Problems = lazy(() => import('./practice/Problems'))
const Library = lazy(() => import('./pages/Library'))
const Learn = lazy(() => import('./pages/Learn'))
// pages/Syntax.tsx is owned by another agent: resolved through the glob so a missing file never breaks the build
const syntaxMods = import.meta.glob<{ default: ComponentType<{ id?: string }> }>('./pages/Syntax.tsx')
const Syntax = lazy(() => (syntaxMods['./pages/Syntax.tsx']?.() ?? Promise.resolve({ default: () => <div className="pr-page"><p className="muted">Syntax page not available yet.</p></div> })))

export type Route =
  | { page: 'home' } | { page: 'practice' } | { page: 'past'; id?: string } | { page: 'mock' } | { page: 'cards' }
  | { page: 'syntax'; id?: string } | { page: 'progress' } | { page: 'problems'; id?: string } | { page: 'bank'; id?: string } | { page: 'sandbox' } | { page: 'library'; id?: string; n?: number } | { page: 'learn'; id?: string; sec?: string }

function parse(hash: string): Route {
  const [, page, a, b] = hash.replace(/^#/, '').split('?')[0].split('/')
  switch (page) {
    case 'latihan': return { page: 'practice' }
    case 'soal-lalu': return { page: 'past', id: a }
    case 'ujian': return { page: 'mock' }
    case 'kartu': return { page: 'cards' }
    case 'sintaks': return { page: 'syntax', id: a }
    case 'progres': return { page: 'progress' }
    case 'problems': return { page: 'problems', id: a }
    case 'bank': return { page: 'bank', id: a }
    case 'sandbox': return { page: 'sandbox' }
    case 'learn': return { page: 'learn', id: a, sec: b }
    case 'library': return { page: 'library', id: a, n: b ? Number(b) || undefined : undefined }
    default: return { page: 'home' }
  }
}

const TABS: { page: Route['page']; href: string; label: string; icon: typeof IconBook }[] = [
  { page: 'home', href: '#/', label: 'Home', icon: IconBook },
  { page: 'learn', href: '#/learn', label: 'Learn', icon: IconSlides },
  { page: 'practice', href: '#/latihan', label: 'Practice', icon: IconPencil },
  { page: 'problems', href: '#/problems', label: 'Problems', icon: IconLayers },
  { page: 'past', href: '#/soal-lalu', label: 'Past papers', icon: IconChecklist },
  { page: 'mock', href: '#/ujian', label: 'Mock exam', icon: IconTimer },
  { page: 'cards', href: '#/kartu', label: 'Flashcards', icon: IconCards },
  { page: 'library', href: '#/library', label: 'Library', icon: IconPanels },
  { page: 'syntax', href: '#/sintaks', label: 'Syntax', icon: IconSlides },
  { page: 'sandbox', href: '#/sandbox', label: 'Playground', icon: IconSparkles },
  { page: 'progress', href: '#/progres', label: 'Progress', icon: IconChart },
]

export default function App() {
  const [route, setRoute] = useState<Route>(() => parse(location.hash))
  useEffect(() => {
    const f = () => setRoute(parse(location.hash))
    window.addEventListener('hashchange', f)
    fetch('pages/index.json').then((r) => r.json()).then((j: Record<string, number>) => Object.assign(PAGE_COUNT, j)).catch(() => {})
    return () => window.removeEventListener('hashchange', f)
  }, [])
  const [page, setPage] = useState<PageRef | null>(null)
  const openPage = useCallback((r: PageRef) => setPage(r), [])
  const dev = route.page === 'bank'
  return (
    <PageCtx.Provider value={openPage}>
      <div className="shell">
        <nav className="topnav no-print">
          <a className="logo" href="#/"><AppIcon size={30} tint="#0a84ff"><IconSparkles size={18} /></AppIcon>WI1102 <span>UTS Computational Thinking</span></a>
          <div className="tabs">
            {TABS.map((t) => <a key={t.page} className={route.page === t.page ? 'on' : ''} href={t.href} title={t.label}><t.icon size={16} /><span className="lbl">{t.label}</span></a>)}
            <a className={dev ? 'on' : ''} href="#/bank" title="Dev"><IconGrid size={16} /><span className="lbl">Dev</span></a>
          </div>
          <span className="nav-gap" />
        </nav>
        <main className="main"><Suspense fallback={<div className="page-loading" aria-label="Loading"><i /><i /><i /></div>}>
          {route.page === 'home' && <div className="pr-fill"><Home /></div>}
          {route.page === 'practice' && <div className="pr-fill"><Practice /></div>}
          {route.page === 'past' && <div className="pr-fill"><Past arg={route.id} /></div>}
          {route.page === 'mock' && <div className="pr-fill"><Mock /></div>}
          {route.page === 'cards' && <div className="pr-fill"><Cards /></div>}
          {route.page === 'syntax' && <Syntax id={route.id} />}
          {route.page === 'problems' && <div className="pr-fill"><Problems id={route.id} /></div>}
          {route.page === 'progress' && <div className="pr-fill"><Progress /></div>}
          {route.page === 'bank' && <BankBrowser id={route.id} />}
          {route.page === 'sandbox' && <Sandbox />}
          {route.page === 'learn' && <Learn key={route.id ?? ''} deck={route.id} section={route.sec} />}
          {route.page === 'library' && <Library key={route.id ?? ''} src={route.id} page={route.n} />}
        </Suspense></main>
      </div>
      <PageLightbox at={page} onClose={() => setPage(null)} onNav={(n) => setPage((s) => (s ? { ...s, page: n } : s))} />
    </PageCtx.Provider>
  )
}
