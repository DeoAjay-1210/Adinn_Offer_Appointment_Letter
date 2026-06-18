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