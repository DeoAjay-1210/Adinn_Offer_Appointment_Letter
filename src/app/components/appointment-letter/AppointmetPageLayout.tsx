/* eslint-disable */
// @ts-nocheck
"use client";

import React from "react";
import OfferHeader from "./OfferHead";
import OfferFooter from "./OfferFooter";

function Appointment({ children }) {
  return (
    <section className="a4-page">
      <OfferHeader />
      <main className="offer-page-body">{children}</main>
      <OfferFooter />
    </section>
  );
}

export default Appointment;