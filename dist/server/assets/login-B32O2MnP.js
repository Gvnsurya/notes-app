import { t as authClient } from "./auth-client-DzSucT9w.js";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/login.tsx?tsr-split=component
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
	async function handleSubmit(e) {
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
					password
				});
				if (result.error) {
					setError(result.error.message || "Unable to create account.");
					return;
				}
				window.location.href = "/";
			} else {
				const result = await authClient.signIn.email({
					email: email.trim(),
					password
				});
				if (result.error) {
					setError(result.error.message || "Invalid email or password.");
					return;
				}
				window.location.href = "/";
			}
		} catch (err) {
			console.error(isSignup ? "Signup error:" : "Login error:", err);
			setError(isSignup ? "Something went wrong while creating your account." : "Something went wrong while signing in.");
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ jsxs("main", {
		className: "login-page",
		children: [
			/* @__PURE__ */ jsx("div", { className: "login-orb orb-one" }),
			/* @__PURE__ */ jsx("div", { className: "login-orb orb-two" }),
			/* @__PURE__ */ jsx("div", { className: "login-orb orb-three" }),
			/* @__PURE__ */ jsxs("div", {
				className: "login-wrapper",
				children: [/* @__PURE__ */ jsxs("section", {
					className: "login-intro",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "brand",
							children: [/* @__PURE__ */ jsx("div", {
								className: "brand-icon",
								children: "✦"
							}), /* @__PURE__ */ jsx("span", { children: "NoteFlow" })]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "intro-content",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "small-badge",
									children: "✨ ORGANIZE YOUR IDEAS"
								}),
								/* @__PURE__ */ jsxs("h1", { children: [
									"Your thoughts.",
									/* @__PURE__ */ jsx("br", {}),
									/* @__PURE__ */ jsx("span", { children: "Beautifully organized." })
								] }),
								/* @__PURE__ */ jsx("p", { children: "Capture ideas, organize your work, and keep everything important in one beautiful place." }),
								/* @__PURE__ */ jsxs("div", {
									className: "feature-list",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "feature-item",
											children: [/* @__PURE__ */ jsx("div", {
												className: "feature-icon",
												children: "✎"
											}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("strong", { children: "Write freely" }), /* @__PURE__ */ jsx("span", { children: "Capture every important thought" })] })]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "feature-item",
											children: [/* @__PURE__ */ jsx("div", {
												className: "feature-icon",
												children: "◈"
											}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("strong", { children: "Stay organized" }), /* @__PURE__ */ jsx("span", { children: "Keep personal, work and study notes together" })] })]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "feature-item",
											children: [/* @__PURE__ */ jsx("div", {
												className: "feature-icon",
												children: "⚡"
											}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("strong", { children: "Access instantly" }), /* @__PURE__ */ jsx("span", { children: "Your notes are always ready for you" })] })]
										})
									]
								})
							]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "intro-footer",
							children: "© 2026 NoteFlow"
						})
					]
				}), /* @__PURE__ */ jsx("section", {
					className: "login-panel",
					children: /* @__PURE__ */ jsxs("div", {
						className: "login-card",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "mobile-brand",
								children: [/* @__PURE__ */ jsx("div", {
									className: "brand-icon",
									children: "✦"
								}), /* @__PURE__ */ jsx("span", { children: "NoteFlow" })]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "login-heading",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "welcome-icon",
										children: isSignup ? "✨" : "👋"
									}),
									/* @__PURE__ */ jsx("h2", { children: isSignup ? "Create your account" : "Welcome" }),
									/* @__PURE__ */ jsx("p", { children: isSignup ? "Create an account and start organizing your ideas." : "Sign in to continue managing your notes." })
								]
							}),
							/* @__PURE__ */ jsxs("form", {
								onSubmit: handleSubmit,
								children: [
									isSignup && /* @__PURE__ */ jsxs("div", {
										className: "form-group",
										children: [/* @__PURE__ */ jsx("label", { children: "Your name" }), /* @__PURE__ */ jsxs("div", {
											className: "input-wrapper",
											children: [/* @__PURE__ */ jsx("span", {
												className: "input-icon",
												children: "👤"
											}), /* @__PURE__ */ jsx("input", {
												type: "text",
												placeholder: "Enter your name",
												value: name,
												onChange: (e) => setName(e.target.value),
												required: true
											})]
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "form-group",
										children: [/* @__PURE__ */ jsx("label", { children: "Email address" }), /* @__PURE__ */ jsxs("div", {
											className: "input-wrapper",
											children: [/* @__PURE__ */ jsx("span", {
												className: "input-icon",
												children: "✉"
											}), /* @__PURE__ */ jsx("input", {
												type: "email",
												placeholder: "you@example.com",
												value: email,
												onChange: (e) => setEmail(e.target.value),
												required: true
											})]
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "form-group",
										children: [/* @__PURE__ */ jsx("label", { children: "Password" }), /* @__PURE__ */ jsxs("div", {
											className: "input-wrapper",
											children: [/* @__PURE__ */ jsx("span", {
												className: "input-icon",
												children: "⌑"
											}), /* @__PURE__ */ jsx("input", {
												type: "password",
												placeholder: isSignup ? "Create a password" : "Enter your password",
												value: password,
												onChange: (e) => setPassword(e.target.value),
												required: true
											})]
										})]
									}),
									isSignup && /* @__PURE__ */ jsxs("div", {
										className: "form-group",
										children: [/* @__PURE__ */ jsx("label", { children: "Confirm password" }), /* @__PURE__ */ jsxs("div", {
											className: "input-wrapper",
											children: [/* @__PURE__ */ jsx("span", {
												className: "input-icon",
												children: "✓"
											}), /* @__PURE__ */ jsx("input", {
												type: "password",
												placeholder: "Confirm your password",
												value: confirmPassword,
												onChange: (e) => setConfirmPassword(e.target.value),
												required: true
											})]
										})]
									}),
									error && /* @__PURE__ */ jsxs("div", {
										className: "login-error",
										children: ["⚠ ", error]
									}),
									/* @__PURE__ */ jsxs("button", {
										type: "submit",
										className: "login-button",
										disabled: loading,
										children: [loading ? isSignup ? "Creating account..." : "Signing in..." : isSignup ? "Create Account" : "Sign In", !loading && /* @__PURE__ */ jsx("span", { children: "→" })]
									})
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "login-divider",
								children: [
									/* @__PURE__ */ jsx("span", {}),
									/* @__PURE__ */ jsx("p", { children: isSignup ? "ALREADY HAVE AN ACCOUNT?" : "NEW TO NOTEFLOW?" }),
									/* @__PURE__ */ jsx("span", {})
								]
							}),
							/* @__PURE__ */ jsx("button", {
								type: "button",
								className: "signup-button",
								onClick: isSignup ? switchToLogin : switchToSignup,
								disabled: loading,
								children: isSignup ? "Sign in instead" : "Create an account"
							}),
							/* @__PURE__ */ jsx("button", {
								type: "button",
								className: "back-button",
								onClick: () => {
									window.location.href = "/";
								},
								children: "← Back to Notes"
							})
						]
					})
				})]
			})
		]
	});
}
//#endregion
export { LoginPage as component };
