// import React from 'react'
// import PagesMain from './pages/PagesMain';
// import Next_Page from './components/Next_Page';
// function OfferPage() {
//   return (
//     <>
// {/* <Next_Page/>   */}

//     <div 
//     style={{
//         maxWidth: "820px", margin: "0 auto", padding: "32px 24px", fontFamily: "system-ui, sans-serif", height: 'max-content',
//         //  border: '1px solid red',
//       }}
//       >
//         <div>
//           <PagesMain />
//         </div>
//       </div>
//     </>
//   )
// }

// export default OfferPage;


import React from "react";
import PagesMain from "./pages/PagesMain";
import "./pages/Page1.css";

function OfferPage() {
  return (
    <main className="offer-page-shell">
      <PagesMain />
    </main>
  );
}

export default OfferPage;