import { useState, useEffect } from 'react';
import './Navbar.css';

const links = ['About', 'Skills', 'Projects', 'Research', 'Experience', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id) => {
    setActive(id);
    setOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <a className="navbar__logo" href="#hero" onClick={() => setActive('')}>
          <span className="navbar__logo-bracket">&lt;</span>BJ<span className="navbar__logo-bracket">/&gt;</span>
        </a>

        <ul className={`navbar__links ${open ? 'navbar__links--open' : ''}`}>
          {links.map(l => (
            <li key={l}>
              <button
                className={`navbar__link ${active === l ? 'navbar__link--active' : ''}`}
                onClick={() => handleNav(l)}
              >
                <span className="navbar__link-num">{String(links.indexOf(l) + 1).padStart(2,'0')}.</span>
                {l}
              </button>
            </li>
          ))}
          <li>
            <a
              className="btn btn-outline navbar__cta"
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Résumé ↗
            </a>
          </li>
        </ul>

        <button className={`navbar__burger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
