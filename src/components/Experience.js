import { useState } from 'react';
import { data } from '../data';
import './Experience.css';

const TABS = ['Work', 'Education', 'Activities'];

export default function Experience() {
  const [tab, setTab] = useState(0);

  return (
    <section className="section" id="experience">
      <div className="container">
        <p className="section-label">My journey</p>
        <h2 className="section-title">Experience &amp; <span>Background</span></h2>

        <div className="exp__tabs">
          {TABS.map((t, i) => (
            <button
              key={t}
              className={`exp__tab ${tab === i ? 'exp__tab--active' : ''}`}
              onClick={() => setTab(i)}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="exp__content">
          {tab === 0 && (
            <div className="exp__timeline">
              {data.experience.map((e, i) => (
                <div className="exp__item" key={i}>
                  <div className="exp__dot" />
                  <div className="exp__body">
                    <div className="exp__meta">
                      <h3 className="exp__role">{e.role}</h3>
                      <span className="exp__period">{e.period}</span>
                    </div>
                    <p className="exp__company">{e.company} · {e.location}</p>
                    <ul className="exp__bullets">
                      {e.bullets.map(b => (
                        <li key={b}><span className="projects__bullet">▹</span>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 1 && (
            <div className="exp__timeline">
              {data.education.map((e, i) => (
                <div className="exp__item" key={i}>
                  <div className="exp__dot" />
                  <div className="exp__body">
                    <div className="exp__meta">
                      <h3 className="exp__role">{e.degree}</h3>
                      <span className="exp__period">{e.period}</span>
                    </div>
                    <p className="exp__company">{e.school}</p>
                    {e.grade && <span className="tag" style={{marginTop:'0.6rem', display:'inline-block'}}>{e.grade}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 2 && (
            <div className="exp__timeline">
              {data.extracurricular.map((e, i) => (
                <div className="exp__item" key={i}>
                  <div className="exp__dot" />
                  <div className="exp__body">
                    <div className="exp__meta">
                      <h3 className="exp__role">{e.org}</h3>
                      <span className="exp__period">{e.period}</span>
                    </div>
                    <p className="exp__company">{e.role}</p>
                    <ul className="exp__bullets">
                      {e.bullets.map(b => (
                        <li key={b}><span className="projects__bullet">▹</span>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
