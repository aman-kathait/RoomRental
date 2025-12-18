import React from "react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-[#F8FAFC] border-t border-slate-200 w-full">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-[#0284C7]">RentEasy</h2>
          <p className="mt-3 text-slate-600 text-sm">
            Making rentals simple, secure, and stress-free for everyone.
          </p>
        </div>

        <div>
          <h3 className="text-slate-900 font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>
              <a href="#" className="hover:text-[#0284C7]">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#0284C7]">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#0284C7]">
                Blog
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-slate-900 font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>
              <a href="#" className="hover:text-[#0284C7]">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#0284C7]">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#0284C7]">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-slate-900 font-semibold mb-3">Follow Us</h3>
          <p className="text-sm text-slate-600 mb-4">
            Stay connected with RentEasy on social media.
          </p>

          <div className="flex gap-4">
            <a
              href="#"
              aria-label="Facebook"
              className="p-2 rounded-full border border-slate-300 text-slate-600 hover:bg-[#0284C7] hover:text-white hover:border-[#0284C7] transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.5V12H16l-.4 3h-2.1v7A10 10 0 0 0 22 12z" />
              </svg>
            </a>

            <a
              href="#"
              aria-label="Instagram"
              className="p-2 rounded-full border border-slate-300 text-slate-600 hover:bg-[#0284C7] hover:text-white hover:border-[#0284C7] transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 2 .3 2.7.6a5.4 5.4 0 0 1 2 1.3 5.4 5.4 0 0 1 1.3 2c.3.7.5 1.5.6 2.7.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.3 2-.6 2.7a5.4 5.4 0 0 1-1.3 2 5.4 5.4 0 0 1-2 1.3c-.7.3-1.5.5-2.7.6-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-2-.3-2.7-.6a5.4 5.4 0 0 1-2-1.3 5.4 5.4 0 0 1-1.3-2c-.3-.7-.5-1.5-.6-2.7-.1-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-1.2.3-2 .6-2.7a5.4 5.4 0 0 1 1.3-2 5.4 5.4 0 0 1 2-1.3c.7-.3 1.5-.5 2.7-.6C8.4 2.2 8.8 2.2 12 2.2zm0 3.3a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zm0 10.7a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0 8.4zm6.8-11.4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 py-4 text-center text-sm text-slate-500">
        © 2025 <span className="text-[#0284C7] font-medium">RentEasy</span>. All
        rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
