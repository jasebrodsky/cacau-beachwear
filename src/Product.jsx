import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getPrevNext, getProduct, getRelated } from './data'
import { Photo, Reveal, useDocumentTitle, Pt } from './ui'

export default function Product() {
  const { id } = useParams()
  const product = getProduct(id)
  const [active, setActive] = useState(0)

  useDocumentTitle(
    product ? `${product.name} — CACAU Beachwear · moda praia` : 'CACAU Beachwear',
  )

  useEffect(() => {
    setActive(0)
  }, [id])

  if (!product) return <Navigate to="/" replace />

  const { prev, next } = getPrevNext(product.id)
  const related = getRelated(product.id)
  const current = product.images[active] || product.images[0]

  return (
    <main className="product-page">
      <div className="product-page-inner">
        <nav className="product-crumb" aria-label="Breadcrumb">
          <Link to={{ pathname: '/', hash: '#collection' }} lang="pt-BR">
            A Coleção
          </Link>
          <span aria-hidden="true"> / </span>
          <span>{product.name}</span>
        </nav>

        <div className="pdp-grid">
          <div className="pdp-gallery">
            <div className="pdp-main">
              <Photo
                key={current.name}
                name={current.name}
                alt={current.alt}
                className="pdp-main-image"
                sizes="(min-width: 980px) 52vw, 100vw"
                widths={[800, 1400, 2000]}
                eager
                objectPos={current.objectPos}
              />
            </div>
            {product.images.length > 1 && (
              <div className="pdp-thumbs" role="tablist" aria-label="Gallery">
                {product.images.map((image, index) => (
                  <button
                    key={image.name}
                    type="button"
                    role="tab"
                    aria-selected={index === active}
                    aria-label={image.alt}
                    className={`pdp-thumb${index === active ? ' is-active' : ''}`}
                    onClick={() => setActive(index)}
                  >
                    <Photo
                      name={image.name}
                      alt=""
                      sizes="120px"
                      widths={[800]}
                      objectPos={image.objectPos}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="pdp-info">
            <p className="eyebrow" lang="pt-BR">Coleção Conceito — Verão 01</p>
            <h1>{product.name}</h1>
            <p className="pdp-price">
              <span className="sr-only">Indicative price </span>${product.price}
            </p>
            <p className="pdp-note" lang="pt-BR">Peça conceito — ainda não disponível</p>
            <p className="pdp-description">{product.description}</p>
            <dl className="pdp-details">
              <div>
                <dt lang="pt-BR">Cor</dt>
                <dd>{product.colorway}</dd>
              </div>
              <div>
                <dt lang="pt-BR">Tecido</dt>
                <dd>{product.fabric}</dd>
              </div>
              <div>
                <dt lang="pt-BR">Forro</dt>
                <dd>{product.lining}</dd>
              </div>
              <div>
                <dt lang="pt-BR">Caimento</dt>
                <dd>{product.fit}</dd>
              </div>
              <div>
                <dt lang="pt-BR">Cobertura</dt>
                <dd>{product.coverage}</dd>
              </div>
              <div>
                <dt lang="pt-BR">Cuidados</dt>
                <dd>{product.care}</dd>
              </div>
            </dl>
            <p className="pdp-origin">
              <Pt>Feito no Rio.</Pt> Designed in Rio de Janeiro.
            </p>
            <nav className="pdp-nav" aria-label="Other pieces">
              {prev && (
                <Link className="pdp-adjacent" to={`/product/${prev.id}`}>
                  <span className="pdp-adj-label" lang="pt-BR">Anterior</span>
                  <span className="pdp-adj-name">{prev.name}</span>
                </Link>
              )}
              {next && (
                <Link className="pdp-adjacent pdp-next" to={`/product/${next.id}`}>
                  <span className="pdp-adj-label" lang="pt-BR">Próxima</span>
                  <span className="pdp-adj-name">{next.name}</span>
                </Link>
              )}
            </nav>
            <Link className="pdp-back" to={{ pathname: '/', hash: '#collection' }} lang="pt-BR">
              Voltar à coleção
            </Link>
          </div>
        </div>

        {related.length > 0 && (
          <section className="pdp-related" aria-labelledby="related-heading">
            <h2 id="related-heading" className="related-heading" lang="pt-BR">
              Você também vai gostar
            </h2>
            <div className="related-grid">
              {related.map((item) => (
                <Reveal as="article" className="product related-item" key={item.id}>
                  <Link className="product-link" to={`/product/${item.id}`}>
                    <div className="product-media">
                      <Photo
                        name={item.images[0].name}
                        alt={item.images[0].alt}
                        sizes="(min-width: 900px) 30vw, 100vw"
                        widths={[800, 1400]}
                      />
                    </div>
                    <div className="product-meta">
                      <h3>{item.name}</h3>
                      <p lang="pt-BR">{item.detail}</p>
                      <p className="price">
                        <span className="sr-only">Indicative price </span>${item.price}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
