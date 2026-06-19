// import React from "react";
// import AppointmentPagesMain from "../components/appointment-letter/AppointmentLetterMain";

// function AppointmentPage() {
//   return (
//     <>
//       <div
//         style={{
//           maxWidth: 900,
//           margin: "0 auto",
//           padding: "32px 24px",
//           fontFamily: "system-ui, sans-serif",
//           height: "max-content",
//         }}
//       >
//         <div>
//           <AppointmentPagesMain />
//         </div>
//       </div>
//     </>
//   );
// }

// export default AppointmentPage;


import React from "react";
import AppointmentPagesMain from "../components/appointment-letter/AppointmentLetterMain";


function OfferPage() {
  return (
    <div 
    style={{
        maxWidth: "820px", margin: "0 auto", padding: "32px 24px", fontFamily: "system-ui, sans-serif", height: 'max-content',
      }}
      >
    <main className="offer-page-shell">
               <AppointmentPagesMain />

    </main>
    </div>
  );
}

export default OfferPage;
