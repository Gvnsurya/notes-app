import { o as __toESM } from "../_runtime.mjs";
import { L as require_react, _ as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as authClient } from "./auth-client-DzneXuQ_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-D24wB4Ha.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const [isSignup, setIsSignup] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirmPassword, setConfirmPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "login-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "login-orb orb-one" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "login-orb orb-two" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "login-orb orb-three" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "login-wrapper",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "login-intro",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "brand",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "brand-icon",
								children: "✦"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "NoteFlow" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "intro-content",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "small-badge",
									children: "✨ ORGANIZE YOUR IDEAS"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
									"Your thoughts.",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Beautifully organized." })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Capture ideas, organize your work, and keep everything important in one beautiful place." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "feature-list",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "feature-item",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "feature-icon",
												children: "✎"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Write freely" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Capture every important thought" })] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "feature-item",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "feature-icon",
												children: "◈"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Stay organized" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Keep personal, work and study notes together" })] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "feature-item",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "feature-icon",
												children: "⚡"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Access instantly" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Your notes are always ready for you" })] })]
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "intro-footer",
							children: "© 2026 NoteFlow"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "login-panel",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "login-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mobile-brand",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "brand-icon",
									children: "✦"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "NoteFlow" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "login-heading",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "welcome-icon",
										children: isSignup ? "✨" : "👋"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: isSignup ? "Create your account" : "Welcome" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: isSignup ? "Create an account and start organizing your ideas." : "Sign in to continue managing your notes." })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleSubmit,
								children: [
									isSignup && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "form-group",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Your name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "input-wrapper",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "input-icon",
												children: "👤"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												placeholder: "Enter your name",
												value: name,
												onChange: (e) => setName(e.target.value),
												required: true
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "form-group",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Email address" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "input-wrapper",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "input-icon",
												children: "✉"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "email",
												placeholder: "you@example.com",
												value: email,
												onChange: (e) => setEmail(e.target.value),
												required: true
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "form-group",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Password" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "input-wrapper",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "input-icon",
												children: "⌑"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "password",
												placeholder: isSignup ? "Create a password" : "Enter your password",
												value: password,
												onChange: (e) => setPassword(e.target.value),
												required: true
											})]
										})]
									}),
									isSignup && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "form-group",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Confirm password" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "input-wrapper",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "input-icon",
												children: "✓"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "password",
												placeholder: "Confirm your password",
												value: confirmPassword,
												onChange: (e) => setConfirmPassword(e.target.value),
												required: true
											})]
										})]
									}),
									error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "login-error",
										children: ["⚠ ", error]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "submit",
										className: "login-button",
										disabled: loading,
										children: [loading ? isSignup ? "Creating account..." : "Signing in..." : isSignup ? "Create Account" : "Sign In", !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "login-divider",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: isSignup ? "ALREADY HAVE AN ACCOUNT?" : "NEW TO NOTEFLOW?" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "signup-button",
								onClick: isSignup ? switchToLogin : switchToSignup,
								disabled: loading,
								children: isSignup ? "Sign in instead" : "Create an account"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
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
