const SocialLogin = () => {
  const handleGoogleLogin = () => {
    alert("🔒 Google Sign-In is disabled for now.");
  };

  const handleAppleLogin = () => {
    alert("🔒 Apple Sign-In is not available.");
  };

  return (
    <div className="social-login">
      <button className="social-button" onClick={handleGoogleLogin}>
        <img src="google.svg" alt="Google" className="social-icon" />
        Google
      </button>

      <button className="social-button" onClick={handleAppleLogin}>
        <img src="apple.svg" alt="Apple" className="social-icon" />
        Apple
      </button>
    </div>
  );
};

export default SocialLogin;
