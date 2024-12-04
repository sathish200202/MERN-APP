import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-5 text-gray-600 shadow-[0_-10px_15px_0_rgba(0,0,0,0.1)] border-t-2  py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          {/* Logo or Text */}
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h3 className="text-2xl font-semibold">Your Brand</h3>
            <p className="mt-2 text-gray-400">
              Your tagline or brief description here.
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-gray-700 hover:text-blue-500 transition-colors duration-300 w-6 h-6" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-gray-700 hover:text-blue-400 transition-colors duration-300 w-6 h-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-gray-700 hover:text-pink-500 transition-colors duration-300 w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-gray-700 hover:text-blue-700 transition-colors duration-300 w-6 h-6" />
            </a>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Your Brand. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
