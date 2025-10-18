import React from "react";
import { brand } from "../mock";
import { Mail, Phone, MapPin, Shield } from "lucide-react";

export const SiteFooter = () => {
  return (
    <footer className="mt-24 border-t border-border bg-muted/50">
      <div className="mx-auto max-w-screen-xl px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md" style={{ backgroundColor: brand.colors.primary }} />
            <div className="text-base font-semibold tracking-wide" style={{ color: brand.colors.slate }}>
              {brand.name}
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            {brand.legalName}
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <Shield className="h-4 w-4" />
            <span>
              Permit No.: {brand.contact.permit.permitNo} | eOR No.: {brand.contact.permit.eOR} | Issued: {brand.contact.permit.dateIssued}
            </span>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <div className="flex items-start gap-2 text-sm mb-2">
            <Mail className="h-4 w-4 mt-0.5" />
            <a href={`mailto:${brand.contact.email}`} className="hover:underline">{brand.contact.email}</a>
          </div>
          <div className="flex items-start gap-2 text-sm mb-2">
            <Phone className="h-4 w-4 mt-0.5" />
            <a href={`tel:${brand.contact.phone}`} className="hover:underline">{brand.contact.phone}</a>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="h-4 w-4 mt-0.5" />
            <p>{brand.contact.address}</p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><a className="hover:underline" href="#">Privacy Policy</a></li>
            <li><a className="hover:underline" href="#">Cookie Policy</a></li>
            <li><a className="hover:underline" href="#">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © 2025 {brand.legalName}. All rights reserved.
      </div>
    </footer>
  );
};
