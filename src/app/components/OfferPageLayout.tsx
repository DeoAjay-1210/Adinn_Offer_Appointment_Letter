// /* eslint-disable */
// // @ts-nocheck
// "use client";

// import React from "react";
// import OfferHeader from "./OfferHead";
// import OfferFooter from "./OfferFooter";

// function OfferPageLayout({ children }) {
//   return (
//     <section className="a4-page">
//       <OfferHeader />
//       <main className="offer-page-body">{children}</main>
//       <OfferFooter />
//     </section>
//   );
// }

// export default OfferPageLayout;




/* eslint-disable */
// @ts-nocheck
"use client";

import React from "react";
import OfferHeader from "./OfferHead";
import OfferFooter from "./OfferFooter";

function OfferPageLayout({ children, showLetterhead = true }) {
  return (
    <section
      className={`a4-page ${
        showLetterhead ? "letterhead-visible" : "letterhead-hidden"
      }`}
    >
      <div className="offer-letterhead-slot offer-letterhead-header">
        <OfferHeader />
      </div>

      <main className="offer-page-body">{children}</main>

      <div className="offer-letterhead-slot offer-letterhead-footer">
        <OfferFooter />
      </div>
    </section>
  );
}

export default OfferPageLayout;