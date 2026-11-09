import { useState } from 'react'
import {
  CATEGORY_BLURBS,
  formatPriceRange,
  SERVICE_CATEGORIES,
  SERVICES,
  type Service,
  type ServiceCategory,
} from '../data/clinic'
import { ArrowRightIcon, ChevronLeftIcon, DrillIcon, ShieldIcon, SparkleIcon, ChildIcon } from './Icons'
import { Reveal } from './Reveal'

const GROUP_ICON = {
  Preventive: ShieldIcon,
  Restorative: DrillIcon,
  Cosmetic: SparkleIcon,
  Kids: ChildIcon,
} as const

interface ServicesProps {
  onBook: (service: Service) => void
}

export function Services({ onBook }: ServicesProps) {
  const [collapsed, setCollapsed] = useState<Record<ServiceCategory, boolean>>({
    Preventive: false,
    Restorative: false,
    Cosmetic: false,
    Kids: false,
  })

  const toggle = (cat: ServiceCategory) => setCollapsed((c) => ({ ...c, [cat]: !c[cat] }))

  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="container">
        <Reveal>
          <div className="section__head section__head--center">
            <span className="eyebrow">Services &amp; price ranges</span>
            <h2 id="services-title" className="h2">
              Prevent first, restore when needed, <span className="italic-accent">smile always</span>
            </h2>
            <p className="lede">
              Every service is grouped by what it does for you and listed with a peso price range.
              Your exact quote is confirmed at your consultation.
            </p>
          </div>
        </Reveal>

        <div className="groups">
          {SERVICE_CATEGORIES.map((cat, gi) => {
            const items = SERVICES.filter((s) => s.category === cat)
            const Icon = GROUP_ICON[cat]
            const open = !collapsed[cat]
            const listId = `group-${cat.toLowerCase()}`
            return (
              <Reveal key={cat} delay={gi * 60}>
                <section className="group" aria-labelledby={`${listId}-title`}>
                  <button
                    type="button"
                    className="group__head"
                    aria-expanded={open}
                    aria-controls={listId}
                    onClick={() => toggle(cat)}
                  >
                    <span className="group__icon" aria-hidden="true">
                      <Icon />
                    </span>
                    <span className="group__title">
                      <span id={`${listId}-title`} className="group__name">
                        {cat}
                      </span>
                      <span className="group__blurb">{CATEGORY_BLURBS[cat]}</span>
                    </span>
                    <span className="group__count">
                      {items.length} {items.length === 1 ? 'service' : 'services'}
                    </span>
                    <ChevronLeftIcon className="group__chev" style={{ transform: open ? 'rotate(-90deg)' : 'rotate(0deg)' }} />
                  </button>
                  {open ? (
                    <ul id={listId} className="group__list">
                      {items.map((service, i) => (
                        <li key={service.id}>
                          <article className="service" style={{ animationDelay: `${i * 40}ms` }}>
                            <div>
                              <h3 className="service__name">
                                {service.name}
                                {service.popular ? <span className="service__badge">Popular</span> : null}
                              </h3>
                              <p className="service__desc">{service.description}</p>
                            </div>
                            <div className="price">
                              <span className="price__value">{formatPriceRange(service)}</span>
                              {service.priceUnit ? <span className="price__unit">{service.priceUnit}</span> : null}
                              <span className="price__dur">≈ {service.durationMinutes} min</span>
                            </div>
                            <button
                              type="button"
                              className="btn btn--ghost btn--sm"
                              onClick={() => onBook(service)}
                              aria-label={`Book ${service.name}`}
                            >
                              Book
                              <ArrowRightIcon className="btn__icon" />
                            </button>
                          </article>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              </Reveal>
            )
          })}
        </div>

        <p className="services__note">
          Ranges are in Philippine pesos (₱) and cover typical cases; complex cases are quoted
          individually.
        </p>
      </div>
    </section>
  )
}
