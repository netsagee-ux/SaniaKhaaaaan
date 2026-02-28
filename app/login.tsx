import { useState, useCallback } from "react";
import { loginUser } from "../utils/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = useCallback(async () => {
    if (loading) return;

    try {
      setLoading(true);
      await loginUser(email, password);
      alert("Login successful!");
    } catch (err) {
      alert(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [email, password, loading]);

  return (
    <div>
      <h1>Login</h1>

      <input
        type="email"
        value={email}
        placeholder="Email"
        autoComplete="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        value={password}
        placeholder="Password"
        autoComplete="current-password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}