import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import "../index.css";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white py-2 mt-4 relative overflow-hidden">
      {/* Texture Overlay */}
      <div className="absolute inset-0 bg-noise opacity-20"></div>

      <div className="container mx-auto px-2 sm:px-4 md:px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="text-center">
          <p className="text-base sm:text-lg font-semibold mb-1">
            Coding Stars &copy; 2024:25
          </p>
          <p className="text-xs sm:text-sm mb-2">
            Your trusted partner in building Software as a Service, providing cutting-edge solutions.
          </p>
          
          {/* Contact Email */}
          <p className="text-xs sm:text-sm mb-2">
            <span>Contact us: </span>
            <a
              href="mailto:codingstars40@gmail.com"
              className="text-white hover:underline"
            >
              codingstars40@gmail.com
            </a>
          </p>

          {/* Social Media Links */}
          <div className="flex justify-center space-x-3 sm:space-x-4 mt-2 sm:mt-4">
            <a
              href="https://www.pythonstars.blogspot.com"
              className="text-white hover:text-blue-200 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a
              href="https://www.pythonstars.blogspot.com"
              className="text-white hover:text-blue-200 transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a
              href="https://www.github.com/ram8528"
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={20} className="sm:w-6 sm:h-6" />
            </a>
          </div>
        </div>

        {/* Bottom Footer (optional) */}
        <div className="mt-2 sm:mt-4 text-center text-xs text-white">
          <p>
            SaaS : Designed and developed by the Coding Stars team. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;