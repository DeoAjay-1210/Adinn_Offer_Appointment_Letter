import React from "react";
import InternshipCompletionMain from "../components/internship-completion-certificate/InternshipCompletionMain";
import { ProtectedLetterPage } from "../components/utils/ProtectedLetterPage";

function InternshipCompletionCertificatePage() {
  return (
    <ProtectedLetterPage>
      <div
        style={{
          maxWidth: "820px", margin: "0 auto", padding: "32px 24px", fontFamily: "system-ui, sans-serif", height: 'max-content',
        }}>
        <main className="offer-page-shell">
          <InternshipCompletionMain />
        </main>
      </div>
    </ProtectedLetterPage>
  );
}

export default InternshipCompletionCertificatePage;
