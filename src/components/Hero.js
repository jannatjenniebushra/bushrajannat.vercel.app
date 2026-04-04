import { data } from '../data';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      {/* Animated grid background */}
      <div className="hero__grid" aria-hidden="true" />
      {/* Glowing orbs */}
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />

      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__hello animate-fadeUp">
            <span className="hero__hello-line" />
            Hi, I'm
          </p>
          <h1 className="hero__name animate-fadeUp delay-1">{data.name}</h1>
          <h2 className="hero__title animate-fadeUp delay-2">
            <span className="hero__title-word">Software</span>{' '}
            <span className="hero__title-accent">Engineer</span>
          </h2>
          <p className="hero__tagline animate-fadeUp delay-3">{data.tagline}</p>
          <p className="hero__about animate-fadeUp delay-4">{data.about}</p>

          <div className="hero__actions animate-fadeUp delay-5">
            <a href="#projects" className="btn btn-primary" onClick={e => { e.preventDefault(); document.getElementById('projects').scrollIntoView({behavior:'smooth'}); }}>
              View Projects ↓
            </a>
            <a href={data.github} className="btn btn-outline" target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a href={data.linkedin} className="btn btn-outline" target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
          </div>
        </div>

        <div className="hero__avatar animate-fadeUp delay-3">
          <div className="hero__avatar-ring" />
          <div className="hero__avatar-inner">
            <span>BJ</span>
          </div>
          <div className="hero__status">
            <span className="hero__status-dot" />
            Open to opportunities
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a className="hero__scroll" href="#about" onClick={e=>{ e.preventDefault(); document.getElementById('about').scrollIntoView({behavior:'smooth'}); }}>
        <span />
      </a>
    </section>
  );
}
