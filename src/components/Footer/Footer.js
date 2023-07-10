import { Link } from 'react-router-dom';
import gitHubLogo from '../../images/github.svg';
import linkedInLogo from '../../images/linkedin-square-icon.svg';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__paragraph">
          &#169; 2023 Francis Flanagan, Powered by News API
        </p>
        <div className="footer__social-content">
          <ul className="footer__list">
            <li className="footer__list-item footer__list-item_content_home">
              <Link className="footer__list-link" to="/">
                Home
              </Link>
            </li>
            <li className="footer__list-item footer__list-item_content_tripleten">
              <a
                className="footer__list-link"
                href="https://tripleten.com"
                target="_blank"
                rel="noreferrer"
              >
                TripleTen
              </a>
            </li>
            <li className="footer__list-item footer__list-item_content_github">
              <a
                className="footer__list-social-link"
                href="https://github.com/skwisgaarr8-9"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={gitHubLogo}
                  className="footer__list-logo"
                  alt="Visit Francis Flanagan's GitHub profile"
                />
              </a>
            </li>
            <li className="footer__list-item footer__list-item_content_linkedin">
              <a
                className="footer__list-social-link"
                href="https://www.linkedin.com/in/francis-flanagan/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={linkedInLogo}
                  className="footer__list-logo"
                  alt="Visit Francis Flanagan's LinkedIn profile"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
