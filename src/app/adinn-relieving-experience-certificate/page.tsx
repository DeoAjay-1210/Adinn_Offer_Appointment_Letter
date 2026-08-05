import React from "react";
import RelievingExperienceMain from "../components/relieving-experience-certificate/RelievingExperienceMain";
import { ProtectedLetterPage } from "../components/utils/ProtectedLetterPage";

function RelievingExperienceCertificatePage() {
  return (
    <ProtectedLetterPage>
      <div
        style={{
          maxWidth: "820px", margin: "0 auto", padding: "32px 24px", fontFamily: "system-ui, sans-serif", height: 'max-content',
        }}>
        <main className="offer-page-shell">
          <RelievingExperienceMain />
        </main>
      </div>
    </ProtectedLetterPage>
  );
}

export default RelievingExperienceCertificatePage;
