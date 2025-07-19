import React, { useState, useEffect } from "react";
import { FaHome, FaFileAlt, FaRobot, FaMap, FaMoon, FaSun } from "react-icons/fa";
import NovaBot from "../components/NovaBot.jsx";
import botImage from "/Images/DashBot.png";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.classList.remove("light", "dark");
    document.body.classList.add(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.classList.remove("light", "dark");
    document.body.classList.add(newTheme);
  };

  return (
    <div className="dashboard-wrapper">
      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-logo">Aspirobot</h2>
          <span className="theme-icon" onClick={toggleTheme}>
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </span>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li className={`nav-item ${activeSection === "dashboard" ? "active" : ""}`} onClick={() => setActiveSection("dashboard")}>
              <FaHome /> Dashboard
            </li>
            <li className={`nav-item ${activeSection === "resume" ? "active" : ""}`} onClick={() => setActiveSection("resume")}>
              <FaFileAlt /> Resume Analyzer
            </li>
            <li className={`nav-item ${activeSection === "skillbot" ? "active" : ""}`} onClick={() => setActiveSection("skillbot")}>
              <FaRobot /> Skill Bot
            </li>
            <li className={`nav-item ${activeSection === "roadmap" ? "active" : ""}`} onClick={() => setActiveSection("roadmap")}>
              <FaMap /> AI Roadmap
            </li>
          </ul>
        </nav>
      </aside>

      {/* MAIN AREA  */}
      <main className="dashboard-main">
        {activeSection === "dashboard" && (
          <div className="dashboard-content">

            {/*  INTRO SECTION  */}
            <div className="bot-intro">
              <img src={botImage} alt="Aspirobot" className="intro-img" />
              <div className="intro-text">
                <h1>Hi, I am <span className="glow">Aspirobot!</span></h1>
                <p>Leverage artificial intelligence to analyze your resume, discover skill gaps, and build personalized career roadmaps. Our platform provides data-driven insights to accelerate your professional growth.</p>
              </div>
            </div>

            {/* === FEATURE CARDS === */}
            <div className="feature-grid">
              <div className="ai-card">
                <h3>Resume Analyzer</h3>
                <p>Enhance your resume with advanced AI analysis tailored to modern hiring standards.
               The tool scans your CV for formatting issues, language clarity, and keyword strength while also evaluating ATS compatibility. Whether you're applying for your first job or aiming for a career switch, receive instant, actionable suggestions to improve structure, relevance, and impact helping you stand out in today’s competitive job market.

              </p>
                <button className="card-btn" onClick={() => setActiveSection("resume")}>Start Analysis</button>
              </div>

              <div className="ai-card">
                <h3>Career Roadmap</h3>
                <p>
               Our AI-powered roadmap builder evaluates your current skills, interests, and goals to design a personalized path forward. It recommends the right courses, technologies, certifications, and timelines aligned with your target role. Whether you're starting out, switching fields, or aiming for senior positions, the roadmap gives you actionable steps to stay focused, upskill smartly, and grow confidently in your career.</p>
                <button className="card-btn" onClick={() => setActiveSection("roadmap")}>Build Roadmap</button>
              </div>

              <div className="ai-card">
                <h3>Skill Bot</h3>
                <p>Talk to our intelligent Skill Bot- NOVA and get real-time guidance tailored to your goals. Whether you're confused about what to learn next, which tools are trending, or what skills align with your passion just ask! The bot listens, understands, and responds with personalized advice and resources.
                From exploring new domains to refining your current skill set, NOVA evolves with you. Start the conversation that could shape your future.
                </p>
                <button className="card-btn" onClick={() => setActiveSection("skillbot")}>Chat Now</button>
              </div>
            </div>
          </div>
        )}

        {activeSection === "resume" && (
          <iframe
            src="http://localhost:8504"
            width="100%" height="800px"
            style={{ border: "none", borderRadius: "10px", marginTop: "10px" }}
          />
        )}

        {activeSection === "skillbot" && (
          <div className="skillbot-container">
            <NovaBot />
          </div>
        )}

        {activeSection === "roadmap" && (
          <iframe
            src="http://localhost:8503"
            width="100%" height="800px"
            style={{ border: "none", borderRadius: "10px", marginTop: "10px" }}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
