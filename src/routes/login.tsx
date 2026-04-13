import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";
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

  const inputClass = "h-11 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all";

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4">
      <div className="w-full animate-fade-up">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand">
            <ShoppingBag className="h-6 w-6 text-brand-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to your Craftly account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
          )}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
            <input className={inputClass} type="email" placeholder="buyer@craftly.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Password</label>
            <input className={inputClass} type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button variant="brand" size="lg" className="w-full" type="submit">Sign In</Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-brand hover:underline">Sign up</Link>
        </p>

        <div className="mt-8 rounded-xl border border-border bg-surface p-4">
          <p className="mb-2 text-xs font-semibold text-foreground">Demo Credentials</p>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p><span className="font-medium text-foreground">Buyer:</span> buyer@craftly.com / buyer123</p>
            <p><span className="font-medium text-foreground">Seller:</span> seller@craftly.com / seller123</p>
            <p><span className="font-medium text-foreground">Admin:</span> admin@craftly.com / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
