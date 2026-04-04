import { data } from '../data';
import './Skills.css';

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <p className="section-label">What I work with</p>
        <h2 className="section-title">Technical <span>Skills</span></h2>

        <div className="skills__grid">
          {data.skills.map((group) => (
            <div className="card skills__card" key={group.category}>
              <h3 className="skills__category">{group.category}</h3>
              <div className="skills__tags">
                {group.items.map(item => (
                  <span className="tag" key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
