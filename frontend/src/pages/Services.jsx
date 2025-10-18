import React from "react";
import { modules, brand } from "../mock";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import * as Icons from "lucide-react";
import { useNavigate } from "react-router-dom";

const Icon = ({ name, className }) => {
  const Lucide = Icons[name] || Icons.Circle;
  return <Lucide className={className} />;
};

export default function ServicesPage() {
  const navigate = useNavigate();
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-10" style={{ fontFamily: brand.fonts.body }}>
      <header className="mb-8">
        <h1 className="text-3xl font-bold" style={{ fontFamily: brand.fonts.heading }}>Services Overview</h1>
        <p className="mt-2 text-sm text-muted-foreground">Explore our core training modules. Modules 2–4 are actively being developed and marked as Coming Soon.</p>
      </header>
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        {modules.map((m) => (
          <Card key={m.id} className="h-full">
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
    </div>
  );
}
