const Footer = () => {
  return (
    <footer className="text-gray-200 border-t py-6 px-4 mt-20 ml-53 bg-gray-950">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        {/* Left Section - Branding */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold text-white">Sociogram</h2>
          <p className="text-sm text-gray-400">
            Connecting people, one post at a time.
          </p>
        </div>

        {/* Middle Section - Navigation Links */}
        <div className="flex flex-wrap justify-center gap-5 text-sm md:text-base">
          <a href="#" className="hover:text-white transition-colors">
            Home
          </a>
          <a href="#" className="hover:text-white transition-colors">
            About
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Contact
          </a>
        </div>

        {/* Right Section - Social Links */}
        <div className="flex space-x-5 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-sm text-gray-200 mt-6 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Findster. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
