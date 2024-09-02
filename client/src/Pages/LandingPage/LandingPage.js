// import { BrowserRouter } from 'react-router-dom';

import Navbar from '../../Components/LandingPage/Navbar';
import Hero from '../../Components/LandingPage/Hero';
import Features from '../../Components/LandingPage/Features';
import Testimonial from '../../Components/LandingPage/Testimonial';
// import CallToAction from '../../Components/LandingPage/CallToAction';
import Footer from '../../Components/LandingPage/Footer';
// import Front from '../../Components/LandingPage/Front';
// import Services from '../../Components/LandingPage/Services';
import AboutUs from '../../Components/LandingPage/AboutUs';
// import WhatsappWidget from '../../Components/LandingPage/WhatsappWidget';
// import ClientLogos from '../../Components/LandingPage/Clients';
// import CallWidget from '../../Components/LandingPage/CallWidget'
 
function LandingPage() {
  return (
    // <BrowserRouter>
    <div>
        {/* <WhatsappWidget/> */}
        {/* <CallWidget/> */}
        <Navbar />
        <Hero />
        <Testimonial />
        <Features />
        {/* <Front/> */}
        {/* <Services /> */}
        <AboutUs/>
        {/* <ClientLogos/> */}
        {/* <CallToAction /> */}
        <Footer />
    </div>
    // </BrowserRouter>
  );
}

export default LandingPage;