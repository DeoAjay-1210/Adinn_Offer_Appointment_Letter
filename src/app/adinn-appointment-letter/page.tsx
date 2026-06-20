import React from "react";
import AppointmentPagesMain from "../components/appointment-letter/AppointmentLetterMain";
import {ProtectedLetterPage} from "../components/utils/ProtectedLetterPage";


function OfferPage() {
  return (
    <ProtectedLetterPage>
      <div
        style={{
          maxWidth: "820px", margin: "0 auto", padding: "32px 24px", fontFamily: "system-ui, sans-serif", height: 'max-content',
        }}>
        <main className="offer-page-shell">
          <AppointmentPagesMain />

        </main>
      </div>
    </ProtectedLetterPage>
  );
}

export default OfferPage;
