import { Link, useOutletContext } from 'react-router-dom'
import { products, rioImages } from './data'
import { Photo, Reveal, useDocumentTitle, Pt } from './ui'

export default function Home() {
  useDocumentTitle('CACAU Beachwear — A little more Rio. A little less ordinary.')
  const { heroRef } = useOutletContext() || {}
  return (
    <main>
      <section className="hero" id="top" ref={heroRef} aria-label="Introduction">
        <div className="hero-media">
          <Photo
            name="hero-ipanema"
            alt="Ipanema Beach at midday, seen from the rocks of Arpoador: turquoise water, white sand, and Dois Irmãos under a clear blue sky."
            className="hero-image"
            sizes="100vw"
            widths={[800, 1400, 2000]}
            eager
            objectPos="center 58%"
          />
        </div>
        <div className="hero-content">
          <p className="eyebrow" lang="pt-BR">Moda praia brasileira</p>
          <h1>
            A little more Rio.
            <span>A little less ordinary.</span>
          </h1>
          <p className="hero-lede">
            Swimwear shaped by the rhythm, color, and effortless spirit of Brazil.
          </p>
          <Link className="discover" to={{ pathname: '/', hash: '#collection' }} lang="pt-BR">
            Descubra a coleção
            <span className="discover-line" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 2 }, (_, loop) => (
            <p className="marquee-group" key={loop}>
              <span lang="pt-BR">Moda praia</span>
              <span lang="pt-BR">Feito no Rio</span>
              <span lang="pt-BR">Sol, sal &amp; Cacau</span>
              <span>A little more Rio</span>
              <span lang="pt-BR">Coleção Verão 01</span>
              <span lang="pt-BR">Nascida do ritmo do Rio</span>
              <span>Cut for the water</span>
              <span>Colored by the coast</span>
            </p>
          ))}
        </div>
      </div>

      <section className="collection" id="collection">
        <div className="section-intro">
          <Reveal as="p" className="eyebrow">
            <Pt>Coleção Conceito — Verão 01</Pt>
          </Reveal>
          <Reveal as="h2" delay={80}>
            Cut for the water.
            <em> Colored by the coast.</em>
          </Reveal>
          <Reveal as="p" className="intro-note" delay={140}>
            <Pt>Peças conceito — ainda não disponíveis.</Pt>
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
              <Link className="product-link" to={`/product/${product.id}`}>
                <div className="product-media">
                  <Photo
                    name={product.images[0].name}
                    alt={product.images[0].alt}
                    sizes="(min-width: 900px) 45vw, 100vw"
                    widths={[800, 1400, 2000]}
                  />
                </div>
                <div className="product-meta">
                  <h3>{product.name}</h3>
                  <p lang="pt-BR">{product.detail}</p>
                  <p className="price">
                    <span className="sr-only">Indicative price </span>
                    ${product.price}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="story" id="story">
        <div className="story-grid">
          <div className="story-copy">
            <Reveal as="p" className="eyebrow">
              <Pt>Nossa História</Pt>
            </Reveal>
            <Reveal as="h2" className="headline-pair" delay={80}>
              <Pt>Nascida do ritmo do Rio.</Pt>
              <em>Born from the rhythm of Rio.</em>
            </Reveal>
            <Reveal as="p" className="story-lede" delay={140}>
              Cacau takes its inspiration from the places where the city meets the sea.
              From long afternoons on Ipanema to the quiet beauty of the coastline,
              we’re building a beachwear brand that captures the feeling of being there.
            </Reveal>
            <Reveal as="div" className="pillars" delay={200}>
              <div>
                <p className="pillar-label" lang="pt-BR">O corte</p>
                <p>Sculpted, not scant. Made to move from the sand to the table, and to be kept for years.</p>
              </div>
              <div>
                <p className="pillar-label" lang="pt-BR">A cor</p>
                <p>Taken from late light on the water, wet sand, and the stone of Arpoador.</p>
              </div>
            </Reveal>
          </div>
          <Reveal className="story-media" delay={100}>
            <Photo
              name="story-ipanema"
              alt="Ipanema Beach on a clear sunny day, with colorful umbrellas, white sand, turquoise water, and Dois Irmãos in the distance."
              className="story-image"
              sizes="(min-width: 900px) 50vw, 100vw"
              widths={[800, 1400, 2000]}
              objectPos="center 42%"
            />
            <p className="media-caption" lang="pt-BR">Ipanema, um dia de sol.</p>
          </Reveal>
        </div>
      </section>

      <section className="founder" id="founder">
        <div className="founder-grid founder-grid-text">
          <Reveal className="founder-media founder-mark" aria-hidden="true">
            <p className="founder-wordmark" lang="pt-BR">Raffa</p>
            <p className="media-caption">Recreio dos Bandeirantes, Rio de Janeiro.</p>
          </Reveal>
          <div className="founder-copy">
            <Reveal as="p" className="eyebrow">
              <Pt>A Fundadora</Pt>
            </Reveal>
            <Reveal as="h2" className="headline-pair" delay={80}>
              Designed by Raffa Sanches
              <em lang="pt-BR">Fundadora e diretora criativa.</em>
            </Reveal>
            <Reveal as="div" className="founder-body" delay={140}>
              <p>
                <Pt>Raffaela “Raffa” Sanches é a fundadora e diretora criativa da CACAU,</Pt>
                {' '}based in Recreio dos Bandeirantes, Rio de Janeiro.
              </p>
              <p>
                She trained in Fashion Design at SENAI CETIQT, <Pt>no Rio</Pt>. Her graduation project, Dominando Formas, explored engineered prints.
              </p>
              <p>
                <Pt>Como estilista da marca carioca Peepou,</Pt> she creates collections, prints and garments. She also co-created JOMO, a line of <Pt>moda praia</Pt> that began as a college project and launched years later.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="rio" id="rio">
        <div className="section-intro rio-intro">
          <Reveal as="p" className="eyebrow">
            Rio de Janeiro
          </Reveal>
          <Reveal as="h2" className="headline-pair" delay={80}>
            Inspired by a place.
            <em> Made for everywhere.</em>
            <span className="headline-pt" lang="pt-BR">Inspirada num lugar. Feita para qualquer lugar.</span>
          </Reveal>
          <Reveal as="p" className="intro-note" delay={140}>
            <Pt>Não é souvenir. É origem.</Pt>
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
  )
}
