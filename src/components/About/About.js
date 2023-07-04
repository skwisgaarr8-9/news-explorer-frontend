import placeHolderImg from '../../images/image-03.png';
import './About.css';

function About() {
  return (
    <div className="about">
      <img src={placeHolderImg} className="about__image" alt="author" />
      <div className="about__description">
        <h2 className="about__heading">About the author</h2>
        <p className="about__paragraph">
          This block describes the project author. Here you should indicate your
          name, what you do, and which development technologies you know.
        </p>
        <p className="about__paragraph">
          You can also talk about your experience with Practicum, what you
          learned there, and how you can help potential customers.
        </p>
      </div>
    </div>
  );
}

export default About;
