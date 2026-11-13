import { useEffect, useRef, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { credits, navLinks } from './data'

export const asset = (path) => `${import.meta.env.BASE_URL}${path}`

export function Pt({ as: Tag = 'span', className, children, ...rest }) {
  return (
    <Tag lang="pt-BR" className={className} {...rest}>
      {children}
    </Tag>
  )
}

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title
    return () => {
      document.title = 'CACAU Beachwear — A little more Rio. A little less ordinary.'
    }
  }, [title])
}

export function Photo({
  name,
  alt,
  widths = [800, 1400, 2000],
  sizes,
  className,
  eager = false,
  objectPos,
}) {
  const srcSet = widths.map((w) => `${asset(`images/${name}-${w}.webp`)} ${w}w`).join(', ')
  return (
    <img
      className={className}
      src={asset(`images/${name}-1400.webp`)}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : 'auto'}
      style={objectPos ? { objectPosition: objectPos } : undefined}
    />
  )
}

export function Reveal({ as: Tag = 'div', className = '', delay = 0, children }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? ' is-in' : ''}${className ? ` ${className}` : ''}`}
      style={{ '--delay': `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

function Wordmark({ onClick, className = '' }) {
  return (
    <Link className={`wordmark${className ? ` ${className}` : ''}`} to="/" onClick={onClick}>
      <span className="wordmark-name">CACAU</span>
      <span className="wordmark-sub">Beachwear</span>
    </Link>
  )
}

export function Layout() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [navSolid, setNavSolid] = useState(!isHome)
  const [menuOpen, setMenuOpen] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    setMenuOpen(false)
    if (!isHome) {
      setNavSolid(true)
      if (!location.hash) window.scrollTo(0, 0)
    }
  }, [location.pathname, isHome, location.hash])

  useEffect(() => {
    if (!isHome) return undefined
    const hero = document.getElementById('top')
    if (!hero) return undefined
    const io = new IntersectionObserver(
      ([entry]) => setNavSolid(!entry.isIntersecting),
      { threshold: 0, rootMargin: '-56px 0px 0px 0px' },
    )
    io.observe(hero)
    return () => io.disconnect()
  }, [isHome, location.pathname])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <Link className="skip-link" to={{ pathname: '/', hash: '#collection' }} lang="pt-BR">
        Ir para a coleção
      </Link>

      <header className={`site-header${navSolid || menuOpen ? ' is-solid' : ''}${menuOpen ? ' is-open' : ''}`}>
        <div className="header-inner">
          <Wordmark onClick={closeMenu} />
          <nav className="nav-desktop" aria-label="Primary">
            {navLinks.map((link) => (
              <Link key={link.label} to={link.to} onClick={closeMenu} lang={link.lang}>
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
            <span className="menu-line" aria-hidden="true" />
            <span className="menu-line" aria-hidden="true" />
          </button>
        </div>
        <div className="mobile-panel" id="mobile-menu" hidden={!menuOpen}>
          <nav className="nav-mobile" aria-label="Primary">
            {navLinks.map((link) => (
              <Link key={link.label} to={link.to} onClick={closeMenu} lang={link.lang}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <Outlet context={{ heroRef }} />

      <footer className="site-footer" id="credits">
        <div className="footer-top">
          <Wordmark />
          <p className="footer-tag" lang="pt-BR">Um conceito de moda praia brasileira.</p>
        </div>
        <div className="footer-meta">
          <p>
            <span className="footer-label">Instagram</span>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" lang="pt-BR">
              Em breve
            </a>
          </p>
          <p>
            <span className="footer-label" lang="pt-BR">Fale com a gente</span>
            <span>hello@cacaubeachwear.com</span>
          </p>
          <p>
            <span className="footer-label" lang="pt-BR">Nota</span>
            <span lang="pt-BR">Um conceito visual. Peças ainda não à venda.</span>
          </p>
        </div>
        <div className="footer-bottom">
          <p className="copyright">© 2026 CACAU</p>
          <details className="credits">
            <summary lang="pt-BR">Fotografia</summary>
            <ul>
              {credits.map((credit) => (
                <li key={credit.url + credit.name}>
                  {credit.url ? (
                    <a href={credit.url} target="_blank" rel="noopener noreferrer">
                      {credit.name}
                    </a>
                  ) : (
                    <span>{credit.name}</span>
                  )}
                  <span> — {credit.work}</span>
                </li>
              ))}
            </ul>
            <p className="credits-note" lang="pt-BR">
              Imagens de acervo sob licença Pexels, de uso comercial livre, hospedadas aqui com agradecimento.
            </p>
          </details>
        </div>
      </footer>
    </>
  )
}

export function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = hash.replace('#', '')
    const preferReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const t = window.setTimeout(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: preferReduced ? 'auto' : 'smooth', block: 'start' })
    }, 50)
    return () => window.clearTimeout(t)
  }, [pathname, hash])

  return null
}

