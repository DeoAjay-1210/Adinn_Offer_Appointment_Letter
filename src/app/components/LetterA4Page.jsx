/* eslint-disable */
// @ts-nocheck
"use client";

import React from "react";
import OfferHeader from "./OfferHead";
import OfferFooter from "./OfferFooter";

function LetterA4Page({ children, contentClassName = "" }) {
  return (
    <div className="a4-page">
      {/* Fixed header area */}
      <div className="letterHeaderArea">
        <OfferHeader />
      </div>

      {/* Same 90% content area for all pages */}
      <div className={`letterContentArea ${contentClassName}`}>
        {children}
      </div>

      {/* Fixed footer area */}
      <div className=" letterFooterArea">
        <OfferFooter />
      </div>
    </div>
  );
}

export default LetterA4Page;