// import React from 'react'

// function OfferHeaderPage() {
//   return (
//     <div>
//       {/* <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px", fontFamily: "system-ui, sans-serif", border: '1px solid red' }}> */}
//         <div style={{ display: 'flex', justifyContent: 'end' }}>
//           <img src='/Images/AdinnLogo.png'></img>
//         </div>
//       {/* </div> */}

//     </div>
//   )
// }

// export default OfferHeaderPage;


import React from "react";

function OfferHeaderPage() {
  return (
    <header className="offer-page-header">
      <img
        src="/Images/AdinnLogo.png"
        alt="Adinn Advertising Services Ltd."
        className="offer-header-logo"
        crossOrigin="anonymous"
      />
    </header>
  );
}

export default OfferHeaderPage;