import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronRight, Lock, CreditCard, Truck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore, useOrdersStore } from "@/lib/store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Craftly" },
      { name: "description", content: "Complete your purchase on Craftly." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const clearCart = useCartStore((s) => s.clearCart);
  const addOrder = useOrdersStore((s) => s.addOrder);
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState({
    name: "", email: "", address: "", city: "", state: "", zip: "",
    cardNumber: "", expiry: "", cvv: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-[1400px] flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-bold text-foreground">Nothing to checkout</h1>
        <p className="mt-2 text-muted-foreground">Add some items to your basket first.</p>
        <Button className="mt-6 rounded-full bg-foreground text-background hover:bg-foreground/90 px-8" asChild>
          <Link to="/">Browse items</Link>
        </Button>
      </div>
    );
  }

  const shipping = totalPrice >= 35 ? 0 : 5.99;
  const orderTotal = totalPrice + shipping;

  const updateField = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => { const next = { ...e }; delete next[field]; return next; });
  };

  const validateShipping = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Required";
    if (!form.email.trim() || !form.email.includes("@")) errs.email = "Valid email required";
    if (!form.address.trim()) errs.address = "Required";
    if (!form.city.trim()) errs.city = "Required";
    if (!form.state.trim()) errs.state = "Required";
    if (!form.zip.trim()) errs.zip = "Required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validatePayment = () => {
    const errs: Record<string, string> = {};
    if (form.cardNumber.replace(/\s/g, "").length < 16) errs.cardNumber = "Enter a valid card number";
    if (!form.expiry.trim()) errs.expiry = "Required";
    if (form.cvv.length < 3) errs.cvv = "Valid CVV required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = () => {
    const order = addOrder({
      items: [...items],
      totalPrice: orderTotal,
      shippingInfo: { name: form.name, email: form.email, address: form.address, city: form.city, state: form.state, zip: form.zip },
    });
    clearCart();
    navigate({ to: "/order-confirmation", search: { orderId: order.id } });
  };

  const inputClass = (field: string) =>
    `h-11 w-full rounded-lg border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all ${errors[field] ? "border-destructive" : "border-input"}`;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      {/* Steps */}
      <div className="mb-8 flex items-center justify-center gap-2">
        {[
          { n: 1, label: "Shipping", icon: Truck },
          { n: 2, label: "Payment", icon: CreditCard },
          { n: 3, label: "Review", icon: Check },
        ].map((s, i) => (
          <div key={s.n} className="flex items-center gap-2">
            <div className={`flex h-9 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors ${
              step >= s.n ? "bg-foreground text-background" : "bg-secondary text-muted-foreground"
            }`}>
              <s.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{s.label}</span>
            </div>
            {i < 2 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          {step === 1 && (
            <div className="animate-fade-in space-y-5">
              <h2 className="text-xl font-bold text-foreground">Shipping Information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Full Name</label>
                  <input className={inputClass("name")} placeholder="Jane Doe" value={form.name} onChange={(e) => updateField("name", e.target.value)} />
                  {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
                  <input className={inputClass("email")} type="email" placeholder="jane@example.com" value={form.email} onChange={(e) => updateField("email", e.target.value)} />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Address</label>
                  <input className={inputClass("address")} placeholder="123 Main St" value={form.address} onChange={(e) => updateField("address", e.target.value)} />
                  {errors.address && <p className="mt-1 text-xs text-destructive">{errors.address}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">City</label>
                  <input className={inputClass("city")} placeholder="New York" value={form.city} onChange={(e) => updateField("city", e.target.value)} />
                  {errors.city && <p className="mt-1 text-xs text-destructive">{errors.city}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">State</label>
                    <input className={inputClass("state")} placeholder="NY" value={form.state} onChange={(e) => updateField("state", e.target.value)} />
                    {errors.state && <p className="mt-1 text-xs text-destructive">{errors.state}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">ZIP</label>
                    <input className={inputClass("zip")} placeholder="10001" value={form.zip} onChange={(e) => updateField("zip", e.target.value)} />
                    {errors.zip && <p className="mt-1 text-xs text-destructive">{errors.zip}</p>}
                  </div>
                </div>
              </div>
              <Button className="w-full h-12 rounded-full bg-foreground text-background hover:bg-foreground/90 font-semibold" onClick={() => { if (validateShipping()) setStep(2); }}>
                Continue to Payment
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in space-y-5">
              <h2 className="text-xl font-bold text-foreground">Payment Details</h2>
              <div className="rounded-xl border border-border bg-surface p-4">
                <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <Lock className="h-3.5 w-3.5" />
                  <span>This is a <strong>simulated payment</strong> — no real charges.</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">Card Number</label>
                    <input className={inputClass("cardNumber")} placeholder="4242 4242 4242 4242" maxLength={19} value={form.cardNumber} onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
                      updateField("cardNumber", v);
                    }} />
                    {errors.cardNumber && <p className="mt-1 text-xs text-destructive">{errors.cardNumber}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground">Expiry</label>
                      <input className={inputClass("expiry")} placeholder="12/25" maxLength={5} value={form.expiry} onChange={(e) => updateField("expiry", e.target.value)} />
                      {errors.expiry && <p className="mt-1 text-xs text-destructive">{errors.expiry}</p>}
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground">CVV</label>
                      <input className={inputClass("cvv")} type="password" placeholder="•••" maxLength={4} value={form.cvv} onChange={(e) => updateField("cvv", e.target.value)} />
                      {errors.cvv && <p className="mt-1 text-xs text-destructive">{errors.cvv}</p>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="rounded-full" onClick={() => setStep(1)}>Back</Button>
                <Button className="flex-1 h-12 rounded-full bg-foreground text-background hover:bg-foreground/90 font-semibold" onClick={() => { if (validatePayment()) setStep(3); }}>
                  Review Order
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in space-y-5">
              <h2 className="text-xl font-bold text-foreground">Review Your Order</h2>
              <div className="rounded-xl border border-border bg-card p-5 space-y-2">
                <h3 className="text-sm font-bold text-foreground">Shipping to</h3>
                <p className="text-sm text-muted-foreground">{form.name}<br />{form.address}<br />{form.city}, {form.state} {form.zip}<br />{form.email}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5 space-y-2">
                <h3 className="text-sm font-bold text-foreground">Payment</h3>
                <p className="text-sm text-muted-foreground">Card ending in {form.cardNumber.replace(/\s/g, "").slice(-4)}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="mb-3 text-sm font-bold text-foreground">Items ({items.length})</h3>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3">
                      <img src={item.product.images[0]} alt="" className="h-12 w-12 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">{item.product.title}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium text-foreground">USD {(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="rounded-full" onClick={() => setStep(2)}>Back</Button>
                <Button className="flex-1 h-12 rounded-full bg-foreground text-background hover:bg-foreground/90 font-semibold" onClick={handlePlaceOrder}>
                  <Lock className="h-4 w-4" />
                  Place Order — USD {orderTotal.toFixed(2)}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary sidebar */}
        <div className="lg:col-span-2">
          <div className="sticky top-28 rounded-xl border border-border bg-card p-5">
            <h3 className="mb-4 text-sm font-bold text-foreground">Order Summary</h3>
            <div className="space-y-2 text-sm">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3">
                  <img src={item.product.images[0]} alt="" className="h-10 w-10 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-xs text-foreground">{item.product.title}</p>
                    <p className="text-xs text-muted-foreground">×{item.quantity}</p>
                  </div>
                  <p className="text-xs font-medium text-foreground">USD {(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground">USD {totalPrice.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="text-foreground">{shipping === 0 ? "FREE" : `USD ${shipping.toFixed(2)}`}</span></div>
              <div className="flex justify-between border-t border-border pt-2 text-base font-bold"><span className="text-foreground">Total</span><span className="text-foreground">USD {orderTotal.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
