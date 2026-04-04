import { data } from '../data';
import './Contact.css';

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="container">
        <p className="section-label">Get in touch</p>
        <h2 className="section-title">Let's <span>Connect</span></h2>

        <div className="contact__layout">
          {/* Left — CTA copy */}
          <div className="contact__left">
            <p className="contact__intro">
              I'm actively looking for software engineering opportunities. Whether you have a job opening, a collaboration idea, or just want to say hi — my inbox is always open.
            </p>

            <div className="contact__links">
              <a href={`mailto:${data.email}`} className="contact__link-row">
                <span className="contact__link-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                <div>
                  <span className="contact__link-label">Email</span>
                  <span className="contact__link-value">{data.email}</span>
                </div>
                <span className="contact__link-arrow">↗</span>
              </a>

              <a href={data.linkedin} target="_blank" rel="noreferrer" className="contact__link-row">
                <span className="contact__link-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </span>
                <div>
                  <span className="contact__link-label">LinkedIn</span>
                  <span className="contact__link-value">linkedin.com/in/jannatjenniebushra</span>
                </div>
                <span className="contact__link-arrow">↗</span>
              </a>

              <a href={data.github} target="_blank" rel="noreferrer" className="contact__link-row">
                <span className="contact__link-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                </span>
                <div>
                  <span className="contact__link-label">GitHub</span>
                  <span className="contact__link-value">github.com/jannatjenniebushra</span>
                </div>
                <span className="contact__link-arrow">↗</span>
              </a>

              <a href={`tel:${data.phone}`} className="contact__link-row">
                <span className="contact__link-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/>
                  </svg>
                </span>
                <div>
                  <span className="contact__link-label">Phone</span>
                  <span className="contact__link-value">{data.phone}</span>
                </div>
                <span className="contact__link-arrow">↗</span>
              </a>
            </div>
          </div>

          {/* Right — big CTA card */}
          <div className="contact__cta card">
            <div className="contact__cta-glow" />
            <h3 className="contact__cta-heading">Open to Work</h3>
            <p className="contact__cta-sub">
              Full-time · Internship · Remote / Hybrid<br />
              Based in <strong>Dhaka, Bangladesh</strong>
            </p>
            <div className="contact__cta-tags">
              <span className="tag">Software Engineer</span>
              <span className="tag">Full-Stack Developer</span>
              <span className="tag">ML Engineer</span>
              <span className="tag">Backend Developer</span>
            </div>
            <a href={`mailto:${data.email}`} className="btn btn-primary contact__cta-btn">
              Say Hello →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
