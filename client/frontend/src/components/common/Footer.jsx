import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1D3C33] text-[#F8F4EC] py-14 font-[serif]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-14 md:gap-16">
        {/* Column 1: About */}
        <div className="col-span-2 md:col-span-1">
          <h2 className="text-2xl font-medium mb-3 ">NCR Farms</h2>
          <p className="text-sm leading-snug mb-3 max-w-[450px]">
            Your trusted partner in agricultural real estate in Delhi NCR. We connect buyers, sellers, and renters with premium agricultural properties and farmhouses across the region.
          </p>

          <div className="text-sm space-y-1">
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              <a href="tel:8920215863" className="hover:underline text-[#F8F4EC]">
                8920215863
              </a>
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              <a
                href="mailto:ravinderofficial@gmail.com"
                className="hover:underline text-[#F8F4EC]"
              >
                ravinderofficial@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/properties" className="hover:underline">Properties</a></li>
            <li><a href="/blog" className="hover:underline">Blog</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/contact" className="hover:underline">Contact Us</a></li>
          </ul>
        </div>

        {/* Column 3: Properties */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Properties</h3>
          <ul className="space-y-1 text-sm">
            <li>Built up Farmhouse</li>
            <li>Gated Farmhouse</li>
            <li>Agricultural Land</li>
            <li>Farmland</li>
          </ul>
        </div>

        {/* Column 4: Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-1 text-sm">
            <li>FAQs</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Column 5: Services */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Services</h3>
          <ul className="space-y-1 text-sm">
            <li>Buy property</li>
            <li>Rent property</li>
            <li>List property</li>
          </ul>

          {/* Social icons */}
          <div className="flex gap-4 mt-6 text-lg">
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="text-center text-sm mt-8  pt-6">
        © {new Date().getFullYear()} NCR Farms. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
