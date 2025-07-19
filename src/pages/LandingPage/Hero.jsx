import { useNavigate } from "react-router-dom";
const Hero = () => {
  const navigate = useNavigate();

  const scrollToFeatures = () => {
    const section = document.getElementById("features");
    section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>
          Empower Your <span className="highlight">Career</span> with AI
        </h1>
        <p  className="hero-subtext">
         Aspirobot is your intelligent career companion designed to analyze your strengths, refine your resume, and guide you toward a future of purpose and potential.
        </p>
        <div className="hero-buttons">
          <button onClick={scrollToFeatures}>Learn More</button>
          <button onClick={() => navigate("/dashboard")}>Get Started</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
