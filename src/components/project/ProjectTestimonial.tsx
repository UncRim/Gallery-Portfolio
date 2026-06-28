import { getTestimonialById } from '../../data/testimonials'

interface ProjectTestimonialProps {
  testimonialId: string
}

export function ProjectTestimonial({ testimonialId }: ProjectTestimonialProps) {
  const item = getTestimonialById(testimonialId)
  if (!item) return null

  return (
    <section className="post-testimonial" aria-labelledby="post-testimonial-heading">
      <h2 id="post-testimonial-heading">Kind words</h2>
      <blockquote className="post-testimonial-card">
        <p className="post-testimonial-quote">&ldquo;{item.quote}&rdquo;</p>
        <footer className="post-testimonial-footer">
          <cite className="post-testimonial-name">{item.name}</cite>
          <span className="post-testimonial-role">{item.role}</span>
        </footer>
      </blockquote>
    </section>
  )
}
