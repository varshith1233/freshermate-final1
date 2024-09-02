import { Link as ScrollLink } from 'react-scroll';

const Footer = () => {
  return (
    <div className='bg-dark'>
      {/* Container */}
      <div className='container d-flex flex-column flex-md-row justify-content-between align-items-center py-4'>
        {/* Logo and social links container */}
        <div className='d-flex flex-column-reverse flex-md-column align-items-center align-items-md-start mb-3 mb-md-0'>
          {/* Mobile View Text */}
          <div className='text-center text-white d-md-none mb-2'>
            Copyright © 2024 All Rights Reserved © SS Tax Mentors
          </div>
          
          {/* Logo */}
          {/* <div className='mb-3'>
            <img src={companyLogoWhite} className='h-20 w-70' alt='SS Tax Mentors Logo' />
          </div> */}
          
          {/* Desktop View Text */}
          <div className='text-white d-none d-md-block text-sm'>
            Copyright © 2024 All Rights Reserved © SS Tax Mentors
          </div>
        </div>

        {/* List Container */}
        <div className='d-flex justify-content-center'>
          <div className='d-flex flex-column text-white'>
            <ScrollLink to='testimonials' smooth={true} duration={500} className='text-white mb-2 text-decoration-none hover'>
              Features
            </ScrollLink>
            <ScrollLink to='features' smooth={true} duration={500} className='text-white mb-2 text-decoration-none hover'>
              Why Us?
            </ScrollLink>
            <ScrollLink to='services' smooth={true} duration={500} className='text-white mb-2 text-decoration-none hover'>
              Services
            </ScrollLink>
            <ScrollLink to='contact-us' smooth={true} duration={500} className='text-white mb-2 text-decoration-none hover'>
              Contact Us
            </ScrollLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
