import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — Craftly" },
      { name: "description", content: "Sign in to your Craftly account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = login(email, password);
    if (result.success) {
      navigate({ to: "/" });
    } else {
      setError(result.error || "Login failed");
    }
  };

  const quickLogin = (e: string, p: string) => {
    setEmail(e);
    setPassword(p);
    const result = login(e, p);
    if (result.success) navigate({ to: "/" });
  };

  const inputClass = "h-11 w-full rounded-lg border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all";

  return (
    <div className="mx-auto flex min-h-[75vh] max-w-md flex-col items-center justify-center px-4 py-10">
      <div className="w-full animate-fade-up">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-foreground">Sign in</h1>
          <p className="mt-1 text-sm text-muted-foreground">Welcome back to Craftly</p>
        </div>

        {/* Demo Credentials Box */}
        <div className="mb-6 rounded-xl border-2 border-brand/30 bg-brand-light/30 p-4">
          <p className="mb-3 text-sm font-bold text-foreground">✨ Demo Credentials (click to auto-login)</p>
          <div className="space-y-2">
            <button
              onClick={() => quickLogin("buyer@craftly.com", "buyer123")}
              className="w-full text-left rounded-lg bg-background border border-border p-2.5 hover:border-brand transition-colors"
            >
              <p className="text-xs font-semibold text-brand">👤 Buyer Account</p>
              <p className="text-xs text-muted-foreground mt-0.5">Email: <span className="font-mono text-foreground">buyer@craftly.com</span> · Password: <span className="font-mono text-foreground">buyer123</span></p>
            </button>
            <button
              onClick={() => quickLogin("seller@craftly.com", "seller123")}
              className="w-full text-left rounded-lg bg-background border border-border p-2.5 hover:border-brand transition-colors"
            >
              <p className="text-xs font-semibold text-brand">🏪 Seller Account</p>
              <p className="text-xs text-muted-foreground mt-0.5">Email: <span className="font-mono text-foreground">seller@craftly.com</span> · Password: <span className="font-mono text-foreground">seller123</span></p>
            </button>
            <button
              onClick={() => quickLogin("admin@craftly.com", "admin123")}
              className="w-full text-left rounded-lg bg-background border border-border p-2.5 hover:border-brand transition-colors"
            >
              <p className="text-xs font-semibold text-brand">⚙️ Admin Account</p>
              <p className="text-xs text-muted-foreground mt-0.5">Email: <span className="font-mono text-foreground">admin@craftly.com</span> · Password: <span className="font-mono text-foreground">admin123</span></p>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
          )}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Email address</label>
            <input className={inputClass} type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Password</label>
            <input className={inputClass} type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button className="w-full h-11 rounded-full bg-foreground text-background hover:bg-foreground/90 font-semibold" type="submit">
            Sign In
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-brand hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}
