import React from "react";
import axios from "axios";
import { brand, valuePillars, modules, trust, faqHome, saveFormLocally } from "../mock";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Toaster } from "../components/ui/sonner";
import * as Icons from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Icon = ({ name, className }) => {
  const Lucide = Icons[name] || Icons.Circle;
  return <Lucide className={className} />;
};

export default function HomePage() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

  const onSubmit = async (data) => {
    if (!data.name || !data.email) {
      toast.error("Please provide name and email to proceed.");
      return;
    }
    try {
      await axios.post(`${API}/proposals`, {
        ...data,
        source_page: "home",
      });
      toast.success("Request received. We'll respond within 24 hours.");
      reset();
    } catch (e) {
      const ok = saveFormLocally("osh-proposal-requests", data);
      if (ok) toast.success("Saved locally. We'll sync when online.");
      else toast.error("Unable to save locally. Please try again.");
    }
  };

  const heroImage = brand.hero.images[0];

  return (
    <div style={{ fontFamily: brand.fonts.body }}>
      <Toaster richColors />
      {/* Hero */}
      <section className="relative">
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "saturate(0.9)",
          }}
        />
        {/* Brand overlay */}
        <div
          className="absolute inset-0 -z-0"
          style={{
            background:
              `linear-gradient(0deg, rgba(0,0,0,0.55), rgba(0,0,0,0.35)), ${brand.colors.primary}22`,
          }}
        />

        <div className="mx-auto max-w-screen-xl px-4 pt-24 pb-24">
          <div className="max-w-2xl text-white">
            <h1
              className="text-4xl md:text-5xl font-bold leading-tight"
              style={{ fontFamily: brand.fonts.heading }}
            >
              {brand.hero.headline}
            </h1>
            <p className="mt-4 text-white/90 max-w-xl">
              {brand.hero.sub}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                size="lg"
                style={{ backgroundColor: brand.colors.primary, color: brand.colors.white }}
                onClick={() => navigate("/module/wem")}
              >
                Explore Module 1
              </Button>
              <Button
                size="lg"
                variant="outline"
                style={{ borderColor: brand.colors.gold, color: brand.colors.white }}
                onClick={() => navigate("/contact")}
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Glass-morphism quick form */}
          <div className="mt-10 max-w-xl rounded-xl border border-white/20 bg-white/10 backdrop-blur-xl p-5 text-white">
            <h3 className="text-lg font-semibold">Request Training Proposal</h3>
            <form className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3" onSubmit={handleSubmit(onSubmit)}>
              <Input placeholder="Full Name" className="bg-white/80" {...register("name")} />
              <Input placeholder="Work Email" className="bg-white/80" type="email" {...register("email")} />
              <Input placeholder="Company" className="bg-white/80 md:col-span-2" {...register("company")} />
              <Textarea placeholder="Training needs (optional)" className="bg-white/80 md:col-span-2" rows={3} {...register("message")} />
              <div className="md:col-span-2 flex items-center gap-3">
                <Button type="submit" style={{ backgroundColor: brand.colors.gold, color: brand.colors.ink }}>
                  Submit Request
                </Button>
                <span className="text-xs text-white/80">Proposal typically within 24 hours.</span>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="mx-auto max-w-screen-xl px-4 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {valuePillars.map((p) => (
            <Card key={p.title} className="group relative overflow-hidden border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-md flex items-center justify-center"
                    style={{ backgroundColor: `${brand.colors.primary}22` }}
                  >
                    <Icon name={p.icon} className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg" style={{ fontFamily: brand.fonts.heading }}>
                    {p.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </CardContent>
              <div className="absolute inset-x-0 bottom-0 h-1" style={{ backgroundColor: brand.colors.primary }} />
            </Card>
          ))}
        </div>
      </section>

      {/* Training Modules */}
      <section className="mx-auto max-w-screen-xl px-4 pb-16">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-semibold" style={{ fontFamily: brand.fonts.heading }}>Training Modules</h2>
          <Link to="/services" className="text-sm underline">View all</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
          {modules.map((m) => (
            <Card key={m.id} className="transition-transform hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md flex items-center justify-center" style={{ backgroundColor: `${brand.colors.primary}22` }}>
                    <Icon name={m.icon} className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base" style={{ fontFamily: brand.fonts.heading }}>{m.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground min-h-14">{m.blurb}</p>
                <Button className="mt-4 w-full" style={{ backgroundColor: brand.colors.primary, color: brand.colors.white }} onClick={() => navigate(m.path)}>
                  {m.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Trust & Credentials */}
      <section className="mx-auto max-w-screen-xl px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-xl font-semibold" style={{ fontFamily: brand.fonts.heading }}>Trust & Credentials</h3>
            <p className="mt-2 text-sm text-muted-foreground">We bring accredited expertise and measurable outcomes.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {trust.badges.map((b) => (
                <span key={b.label} className="px-3 py-1 rounded-full border border-border text-xs" style={{ backgroundColor: `${brand.colors.primary}0F` }}>
                  {b.label} — {b.sub}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {trust.metrics.map((m) => (
              <Card key={m.label} className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold" style={{ color: brand.colors.primary }}>
                    {m.value}{m.suffix}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{m.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-screen-xl px-4 pb-16">
        <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: brand.fonts.heading }}>Frequently Asked Questions</h3>
        <Accordion type="single" collapsible className="w-full">
          {faqHome.map((f, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA Section */}
      <section className="relative py-16">
        <div className="absolute inset-0 -z-10" style={{ background: `${brand.colors.slate}` }} />
        <div className="mx-auto max-w-screen-xl px-4 text-white">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-2xl font-semibold" style={{ fontFamily: brand.fonts.heading }}>Ready to build a safer, smarter workplace?</h3>
              <p className="mt-2 text-white/90">Request a tailored training proposal for your organization.</p>
            </div>
            <div className="flex md:justify-end">
              <Button size="lg" style={{ backgroundColor: brand.colors.gold, color: brand.colors.ink }} onClick={() => navigate("/contact")}>Request Training Proposal</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
