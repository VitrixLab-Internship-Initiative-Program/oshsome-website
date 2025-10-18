import React from "react";
import { brand } from "../mock";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export default function AboutPage() {
  return (
    <div style={{ fontFamily: brand.fonts.body }}>
      <section className="relative">
        <div className="absolute inset-0 -z-10" style={{ backgroundColor: brand.colors.muted }} />
        <div className="mx-auto max-w-screen-xl px-4 pt-14 pb-10">
          <h1 className="text-3xl font-bold" style={{ fontFamily: brand.fonts.heading }}>About OSHSOME Consultancy</h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-3xl">
            We empower organizations to build safer, smarter, and more resilient workplaces through standards-aligned training and evidence-based measurement.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-screen-xl px-4 pb-12 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base" style={{ fontFamily: brand.fonts.heading }}>Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">To equip teams with practical, measurable OSH competencies that protect people and power performance.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base" style={{ fontFamily: brand.fonts.heading }}>Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">A nationwide culture of safety and resilience where every worker returns home healthy, every day.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base" style={{ fontFamily: brand.fonts.heading }}>Values</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Integrity and transparency</li>
              <li>Evidence and outcomes</li>
              <li>Respect for people</li>
              <li>Continuous improvement</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-screen-xl px-4 pb-20">
        <Card>
          <CardHeader>
            <CardTitle className="text-base" style={{ fontFamily: brand.fonts.heading }}>Brand Story</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Founded by Rogelio Valle Mendoza Jr., OSHSOME Consultancy blends technical precision with human-centered delivery. We bring accredited expertise, modern pedagogy, and measurable results to every engagement.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
