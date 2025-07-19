import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleReset = (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    // Dummy success response
    setMsg("✅ Password reset link sent to your email!");
    setEmail("");
  };

  return (
    <div className="forgot-password-container">
      <h2 className="forgot-password-title">Reset Your Password</h2>

      <form className="forgot-password-form" onSubmit={handleReset}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="forgot-password-input"
        />

        <button type="submit" className="forgot-password-button">
          Send Reset Link
        </button>
      </form>

      {msg && <p className="success-msg">{msg}</p>}
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default ForgotPassword;
