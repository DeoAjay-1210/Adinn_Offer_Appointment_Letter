/* eslint-disable */
// @ts-nocheck
import React from "react";
import OfferHeader from "../OfferHead";
import OfferFooter from "../OfferFooter";

export default function AppointmentA4Page({ children }) {
  return (
    <section className="apt-a4-page apt-page-break">
      {/* Same header, only wrapped for positioning */}
      <div className="apt-header-shell">
        <OfferHeader />
      </div>

      {/* 90% content width like your current document */}
      <main className="apt-page-content">{children}</main>

      {/* Same footer, only wrapped for full width and bottom position */}
      <div className="apt-footer-shell">
        <OfferFooter />
      </div>
    </section>
  );
}