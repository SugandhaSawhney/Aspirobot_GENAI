
import { FaBrain, FaGraduationCap, FaChartLine } from "react-icons/fa";


const WhyAspirobot = () => {
  return (
    <section className="why-aspirobot-section">
      <h2 className="section-title">Why Aspirobot?</h2>
      <p className="why-subtext">
        Behind every student is a dream. Behind Aspirobot is a purpose to turn that dream into a direction.
      </p>

      <div className="why-cards">
        <div className="why-card">
          <FaGraduationCap className="why-icon" />
          <h3>Clarity Over Confusion</h3>
          <p>
            Students often feel lost, unsure what to do next. Aspirobot bridges that gap by giving you clear,
            AI-powered guidance.
          </p>
        </div>

        <div className="why-card">
          <FaBrain className="why-icon" />
          <h3>Smart, Not Generic</h3>
          <p>
            We don’t give random advice. Aspirobot analyzes your strengths and helps you move forward with precision.
          </p>
        </div>

        <div className="why-card">
          <FaChartLine className="why-icon" />
          <h3>From Goals to Growth</h3>
          <p>
            Whether it’s your resume, your next skill, or your career roadmap — we turn dreams into measurable progress.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyAspirobot;
