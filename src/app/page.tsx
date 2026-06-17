import React from 'react'
import PagesMain from './pages/PagesMain';
import Next_Page from './components/Next_Page';
function OfferPage() {
  return (
    <>
{/* <Next_Page/>   */}

    <div style={{
        maxWidth: 900, margin: "0 auto", padding: "32px 24px", fontFamily: "system-ui, sans-serif", height: 'max-content',
        //  border: '1px solid red',
      }}>

        <div>
          <PagesMain />
        </div>
      </div>
    </>
  )
}

export default OfferPage;