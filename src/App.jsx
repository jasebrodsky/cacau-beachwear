import { useEffect, useRef, useState } from 'react'

const asset = (path) => `${import.meta.env.BASE_URL}${path}`

const products = [
  {
    id: 'ipanema',
    name: 'Ipanema One Piece',
    detail: 'Espresso maillot. High neck, a clean, uninterrupted line.',
    price: 108,
    image: 'product-ipanema',
    alt: 'A woman seated in shallow water wears a sleeveless espresso one-piece, with sunlit cliffs behind her.',
    layout: 'feature',
  },
  {
    id: 'copacabana',
    name: 'Copacabana Bikini',
    detail: 'Terracotta. Soft-tie back, a quiet sunlit knit.',
    price: 86,
    image: 'product-copacabana',
    alt: 'A woman seen from behind sits on driftwood in a terracotta bikini, looking out to a calm sea.',
    layout: 'offset',
  },
  {
    id: 'arpoador',
    name: 'Arpoador Top',
    detail: 'Areia. Soft ruched front, thin straps.',
    price: 75,
    image: 'product-arpoador',
    alt: 'A smiling woman in a gathered sand-colored bikini top, photographed against warm stone.',
    layout: 'standard',
  },
  {
    id: 'leblon',
    name: 'Leblon Bottom',
    detail: 'Oliva. High-cut brief, an unadorned line.',
    price: 78,
    image: 'product-leblon',
    alt: 'A woman stands in the foam at a rocky shore, wearing olive bikini bottoms and a dark top.',
    layout: 'standard',
  },
  {
    id: 'mare',
    name: 'Maré One Piece',
    detail: 'The namesake cut. Sleeveless espresso, sculpted through the body.',
    price: 110,
    image: 'product-mare',
    alt: 'A woman in a sculpted espresso one-piece leans against a sunlit rock wall, smiling in profile.',
    layout: 'standard',
  },
  {
    id: 'sol',
    name: 'Sol Bikini',
    detail: 'Oliva halter, worn with an open-weave cover in late light.',
    price: 92,
    image: 'product-sol',
    alt: 'A woman at golden hour wears an olive halter bikini and a loose, open-weave cover by the sea.',
    layout: 'standard',
  },
]

const rioImages = [
  {
    image: 'rio-calcadao',
    caption: 'Copacabana',
    alt: 'Aerial view of Copacabana’s black-and-white wave-pattern promenade between the beach and the avenue.',
    shape: 'wide',
  },
  {
    image: 'rio-ipanema',
    caption: 'Ipanema',
    alt: 'Looking across turquoise water from the rocks of Arpoador toward Ipanema and the Dois Irmãos mountains.',
    shape: 'tall',
  },
  {
    image: 'rio-copacabana-dusk',
    caption: 'Leme',
    alt: 'People on a seaside promenade at dusk, with Sugarloaf Mountain rising through golden haze.',
    shape: 'tall',
  },
  {
    image: 'rio-architecture',
    caption: 'Centro',
    alt: 'A modernist canopy frames colonial rooftops, a dome, and Guanabara Bay in central Rio de Janeiro.',
    shape: 'mid',
  },
  {
    image: 'rio-pao-de-acucar',
    caption: 'Pão de Açúcar',
    alt: 'Sugarloaf Mountain rising from the water, forested slopes and a quiet beach under a pale sky.',
    shape: 'mid',
  },
  {
    image: 'rio-niteroi',
    caption: 'Niterói',
    alt: 'A white chapel on a wooded cliff, with Oscar Niemeyer’s contemporary art museum visible below.',
    shape: 'mid',
  },
]

const credits = [
  { name: 'Gritzky', work: 'Arpoador sunset', url: 'https://www.pexels.com/photo/sunset-at-arpoador-beach-rio-de-janeiro-36014257/' },
  { name: 'Mak Cézar', work: 'Ipanema from Arpoador', url: 'https://www.pexels.com/photo/scenic-view-of-ipanema-beach-from-arpoador-rocks-29894755/' },
  { name: 'Rodrigo Menezes', work: 'Niterói', url: 'https://www.pexels.com/photo/contemporary-art-museum-and-christ-the-redeemer-church-in-niteroi-rio-de-janeiro-brazil-18008981/' },
  { name: 'RDNE Stock Project', work: 'Ipanema, Arpoador and Maré pieces', url: 'https://www.pexels.com/photo/woman-in-brown-bathing-suit-posing-at-the-beach-8759822/' },
  { name: 'Karolina Grabowska / Kaboompics', work: 'Copacabana Bikini', url: 'https://www.pexels.com/photo/woman-in-brown-bikini-standing-on-beach-8363695/' },
  { name: 'Mehmet Demir', work: 'Leblon Bottom', url: 'https://www.pexels.com/photo/a-woman-in-a-green-bikini-standing-on-the-beach-27239028/' },
  { name: 'Çağrı Kanmaz', work: 'Sol Bikini', url: 'https://www.pexels.com/photo/elegant-woman-in-boho-chic-on-sunset-beach-32991732/' },
  { name: 'Photographers via Pexels', work: 'Rio coastline and architecture', url: 'https://www.pexels.com/' },
]

const navLinks = [
  { href: '#collection', label: 'The Collection' },
  { href: '#story', label: 'Our Story' },
  { href: '#rio', label: 'Rio' },
]

function Photo({
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

function Reveal({ as: Tag = 'div', className = '', delay = 0, children }) {
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

export default function App() {
  const [navSolid, setNavSolid] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    const io = new IntersectionObserver(
      ([entry]) => setNavSolid(!entry.isIntersecting),
      { threshold: 0, rootMargin: '-56px 0px 0px 0px' },
    )
    io.observe(hero)
    return () => io.disconnect()
  }, [])

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
      <a className="skip-link" href="#collection">
        Skip to collection
      </a>

      <header className={`site-header${navSolid || menuOpen ? ' is-solid' : ''}${menuOpen ? ' is-open' : ''}`}>
        <div className="header-inner">
          <a className="wordmark" href="#top" onClick={closeMenu}>
            <span className="wordmark-name">CACAU</span>
            <span className="wordmark-sub">Beachwear</span>
          </a>
          <nav className="nav-desktop" aria-label="Primary">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
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
              <a key={link.href} href={link.href} onClick={closeMenu}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="top" ref={heroRef} aria-label="Introduction">
          <Photo
            name="hero-arpoador"
            alt="Sunset over Arpoador, with Dois Irmãos in silhouette and swimmers in the water."
            className="hero-image"
            sizes="100vw"
            widths={[800, 1400, 2000]}
            eager
            objectPos="center 42%"
          />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-content">
            <p className="eyebrow">Brazilian beachwear concept</p>
            <h1>
              A little more Rio.
              <span>A little less ordinary.</span>
            </h1>
            <p className="hero-lede">
              Swimwear shaped by the rhythm, color, and effortless spirit of Brazil.
            </p>
            <a className="discover" href="#collection">
              Discover the Collection
              <span className="discover-line" aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="collection" id="collection">
          <div className="section-intro">
            <Reveal as="p" className="eyebrow">
              Concept Collection — Summer 01
            </Reveal>
            <Reveal as="h2" delay={80}>
              Cut for the water.
              <em> Colored by the coast.</em>
            </Reveal>
            <Reveal as="p" className="intro-note" delay={140}>
              Conceptual pieces. Not yet available.
            </Reveal>
          </div>

          <div className="product-grid">
            {products.map((product, index) => (
              <Reveal
                as="article"
                className={`product product-${product.id}`}
                delay={index * 60}
                key={product.id}
              >
                <div className="product-media">
                  <Photo
                    name={product.image}
                    alt={product.alt}
                    sizes="(min-width: 900px) 45vw, 100vw"
                    widths={[800, 1400, 2000]}
                  />
                </div>
                <div className="product-meta">
                  <h3>{product.name}</h3>
                  <p>{product.detail}</p>
                  <p className="price">
                    <span className="sr-only">Indicative price </span>
                    ${product.price}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="story" id="story">
          <div className="story-grid">
            <div className="story-copy">
              <Reveal as="p" className="eyebrow">
                Our Story
              </Reveal>
              <Reveal as="h2" delay={80}>
                Born from the rhythm of Rio.
              </Reveal>
              <Reveal as="p" className="story-lede" delay={140}>
                Cacau takes its inspiration from the places where the city meets the sea.
                From long afternoons on Ipanema to the quiet beauty of the coastline,
                we’re building a beachwear brand that captures the feeling of being there.
              </Reveal>
              <Reveal as="div" className="pillars" delay={200}>
                <div>
                  <p className="pillar-label">The cut</p>
                  <p>Sculpted, not scant. Made to move from the sand to the table, and to be kept for years.</p>
                </div>
                <div>
                  <p className="pillar-label">The colour</p>
                  <p>Taken from late light on the water, wet sand, and the stone of Arpoador.</p>
                </div>
              </Reveal>
            </div>
            <Reveal className="story-media" delay={100}>
              <Photo
                name="story-cliff"
                alt="A sun-faded terracotta cliff beside still water, with Sugarloaf Mountain faint in the distance."
                className="story-image"
                sizes="(min-width: 900px) 50vw, 100vw"
                widths={[800, 1400, 2000]}
                objectPos="center 40%"
              />
              <p className="media-caption">The coastline, looking toward Pão de Açúcar.</p>
            </Reveal>
          </div>
        </section>

        <section className="rio" id="rio">
          <div className="section-intro rio-intro">
            <Reveal as="p" className="eyebrow">
              Rio de Janeiro
            </Reveal>
            <Reveal as="h2" delay={80}>
              Inspired by a place.
              <em> Made for everywhere.</em>
            </Reveal>
            <Reveal as="p" className="intro-note" delay={140}>
              A city of stone, water, and late light — not a souvenir, a source.
            </Reveal>
          </div>
          <div className="rio-mosaic">
            {rioImages.map((item, index) => (
              <Reveal
                as="figure"
                className={`rio-item rio-${item.shape} ${item.image}`}
                delay={index * 50}
                key={item.image}
              >
                <Photo
                  name={item.image}
                  alt={item.alt}
                  sizes={item.shape === 'wide' ? '(min-width: 900px) 66vw, 100vw' : '(min-width: 900px) 33vw, 100vw'}
                  widths={item.shape === 'wide' ? [800, 1400, 2000] : [800, 1400]}
                />
                <figcaption>{item.caption}</figcaption>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer" id="credits">
        <div className="footer-top">
          <a className="wordmark" href="#top">
            <span className="wordmark-name">CACAU</span>
            <span className="wordmark-sub">Beachwear</span>
          </a>
          <p className="footer-tag">A Brazilian beachwear concept.</p>
        </div>
        <div className="footer-meta">
          <p>
            <span className="footer-label">Instagram</span>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              Coming soon
            </a>
          </p>
          <p>
            <span className="footer-label">Enquiries</span>
            <span>hello@cacaubeachwear.com</span>
          </p>
          <p>
            <span className="footer-label">Note</span>
            <span>A visual concept. Pieces are not for sale.</span>
          </p>
        </div>
        <div className="footer-bottom">
          <p className="copyright">© 2026 CACAU</p>
          <details className="credits">
            <summary>Photography credits</summary>
            <ul>
              {credits.map((credit) => (
                <li key={credit.url + credit.name}>
                  <a href={credit.url} target="_blank" rel="noopener noreferrer">
                    {credit.name}
                  </a>
                  <span> — {credit.work}</span>
                </li>
              ))}
            </ul>
            <p className="credits-note">
              All photographs are used under the Pexels license, which allows free commercial use. Self-hosted and credited here with thanks.
            </p>
          </details>
        </div>
      </footer>
    </>
  )
}
