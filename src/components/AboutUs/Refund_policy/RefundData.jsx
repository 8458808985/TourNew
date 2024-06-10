import React from 'react'

const RefundData = () => {
  return (
   <>
   <div className="container py-4" style={{marginTop:"70px"}}>
  <div className="row">
    <div className="col-md-12">
      <h2 className="text-center" style={{"font-weight":"700","color":"#78006E"}}>Cancellation Policy. <i className="fa-solid fa-house-person-return" style={{"color":"#78006E"}} /></h2>
      <hr />
      <div>
        <h6 className style={{"font-weight":"700","color":"#78006E"}}>Cancellation:<span className="text-danger">*</span></h6>
        <ul>
          <li style={{"font-weight":"600"}}>Renomadic understands that plans may change. If you need to cancel your booking, simply notify us within the specified cancellation period for a hassle-free process.</li>
          <li style={{"font-weight":"600"}}>Cancellation periods may vary depending on the activity booked. Please refer to your booking confirmation for details</li>
          <li style={{"font-weight":"600"}}>To cancel, contact our customer support team or follow the cancellation instructions provided in your booking confirmation.</li>
        </ul></div>
      <div>
        <h6 className style={{"font-weight":"700","color":"#78006E"}}>Refund:<span className="text-danger">*</span></h6>
        <ul>
          <li style={{"font-weight":"600"}}>Renomadic offers refunds for eligible cancellations within the designated cancellation period.</li>
          <li style={{"font-weight":"600"}}>Refund eligibility and processing times may vary depending on the activity and provider. Please refer to your booking confirmation for specific refund policies.</li>
          <li style={{"font-weight":"600"}}>Refunds will be issued to the original payment method used for booking.</li>
          <li style={{"font-weight":"600"}}>Processing fees or non-refundable portions may apply as per the activity provider's terms and conditions.</li>
          <li style={{"font-weight":"600"}}>For any questions or assistance regarding refunds, feel free to reach out to our customer support team.</li>
        </ul></div>
      <div>
        <h6 className style={{"font-weight":"700","color":"#78006E"}}>Note:<span className="text-danger">*</span></h6>
        <ul>
          <li style={{"font-weight":"600"}}>Non-refundable tickets or activities with special cancellation policies will be clearly indicated at the time of booking.</li>
          <li style={{"font-weight":"600"}}>Renomadic reserves the right to modify or update the cancellation and refund policy as necessary. Any changes will be communicated promptly to customers.
          </li>
          <li style={{"font-weight":"600"}}>Refunds will be issued to the original payment method used for booking.</li>
        </ul></div>
    </div>
  </div>
</div>
   </>
  )
}

export default RefundData
