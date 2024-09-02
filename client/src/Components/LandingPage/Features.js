import React from 'react';

const Features = () => {
  return (
    <section id='features'>
      {/* Container */}
      <div className='container mt-5 mb-5'>
        <div className='row'>
          {/* What's Different */}
          <div className='col-md-6 d-flex flex-column justify-content-center'>
            <h2 className='text-uppercase text-center text-md-start fw-bold mb-4'>
              <span className='text-danger'>Why choose</span> SS Tax Mentors?
            </h2>
            <p className='text-center text-md-start text-muted'>
              At SS Tax Mentors, we understand the challenges startups face in navigating the intricacies of operating in India's business landscape. That's why we offer a comprehensive suite of services aimed at simplifying the journey for entrepreneurs and empowering them to focus on what truly matters - building their business.
            </p>
          </div>

          {/* Numbered List */}
          <div className='col-md-6'>
            {/* List Item 1 */}
            <div className='d-flex mb-4'>
              <div className='d-flex align-items-center'>
                <div className='bg-danger text-white rounded-circle p-2 me-3'>01</div>
                <h3 className='d-md-none fw-bold mb-0'>Smooth Startup Journey</h3>
              </div>
              <div>
                <h3 className='d-none d-md-block fw-bold'>Smooth Startup Journey</h3>
                <p className='text-muted'>
                  SS Tax Mentors streamlines your startup journey in India, so you can focus on your business while we handle the paperwork hassle-free.
                </p>
              </div>
            </div>

            {/* List Item 2 */}
            <div className='d-flex mb-4'>
              <div className='d-flex align-items-center'>
                <div className='bg-danger text-white rounded-circle p-2 me-3'>02</div>
                <h3 className='d-md-none fw-bold mb-0'>Expert Financial Support</h3>
              </div>
              <div>
                <h3 className='d-none d-md-block fw-bold'>Expert Financial Support</h3>
                <p className='text-muted'>
                  With SS Tax Mentors, you get expert accounting and tax services designed for startups, ensuring your finances are in safe hands while you grow your business.
                </p>
              </div>
            </div>

            {/* List Item 3 */}
            <div className='d-flex mb-4'>
              <div className='d-flex align-items-center'>
                <div className='bg-danger text-white rounded-circle p-2 me-3'>03</div>
                <h3 className='d-md-none fw-bold mb-0'>Trusted Guidance</h3>
              </div>
              <div>
                <h3 className='d-none d-md-block fw-bold'>Trusted Guidance</h3>
                <p className='text-muted'>
                  We're more than just accountants. SS Tax Mentors guides you through the complexities of business, building trust with stakeholders and ensuring you meet your responsibilities with ease.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
