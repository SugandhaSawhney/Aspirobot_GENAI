import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [goal, setGoal] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    // Dummy validation
    if (!fullName || !dob || !gender || !email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    // Show success & redirect
    setMsg("✅ Account created successfully!");
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);

    // Clear form
    setFullName(""); setDob(""); setGender("");
    setEmail(""); setPassword(""); setGoal("");
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Create Your Account</h2>

      <form className="signup-form" onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="signup-input"
        />

        <input
          type="date"
          placeholder="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
          className="signup-input"
        />

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
          className="signup-input"
        >
          <option value="">Select Gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
          <option value="prefer_not">Prefer not to say</option>
        </select>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="signup-input"
        />

        <input
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="signup-input"
        />

        <input
          type="text"
          placeholder="Career Goal / Interest Area (optional)"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="signup-input"
        />

        <button type="submit" className="signup-button">Sign Up</button>
      </form>

      {msg && <p className="success-msg">{msg}</p>}
      {error && <p className="error-msg">{error}</p>}

      <p className="login-link-text">
        Already have an account? <Link to="/">Log in</Link>
      </p>
    </div>
  );
};

export default SignupPage;
