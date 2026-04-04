import { data } from '../data';
import './Research.css';

export default function Research() {
  return (
    <section className="section research" id="research">
      <div className="container">
        <p className="section-label">Published work</p>
        <h2 className="section-title">Research <span>Papers</span></h2>

        <div className="research__list">
          {data.research.map((r, i) => (
            <a
              className="card research__card"
              href={r.link}
              target="_blank"
              rel="noreferrer"
              key={i}
            >
              <div className="research__top">
                <span className="tag research__venue">{r.venue}</span>
                <span className="research__date">{r.date}</span>
              </div>
              <h3 className="research__title">{r.title}</h3>
              <p className="research__desc">{r.description}</p>
              <div className="research__footer">
                <span className="research__location">{r.location}</span>
                <span className="research__arrow">↗</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
