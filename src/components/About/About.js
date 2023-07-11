import author from '../../images/about-author.jpg';
import './About.css';

function About() {
  return (
    <section className="about">
      <img src={author} className="about__image" alt="author" />
      <div className="about__description">
        <h2 className="about__heading">About the author</h2>
        <p className="about__paragraph">
          My name is Francis Flanagan. This is my final project through
          TripleTen's software engineering course. It relies on the MERN stack
          to deliver a website where users can search for articles and save them
          to their profiles.
        </p>
        <p className="about__paragraph">
          I am a recent graduate of TripleTen's 10 month software engineering
          course and searching for a full stack engineer position. Feel free to
          contact me via LinkedIn with the link below.
        </p>
      </div>
    </section>
  );
}

export default About;
