import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import companyLogo from '../../Assets/LogoNavbar/Logo.png';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const toggleMenuHandler = () => {
    setToggleMenu(!toggleMenu);
  };

  const closeMenuHandler = () => {
    setToggleMenu(false);
  };

  return (
    <nav className="relative container mx-auto p-6">
      <div className="flex items-center justify-between">
        {/* Logo Section */}
        <div className="pt-1">
          <img src={companyLogo} className="h-20" alt="Company Logo" />
        </div>

        {/* Desktop Menu Items */}
        <div className="hidden md:flex space-x-8">
          <ScrollLink
            to="testimonials"
            smooth={true}
            duration={500}
            className="hover:text-brightRed transition duration-300 cursor-pointer"
            onClick={closeMenuHandler}
          >
            Features
          </ScrollLink>
          <ScrollLink
            to="features"
            smooth={true}
            duration={500}
            className="hover:text-brightRed transition duration-300 cursor-pointer"
            onClick={closeMenuHandler}
          >
            WhyUs?
          </ScrollLink>
          <ScrollLink
            to="services"
            smooth={true}
            duration={500}
            className="hover:text-brightRed transition duration-300 cursor-pointer"
            onClick={closeMenuHandler}
          >
            Services
          </ScrollLink>
          <ScrollLink
            to="contact-us"
            smooth={true}
            duration={500}
            className="hover:text-brightRed transition duration-300 cursor-pointer"
            onClick={closeMenuHandler}
          >
            Contact
          </ScrollLink>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden flex items-center">
          <button
            className={`hamburger focus:outline-none ${toggleMenu ? 'open' : ''}`}
            onClick={toggleMenuHandler}
            aria-label="Toggle menu"
          >
            <span className="hamburger-top"></span>
            <span className="hamburger-middle"></span>
            <span className="hamburger-bottom"></span>
          </button>
        </div>

        {/* Login/Signup Button for Desktop */}
        <Link
          to="/login"
          className="hidden md:block p-3 px-6 text-white bg-brightRed rounded-full hover:bg-brightRedLight transition duration-300"
        >
          Login / Signup
        </Link>
      </div>

      {/* Mobile Menu */}
      {toggleMenu && (
        <div className="absolute flex flex-col items-center self-end py-8 mt-10 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md md:hidden">
          <ScrollLink
            to="testimonials"
            smooth={true}
            duration={500}
            className="hover:text-brightRed transition duration-300"
            onClick={closeMenuHandler}
          >
            Features
          </ScrollLink>
          <ScrollLink
            to="features"
            smooth={true}
            duration={500}
            className="hover:text-brightRed transition duration-300"
            onClick={closeMenuHandler}
          >
            WhyUs?
          </ScrollLink>
          <ScrollLink
            to="services"
            smooth={true}
            duration={500}
            className="hover:text-brightRed transition duration-300"
            onClick={closeMenuHandler}
          >
            Services
          </ScrollLink>
          <ScrollLink
            to="contact-us"
            smooth={true}
            duration={500}
            className="hover:text-brightRed transition duration-300"
            onClick={closeMenuHandler}
          >
            Contact
          </ScrollLink>
          {/* Login/Signup Button for Mobile */}
          <Link
            to="/login"
            className="p-3 px-6 text-white bg-brightRed rounded-full hover:bg-brightRedLight transition duration-300"
            onClick={closeMenuHandler}
          >
            Login / Signup
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
