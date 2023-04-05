import { Link } from 'react-router-dom';

import "./Hero.css";

export const Hero = () => {
    return (
        <section className="hero">
            <div className="welcome">
                <h1>TAKE THE CHALLENGE OF QUIZZLY</h1>
                <p>
                    Answer to questions uploaded by other users and get on top of
                    rankings or upload your own questions.
                </p>
                <Link to="/play">Play Now</Link>
            </div>
            <img src="./images/hero-removebg.png" alt="heroImage" />
        </section>
    );
}