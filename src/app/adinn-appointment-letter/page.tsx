// /* eslint-disable */
// // @ts-nocheck
// "use client";

// import AppointmentLetterMain from "../components/appointment-letter/AppointmentLetterMain";
// import "../components/appointment-letter/AppointmentLetter.css";

// export default function AdinnAppointmentLetterPage() {
//   return <AppointmentLetterMain />;
// }

import React from "react";
import AppointmentPagesMain from "../components/appointment-letter/AppointmentLetterMain";

function AppointmentPage() {
  return (
    <>
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "32px 24px",
          fontFamily: "system-ui, sans-serif",
          height: "max-content",
        }}
      >
        <div>
          <AppointmentPagesMain />
        </div>
      </div>
    </>
  );
}

export default AppointmentPage;