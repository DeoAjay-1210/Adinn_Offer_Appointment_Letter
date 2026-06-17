import React from 'react'
import './OfferFooter.css'

function OfferFooterPage() {
    return (
        <div style={{width:'max-content', margin:'auto'}} >
            {/* <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px", fontFamily: "system-ui, sans-serif", border: '1px solid red' }}> */}
            <div className='flex justify-around gap-2 '>
                <div className='flex justify-around ' style={{alignItems:'end', gap:'3px'}}>
                    <div> <img src='./images/Adinn_INSLogo1.png' alt='adinnlogo' style={{ width: '50px', height: '40px' }}></img></div>
                    <div> <img src='./images/Adinn_RuralLogo1.png' alt='adinnlogo' style={{ width: '50px', height: '30px' }}></img></div>
                    <div> <img src='./images/Adinn_IndianOutdoorLogo1.jpg' alt='adinnlogo' style={{ width: 'auto', height: '40px' }}></img></div>
                    <div> <img src='./images/Adinn_3mLogo1.png' alt='adinnlogo' style={{ width: '30px', height: '25px' }}></img></div>
                </div>
                <div style={{ height: 'auto', width: '0.5px', border: '0.5px solid black' }}></div>
                <div style={{alignItems:'center', alignContent:'center'}}>
                    <div className='FooterContents'> <span  className='FooterHeading' style={{ fontWeight: '700' }}>REGISTERED OFFICE :</span> 29, 1st Cross street, Vanamamalai nagar, Bypass road, Madurai - 625016.</div>
                    <div className='FooterContents'> <span  className='FooterHeading' style={{ fontWeight: '700' }}>BRANCH OFFICE :</span> Chennai | Bengaluru | Kerala | Tel: 91 452 4344800 - 801. Email: info@adinn.co.in. www.adinn.com</div>

                </div>

            </div>
            {/* </div> */}

        </div>
    )
}

export default OfferFooterPage;