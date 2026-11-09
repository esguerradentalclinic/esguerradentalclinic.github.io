import { useMemo } from 'react'
import { BREAK_NOTE, CLINIC, WEEKLY_HOURS } from '../data/clinic'
import portraitUrl from '../assets/doctor-portrait.jpg'
import { useNow } from '../hooks/useNow'
import {
  formatMinutes,
  getOpenStatus,
  getZonedParts,
  minutesOfDay,
  MONTH_NAMES,
  WEEKDAY_NAMES,
  WEEKDAY_SHORT,
  type Weekday,
} from '../lib/time'
import { scrollToSection } from '../lib/scroll'
import { ArrowRightIcon, PhoneIcon } from './Icons'
import { Reveal } from './Reveal'

const DAY_ORDER: Weekday[] = [1, 2, 3, 4, 5, 6, 0]

/** The weekly chart spans 7:00 AM to 8:00 PM. */
const AXIS_START = 7 * 60
const AXIS_END = 20 * 60
const TICKS = [8, 10, 12, 14, 16, 18, 20].map((h) => h * 60)

const pct = (minutes: number): number =>
  Math.max(0, Math.min(100, ((minutes - AXIS_START) / (AXIS_END - AXIS_START)) * 100))

/** DEMO: presentation-only trust figures. */
const STATS = [
  { value: '6+', label: 'Years in Bangkok' },
  { value: '4.9★', label: 'Patient rating' },
  { value: '3,800+', label: 'Smiles cared for' },
] as const

export function Hero() {
  const now = useNow(15_000)
  const parts = useMemo(() => getZonedParts(now, CLINIC.timeZone), [now])
  const status = useMemo(() => getOpenStatus(parts, WEEKLY_HOURS), [parts])
  const nowMin = minutesOfDay(parts)
  const clock = formatMinutes(nowMin)
  const dateLabel = `${WEEKDAY_NAMES[parts.weekday]}, ${MONTH_NAMES[parts.month - 1]} ${parts.day}`

  return (
    <section id="home" className="hero" aria-labelledby="home-title">
      <div className="hero__bg" aria-hidden="true">
        <div className="ribbon ribbon--1" />
        <div className="ribbon ribbon--3" />
        <div className="ribbon ribbon--2" />
      </div>

      <div className="container">
        <div className="hero__grid">
          <div>
            <Reveal>
              <div className={`status status--${status.state}`} role="status" aria-live="polite">
                <span className="status__dot" aria-hidden="true" />
                <span>{status.headline}</span>
                <span className="status__detail">· {status.detail}</span>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 id="home-title" className="h1 hero__title">
                <span className="word">Prevent.</span>
                <span className="word">Restore.</span>
                <span className="word word--gold">Smile.</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="lede">
                {CLINIC.name} is a general dentistry practice in {CLINIC.address}, led by Dr.{' '}
                {CLINIC.doctor.fullName}, {CLINIC.doctor.title}. {CLINIC.motto}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="hero__actions">
                <button type="button" className="btn btn--violet" onClick={() => scrollToSection('appointment')}>
                  Book an appointment
                  <ArrowRightIcon className="btn__icon" />
                </button>
                <a className="btn btn--ghost" href={CLINIC.contact.phoneHref}>
                  <PhoneIcon className="btn__icon" />
                  {CLINIC.contact.phoneDisplay}
                </a>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <dl className="hero__trust">
                {STATS.map((s) => (
                  <div key={s.label} className="stat">
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="stat__value" style={{ margin: 0 }}>
                      {s.value}
                    </dd>
                    <dd className="stat__label" style={{ margin: 0 }}>
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="portrait">
              <img
                className="portrait__img"
                src={portraitUrl}
                width={640}
                height={800}
                alt={`Portrait of Dr. ${CLINIC.doctor.fullName}, ${CLINIC.doctor.title}`}
                decoding="async"
              />
              <div className="portrait__tag">
                <strong>Dr. {CLINIC.doctor.fullName}</strong>
                <span>{CLINIC.doctor.role}</span>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <article className="chart-wrap" aria-labelledby="avail-title">
            <div>
              <div className="chart__label">Clinic availability</div>
              <h2 id="avail-title" className="chart__status">
                {status.headline}
              </h2>
              <p className="chart__detail">{status.detail}</p>
              <div className="chart__clock" aria-live="off">
                <div className="chart__time">{clock}</div>
                <div className="chart__date">{dateLabel} · Bangkok time</div>
              </div>
              <p className="chart__note">{BREAK_NOTE}. Sundays closed.</p>
            </div>

            <div className="chart" role="table" aria-label="Weekly opening hours">
              <div className="chart__axis" aria-hidden="true">
                <span />
                <div className="chart__ticks">
                  {TICKS.map((t) => (
                    <span key={t} className="chart__tick" style={{ left: `${pct(t)}%` }}>
                      {formatMinutes(t).replace(':00', '')}
                    </span>
                  ))}
                </div>
              </div>
              {DAY_ORDER.map((day) => {
                const hours = WEEKLY_HOURS[day]
                const isToday = day === parts.weekday
                const label = hours
                  ? `${WEEKDAY_NAMES[day]}: ${formatMinutes(hours.open)} to ${formatMinutes(hours.close)}`
                  : `${WEEKDAY_NAMES[day]}: closed`
                return (
                  <div
                    key={day}
                    role="row"
                    className={`chart__row ${isToday ? 'chart__row--today' : ''} ${hours ? '' : 'chart__row--closed'}`}
                    aria-label={label}
                  >
                    <span className="chart__day" role="cell">
                      {isToday ? <span className="chart__dotToday" aria-hidden="true" /> : null}
                      {WEEKDAY_SHORT[day]}
                    </span>
                    <div className="chart__track" role="cell">
                      {hours ? (
                        <>
                          <div
                            className="chart__bar"
                            style={{ left: `${pct(hours.open)}%`, width: `${pct(hours.close) - pct(hours.open)}%` }}
                          >
                            <span>{formatMinutes(hours.open)}</span>
                            <span>{formatMinutes(hours.close)}</span>
                          </div>
                          {hours.breakStart !== undefined && hours.breakEnd !== undefined ? (
                            <div
                              className="chart__bar chart__bar--break"
                              style={{
                                left: `${pct(hours.breakStart)}%`,
                                width: `${pct(hours.breakEnd) - pct(hours.breakStart)}%`,
                              }}
                              aria-hidden="true"
                            >
                              Lunch
                            </div>
                          ) : null}
                        </>
                      ) : (
                        <span className="chart__closed">Closed</span>
                      )}
                      {isToday && nowMin >= AXIS_START && nowMin <= AXIS_END ? (
                        <span className="chart__now" style={{ left: `${pct(nowMin)}%` }} aria-hidden="true" />
                      ) : null}
                    </div>
                  </div>
                )
              })}
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
