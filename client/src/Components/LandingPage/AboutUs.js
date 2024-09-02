import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Features = () => {
  return (
    <section id='contact-us'>
      {/* Bootstrap Container */}
      <div className='container d-flex flex-column px-4 mx-auto mt-5 mb-5'>
        {/* What's Different */}
        <div className='d-flex flex-column justify-content-center align-items-center align-items-md-start mb-5 col-md-6'>
          <h2 className='text-center text-md-start text-uppercase text-danger fw-bold'>
            ABOUT US
          </h2>
          <p className='text-center text-md-start text-muted'>
            At SS Tax Mentors, we understand that change isn't always easy. Since 2016, we've been dedicated to helping companies navigate industry transitions to stay competitive. With years of experience and expertise, we're committed to serving you better and prioritizing your needs. Our dedicated team is ready to assist you in developing strategies for the future.
          </p>
          <div className="d-flex flex-column align-items-center align-items-md-start mt-4">
            <div className="d-flex align-items-center mb-2">
              <FaPhoneAlt className="text-danger me-2" />
              <span className="text-muted">+91 8801103053</span>
            </div>
            <div className="d-flex align-items-center mb-2">
              <FaEnvelope className="text-danger me-2" />
              <a href="mailto:sstax9646@gmail.com" className="text-muted">sstax9646@gmail.com</a>
            </div>
            <div className="d-flex align-items-start mb-2">
              <FaMapMarkerAlt className="text-danger me-2" />
              <span className="text-muted">Flat No.103, Swathi Ratna Appts, Geeta Hospital lane, Pillar No.1560, Chaitanyapuri, Dilsukhnagar, Hyderabad - 500060</span>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="col-md-6">
          <div className="ratio ratio-16x9">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.8421499989063!2d78.52951267584969!3d17.37132700326633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb98f01bc2d401%3A0xd6107bc012060039!2sSS%20TaxMentors!5e0!3m2!1sen!2sin!4v1715017921390!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
