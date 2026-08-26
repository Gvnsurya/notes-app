import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { authClient } from "../lib/auth-client";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function switchToSignup() {
    setIsSignup(true);
    setError("");
    setPassword("");
    setConfirmPassword("");
  }

  function switchToLogin() {
    setIsSignup(false);
    setError("");
    setPassword("");
    setConfirmPassword("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (isSignup) {
      if (!name.trim()) {
        setError("Please enter your name.");
        return;
      }

      if (password.length < 8) {
        setError("Password must be at least 8 characters.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }

    setLoading(true);

    try {
      if (isSignup) {
        const result = await authClient.signUp.email({
          name: name.trim(),
          email: email.trim(),
          password,
        });

        if (result.error) {
          setError(
            result.error.message || "Unable to create account.",
          );
          return;
        }

        window.location.href = "/";
      } else {
        const result = await authClient.signIn.email({
          email: email.trim(),
          password,
        });

        if (result.error) {
          setError(
            result.error.message ||
              "Invalid email or password.",
          );
          return;
        }

        window.location.href = "/";
      }
    } catch (err) {
      console.error(
        isSignup ? "Signup error:" : "Login error:",
        err,
      );

      setError(
        isSignup
          ? "Something went wrong while creating your account."
          : "Something went wrong while signing in.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <div className="login-orb orb-one" />
      <div className="login-orb orb-two" />
      <div className="login-orb orb-three" />

      <div className="login-wrapper">
        <section className="login-intro">
          <div className="brand">
            <div className="brand-icon">✦</div>
            <span>NoteFlow</span>
          </div>

          <div className="intro-content">
            <div className="small-badge">
              ✨ ORGANIZE YOUR IDEAS
            </div>

            <h1>
              Your thoughts.
              <br />
              <span>Beautifully organized.</span>
            </h1>

            <p>
              Capture ideas, organize your work, and keep
              everything important in one beautiful place.
            </p>

            <div className="feature-list">
              <div className="feature-item">
                <div className="feature-icon">✎</div>
                <div>
                  <strong>Write freely</strong>
                  <span>Capture every important thought</span>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">◈</div>
                <div>
                  <strong>Stay organized</strong>
                  <span>
                    Keep personal, work and study notes together
                  </span>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">⚡</div>
                <div>
                  <strong>Access instantly</strong>
                  <span>
                    Your notes are always ready for you
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="intro-footer">
            © 2026 NoteFlow
          </div>
        </section>

        <section className="login-panel">
          <div className="login-card">
            <div className="mobile-brand">
              <div className="brand-icon">✦</div>
              <span>NoteFlow</span>
            </div>

            <div className="login-heading">
              <div className="welcome-icon">
                {isSignup ? "✨" : "👋"}
              </div>

              <h2>
                {isSignup
                  ? "Create your account"
                  : "Welcome"}
              </h2>

              <p>
                {isSignup
                  ? "Create an account and start organizing your ideas."
                  : "Sign in to continue managing your notes."}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {isSignup && (
                <div className="form-group">
                  <label>Your name</label>

                  <div className="input-wrapper">
                    <span className="input-icon">👤</span>

                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
              )}

              <div className="form-group">
                <label>Email address</label>

                <div className="input-wrapper">
                  <span className="input-icon">✉</span>

                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>

                <div className="input-wrapper">
                  <span className="input-icon">⌑</span>

                  <input
                    type="password"
                    placeholder={
                      isSignup
                        ? "Create a password"
                        : "Enter your password"
                    }
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              {isSignup && (
                <div className="form-group">
                  <label>Confirm password</label>

                  <div className="input-wrapper">
                    <span className="input-icon">✓</span>

                    <input
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
              )}

              {error && (
                <div className="login-error">
                  ⚠ {error}
                </div>
              )}

              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >
                {loading
                  ? isSignup
                    ? "Creating account..."
                    : "Signing in..."
                  : isSignup
                    ? "Create Account"
                    : "Sign In"}

                {!loading && <span>→</span>}
              </button>
            </form>

            <div className="login-divider">
              <span />

              <p>
                {isSignup
                  ? "ALREADY HAVE AN ACCOUNT?"
                  : "NEW TO NOTEFLOW?"}
              </p>

              <span />
            </div>

            <button
              type="button"
              className="signup-button"
              onClick={
                isSignup
                  ? switchToLogin
                  : switchToSignup
              }
              disabled={loading}
            >
              {isSignup
                ? "Sign in instead"
                : "Create an account"}
            </button>

            <button
              type="button"
              className="back-button"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              ← Back to Notes
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}