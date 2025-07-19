const Features = () => {
  return (
    <section className="features-section">
      <h2 className="section-title">What Aspirobot Offers</h2>
      <div className="feature-cards">
        <div className="feature-card">
          <h3>Resume Analyzer</h3>
          <p>
            Upload your resume and get smart, AI-powered feedback on content, formatting, and keywords to boost your chances of selection.
          </p>
        </div>
        <div className="feature-card">
          <h3>Skill Bot</h3>
          <p>
            Unsure what to learn next? Let Skill Bot evaluate your profile and suggest tailored learning paths based on your interests.
          </p>
        </div>
        <div className="feature-card">
          <h3>Career Roadmap</h3>
          <p>
            Visualize your future. Our AI designs a step-by-step path to guide you from where you are to your dream role.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
