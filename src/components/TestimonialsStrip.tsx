import { testimonials, type Testimonial } from '../data/testimonials'
import { useSnapCarousel } from '../hooks/useSnapCarousel'
import { useMediaQuery } from '../hooks/useMediaQuery'

interface TestimonialsStripProps {
  visibility?: 'mobile' | 'desktop' | 'all'
  variant?: 'carousel' | 'marquee'
}

const TESTIMONIALS_PER_SLIDE = 2

function chunkTestimonials<T>(items: T[], size: number): T[][] {
  const slides: T[][] = []

  for (let index = 0; index < items.length; index += size) {
    slides.push(items.slice(index, index + size))
  }

  return slides
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <blockquote className="testimonial-card">
      <p className="testimonial-quote">&ldquo;{item.quote}&rdquo;</p>
      <footer className="testimonial-footer">
        <cite className="testimonial-name">{item.name}</cite>
        <span className="testimonial-role">{item.role}</span>
      </footer>
    </blockquote>
  )
}

function TestimonialsCarousel() {
  const slides = chunkTestimonials(testimonials, TESTIMONIALS_PER_SLIDE)
  const { trackRef, current, goTo, setSlideRef } = useSnapCarousel(slides.length)

  return (
    <div className="testimonials-slider" aria-roledescription="carousel">
      <div className="testimonials-track" ref={trackRef}>
        {slides.map((slide, slideIndex) => (
          <div
            key={slide.map((item) => item.id).join('-')}
            ref={setSlideRef(slideIndex)}
            className={`testimonials-slide${slideIndex === current ? ' is-active' : ''}`}
            aria-roledescription="slide"
            aria-label={`${slideIndex + 1} of ${slides.length}`}
            role="group"
          >
            {slide.map((item) => (
              <TestimonialCard item={item} key={item.id} />
            ))}
          </div>
        ))}
      </div>

      <div className="testimonials-dots dots">
        {slides.map((slide, index) => (
          <button
            key={slide.map((item) => item.id).join('-')}
            type="button"
            className={`dot${index === current ? ' active' : ''}`}
            onClick={() => goTo(index)}
            aria-label={`Go to testimonial slide ${index + 1}`}
            aria-current={index === current ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
  )
}

function TestimonialsMarquee() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const marqueeItems = prefersReducedMotion ? testimonials : [...testimonials, ...testimonials]

  return (
    <div className="testimonials-marquee" aria-label="Kind words marquee">
      <div
        className={`testimonials-marquee-track${prefersReducedMotion ? ' is-static' : ''}`}
      >
        {marqueeItems.map((item, index) => (
          <TestimonialCard item={item} key={`${item.id}-${index}`} />
        ))}
      </div>
    </div>
  )
}

export function TestimonialsStrip({
  visibility = 'all',
  variant = 'carousel',
}: TestimonialsStripProps) {
  const isMobile = useMediaQuery('(max-width: 768px)')

  if (visibility === 'mobile' && !isMobile) {
    return null
  }

  if (visibility === 'desktop' && isMobile) {
    return null
  }

  return (
    <section
      className={`testimonials-strip${variant === 'marquee' ? ' testimonials-strip--marquee' : ''}`}
      aria-labelledby="testimonials-heading"
    >
      <p className="testimonials-heading" id="testimonials-heading">
        Kind words
      </p>

      {variant === 'marquee' ? <TestimonialsMarquee /> : <TestimonialsCarousel />}
    </section>
  )
}
