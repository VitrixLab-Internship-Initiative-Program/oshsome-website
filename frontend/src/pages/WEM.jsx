import React from "react";
import axios from "axios";
import { brand, wemContent, saveFormLocally } from "../mock";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Toaster } from "../components/ui/sonner";
import * as Icons from "lucide-react";

const Icon = ({ name, className }) => {
  const Lucide = Icons[name] || Icons.Circle;
  return <Lucide className={className} />;
};

export default function WEMPage() {
  const { register, handleSubmit, reset } = useForm();
  const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

  const onSubmit = async (data) => {
    if (!data.name || !data.email) {
      toast.error("Please provide name and email to proceed.");
      return;
    }
    try {
      await axios.post(`${API}/wem-requests`, {
        ...data,
        source_page: "wem",
      });
      toast.success("WEM request received. We'll respond within 24 hours.");
      reset();
    } catch (e) {
      const ok = saveFormLocally("osh-wem-requests", data);
      if (ok) toast.success("Saved locally. We'll sync when online.");
      else toast.error("Unable to save locally. Please try again.");
    }
  };

  return (
    <div style={{ fontFamily: brand.fonts.body }}>
      <Toaster richColors />
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 -z-10" style={{ backgroundColor: brand.colors.ink }} />
        <div className="absolute inset-0 -z-0" style={{ background: `linear-gradient(0deg, ${brand.colors.primary}33, transparent)` }} />
        <div className="mx-auto max-w-screen-xl px-4 pt-20 pb-16 text-white">
          <h1 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: brand.fonts.heading }}>{wemContent.hero.title}</h1>
          <p className="mt-3 text-white/90 max-w-2xl">{wemContent.hero.subtitle}</p>
          <Button className="mt-6" style={{ backgroundColor: brand.colors.gold, color: brand.colors.ink }}>{wemContent.hero.cta}</Button>
        </div>
      </section>

      {/* Definition */}
      <section className="mx-auto max-w-screen-xl px-4 py-12">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm leading-relaxed">{wemContent.definition}</p>
          </CardContent>
        </Card>
      </section>

      {/* Scope / Capabilities */}
      <section className="mx-auto max-w-screen-xl px-4 py-4">
        <h2 className="text-2xl font-semibold mb-6" style={{ fontFamily: brand.fonts.heading }}>Scope & Capabilities</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {wemContent.scope.map((s) => (
            <Card key={s.title} className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md flex items-center justify-center" style={{ backgroundColor: `${brand.colors.primary}22` }}>
                    <Icon name={s.icon} className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base" style={{ fontFamily: brand.fonts.heading }}>{s.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{s.items}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-screen-xl px-4 py-10">
        <h2 className="text-2xl font-semibold mb-6" style={{ fontFamily: brand.fonts.heading }}>Investing in Your Workforce, Investing in Your Success.</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {wemContent.benefits.map((b) => (
            <Card key={b.title} className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md flex items-center justify-center" style={{ backgroundColor: `${brand.colors.primary}22` }}>
                    <Icon name={b.icon} className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base" style={{ fontFamily: brand.fonts.heading }}>{b.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-screen-xl px-4 py-10">
        <h2 className="text-2xl font-semibold mb-6" style={{ fontFamily: brand.fonts.heading }}>Our WEM and IAQ Process</h2>
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {wemContent.process.map((step, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div
                className="h-7 w-7 rounded-full flex items-center justify-center text-white text-sm shrink-0"
                style={{ backgroundColor: brand.colors.primary }}
              >
                {idx + 1}
              </div>
              <span className="text-sm">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-screen-xl px-4 py-10">
        <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: brand.fonts.heading }}>WEM FAQs</h2>
        <Accordion type="single" collapsible className="w-full">
          {wemContent.faq.map((f, idx) => (
            <AccordionItem key={idx} value={`wem-${idx}`}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA Form */}
      <section className="mx-auto max-w-screen-xl px-4 py-14">
        <Card className="border-2" style={{ borderColor: brand.colors.slate }}>
          <CardHeader>
            <CardTitle className="text-lg" style={{ fontFamily: brand.fonts.heading }}>Get Certified Now</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-3" onSubmit={handleSubmit(onSubmit)}>
              <Input placeholder="Full Name" {...register("name")} />
              <Input placeholder="Work Email" type="email" {...register("email")} />
              <Input placeholder="Company" className="md:col-span-2" {...register("company")} />
              <Textarea placeholder="Scope / Facility Details" className="md:col-span-2" rows={4} {...register("message")} />
              <div className="md:col-span-2">
                <Button type="submit" style={{ backgroundColor: brand.colors.primary, color: brand.colors.white }}>Book Your Training</Button>
              </div>
            </form>
            <p className="text-xs text-muted-foreground mt-2">We typically respond within 24 hours.</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
