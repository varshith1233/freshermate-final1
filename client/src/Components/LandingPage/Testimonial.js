import { Link } from 'react-router-dom';

// import avatarAnisha from '../assets/images/ic1.png';
// import avatarAli from '../assets/images/ic2.png';
// import avatarRichard from '../assets/images/ic3.png';

const handleGetStartedClick = () => {
  // Redirect to WhatsApp with the specified phone number and message
  window.open('https://wa.me/+918801103053?text=Hello SSTax Mentors!', '_blank');
};

const Testimonial = () => {
  return (
    <section id='testimonials' className="bg-light py-5">
      {/* Container to heading and testimonial blocks */}
      <div className='container text-center'>
        {/* Heading */}
        <h2 className='display-4 text-uppercase font-weight-bold mb-4'>
          What's Different About <span className='text-danger'>SS TAX MENTORS</span>?
        </h2>

        {/* Testimonials Container */}
        <div className='row'>
          {/* Testimonial 1 */}
          <div className='col-md-4 mb-4'>
            <div className='card h-100 shadow-sm'>
              <div className="card-header bg-danger text-white">
                Simplified Tax Processes
              </div>
              <div className='card-body'>
                {/* <img src={avatarAnisha} className='img-fluid mb-3' alt='Anisha Avatar' /> */}
                <h5 className='card-title text-danger text-uppercase'>Simplified Tax Processes</h5>
                <p className='card-text'>
                  SS Tax Mentors simplifies tax processes with streamlined solutions, ensuring navigating complexities is effortless for clients. Our tailored approach guarantees hassle-free experiences.
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className='col-md-4 mb-4'>
            <div className='card h-100 shadow-sm'>
              <div className="card-header bg-danger text-white">
                Focus on Growth
              </div>
              <div className='card-body'>
                {/* <img src={avatarAli} className='img-fluid mb-3' alt='Ali Avatar' /> */}
                <h5 className='card-title text-danger text-uppercase'>Focus on Growth</h5>
                <p className='card-text'>
                  With a focus on growth, SS Tax Mentors handles numbers, freeing businesses to concentrate on expansion. Entrusting us with financial management aids clients in achieving their goals more effectively.
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className='col-md-4 mb-4'>
            <div className='card h-100 shadow-sm'>
              <div className="card-header bg-danger text-white">
                Financial Clarity
              </div>
              <div className='card-body'>
                {/* <img src={avatarRichard} className='img-fluid mb-3' alt='Richard Avatar' /> */}
                <h5 className='card-title text-danger text-uppercase'>Financial Clarity</h5>
                <p className='card-text'>
                  SS Tax Mentors fosters trust through transparent financial management, ensuring clients fulfill fiduciary responsibilities confidently. Our guidance builds strong relationships, paving the way for long-term success.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className='mt-4'>
          <button
            onClick={handleGetStartedClick}
            className='btn btn-danger btn-lg me-3'
          >
            Get Started
          </button>
          <Link
            to='/login'
            className='btn btn-danger btn-lg'
          >
            Login / Signup
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
