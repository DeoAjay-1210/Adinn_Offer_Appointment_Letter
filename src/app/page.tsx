import React from 'react'
// import OfferHeader from './components/OfferHead';
// import OfferFooter from './components/OfferFooter';
import PagesMain from './pages/PagesMain';

function OfferPage() {
  return (
    <>
      <div style={{
        maxWidth: 900, margin: "0 auto", padding: "32px 24px", fontFamily: "system-ui, sans-serif", height: 'max-content',
        //  border: '1px solid red',
      }}>
        <div >
          <PagesMain />
        </div>
      </div>
    </>
  )
}

export default OfferPage;