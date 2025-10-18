import React from "react";
import axios from "axios";
import { brand, saveFormLocally } from "../mock";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Toaster } from "../components/ui/sonner";

export default function ContactPage() {
  const { register, handleSubmit, reset } = useForm();
  const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

  const onSubmit = async (data) => {
    if (!data.name || !data.email || !data.message) {
      toast.error("Name, email, and message are required.");
      return;
    }
    try {
      await axios.post(`${API}/contacts`, {
        ...data,
        source_page: "contact",
      });
      toast.success("Thanks! We'll be in touch within 24 hours.");
      reset();
    } catch (e) {
      const ok = saveFormLocally("osh-contact", data);
      if (ok) toast.success("Saved locally. We'll sync when online.");
      else toast.error("Unable to save locally. Please try again.");
    }
  };

  return (
    <div style={{ fontFamily: brand.fonts.body }}>
      <Toaster richColors />
      <section className="mx-auto max-w-screen-xl px-4 pt-10 pb-16">
        <h1 className="text-3xl font-bold" style={{ fontFamily: brand.fonts.heading }}>Contact Us</h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-2xl">Have a question or want a tailored training proposal? Send us a message.</p>

        <div className="grid gap-6 md:grid-cols-2 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-base" style={{ fontFamily: brand.fonts.heading }}>Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid grid-cols-1 gap-3" onSubmit={handleSubmit(onSubmit)}>
                <Input placeholder="Full Name" {...register("name")} />
                <Input placeholder="Work Email" type="email" {...register("email")} />
                <Input placeholder="Company (optional)" {...register("company")} />
                <Textarea placeholder="Your message" rows={5} {...register("message")} />
                <Button type="submit" style={{ backgroundColor: brand.colors.primary, color: brand.colors.white }}>Send</Button>
              </form>
              <p className="text-xs text-muted-foreground mt-3">Or email us at <a className="underline" href={`mailto:${brand.contact.email}`}>{brand.contact.email}</a> or call <a className="underline" href={`tel:${brand.contact.phone}`}>{brand.contact.phone}</a>.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base" style={{ fontFamily: brand.fonts.heading }}>Office</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                <p className="mb-2">{brand.contact.address}</p>
                <div className="aspect-[16/9] w-full rounded-md overflow-hidden border border-border bg-muted" />
                <p className="text-xs text-muted-foreground mt-2">Map embed placeholder.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
