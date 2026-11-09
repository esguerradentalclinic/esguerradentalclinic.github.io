import { CLINIC } from '../data/clinic'
import portraitUrl from '../assets/doctor-portrait.jpg'
import { DrillIcon, MailIcon, PhoneIcon, PinIcon, ShieldIcon, SparkleIcon } from './Icons'
import { Reveal } from './Reveal'

const PILLARS = [
  {
    icon: ShieldIcon,
    title: 'Prevent',
    text: 'Cleanings, sealants, fluoride and honest advice, so small problems never get the chance to grow.',
  },
  {
    icon: DrillIcon,
    title: 'Restore',
    text: 'Fillings, crowns, root canals and dentures done only when needed, at a price range agreed before we start.',
  },
  {
    icon: SparkleIcon,
    title: 'Smile',
    text: 'Gentle whitening and the confidence that comes from a healthy mouth you understand.',
  },
] as const

export function About() {
  const yearsOpen = new Date().getFullYear() - CLINIC.establishedYear

  return (
    <section id="about" className="section section--tint" aria-labelledby="about-title">
      <div className="container">
        <Reveal>
          <div className="section__head section__head--center">
            <span className="eyebrow">Our promise</span>
            <h2 id="about-title" className="h2">
              Three words we work by
            </h2>
          </div>
        </Reveal>

        <ul className="pillars" aria-label="Clinic principles">
          {PILLARS.map((p, i) => {
            const Icon = p.icon
            return (
              <Reveal key={p.title} as="li" delay={i * 80} className="pillar">
                <span className="pillar__icon" aria-hidden="true">
                  <Icon />
                </span>
                <h3 className="pillar__title">{p.title}</h3>
                <p className="pillar__text">{p.text}</p>
              </Reveal>
            )
          })}
        </ul>

        <Reveal delay={100}>
          <div className="story-band">
            <div>
              <span className="eyebrow">About the clinic</span>
              <h3 className="story-band__title">When and why we started</h3>
              <p className="story-band__text">{CLINIC.story}</p>
            </div>
            <ul className="story-facts" aria-label="Clinic facts">
              <li>
                <span className="story-facts__label">Established</span>
                <span className="story-facts__value">
                  {CLINIC.establishedMonth} {CLINIC.establishedYear}
                </span>
              </li>
              <li>
                <span className="story-facts__label">Location</span>
                <span className="story-facts__value">{CLINIC.address}</span>
              </li>
              <li>
                <span className="story-facts__label">Years of care</span>
                <span className="story-facts__value">{yearsOpen} and counting</span>
              </li>
              <li>
                <span className="story-facts__label">Patient rating</span>
                <span className="story-facts__value">4.9 / 5 (demo)</span>
              </li>
            </ul>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <article className="dentist" aria-label={`About Dr. ${CLINIC.doctor.fullName}`}>
            <img
              className="dentist__photo"
              src={portraitUrl}
              width={640}
              height={800}
              alt={`Portrait of Dr. ${CLINIC.doctor.fullName}, ${CLINIC.doctor.title}`}
              loading="lazy"
              decoding="async"
            />
            <div>
              <div className="dentist__kicker">Your dentist</div>
              <h3 className="dentist__name">
                Dr. {CLINIC.doctor.fullName}
                <small>{CLINIC.doctor.title}</small>
              </h3>
              <p className="dentist__role">{CLINIC.doctor.role}</p>
              <p className="dentist__bio">{CLINIC.doctor.bio}</p>
              <div className="dentist__contact">
                <a className="contact-row" href={CLINIC.contact.phoneHref}>
                  <span className="contact-row__icon">
                    <PhoneIcon />
                  </span>
                  <span>
                    <span className="contact-row__label">Call or text</span>
                    {CLINIC.contact.phoneDisplay}
                  </span>
                </a>
                <a className="contact-row" href={`mailto:${CLINIC.contact.email}`}>
                  <span className="contact-row__icon">
                    <MailIcon />
                  </span>
                  <span>
                    <span className="contact-row__label">Email</span>
                    {CLINIC.contact.email}
                  </span>
                </a>
                <span className="contact-row">
                  <span className="contact-row__icon">
                    <PinIcon />
                  </span>
                  <span>
                    <span className="contact-row__label">Clinic</span>
                    {CLINIC.name}, {CLINIC.address}
                  </span>
                </span>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
