import React from 'react';

export default function ResponsiveFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      {/* Important: ensure your HTML includes <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" /> */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* grid will stack on small screens and become 4 columns on md+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <h3 className="text-white text-lg sm:text-xl font-semibold mb-3">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Careers</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Editorial Team</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Protection</a>
              </li>
            </ul>
          </div>

          {/* More */}
          <div>
            <h3 className="text-white text-lg sm:text-xl font-semibold mb-3">More</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Terms &amp; Conditions</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Privacy</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Advertise</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Join as Courier</a>
              </li>
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h3 className="text-white text-lg sm:text-xl font-semibold mb-3">Our Partners</h3>
            <p className="text-gray-400 mb-3 text-sm">Trusted partners that help us deliver fast and safely.</p>

            <div className="flex flex-wrap gap-3 items-center">
              {/* Replace these with <img src="..." alt="partner" /> for real logos */}
              <div className="h-10 min-w-[64px] flex items-center justify-center bg-gray-800 rounded px-3">Logo</div>
              <div className="h-10 min-w-[64px] flex items-center justify-center bg-gray-800 rounded px-3">Logo</div>
              <div className="h-10 min-w-[64px] flex items-center justify-center bg-gray-800 rounded px-3">Logo</div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg sm:text-xl font-semibold mb-3">Contact</h3>
            <p className="text-gray-400">DC, Washington</p>
            <p className="text-gray-400 mt-1">+1 (503) 894-2813</p>
            <a href="mailto:onefunlogistics@myfunllc.com" className="text-gray-400 mt-1 inline-block hover:text-white">onefunlogistics@myfunllc.com</a>

            <div className="mt-4 flex items-center gap-3">
              {/* Use icon components or <img> icons for production */}
              <a href="#" aria-label="facebook" className="text-gray-400 hover:text-white transition-colors">FB</a>
              <a href="#" aria-label="twitter" className="text-gray-400 hover:text-white transition-colors">TW</a>
              <a href="#" aria-label="instagram" className="text-gray-400 hover:text-white transition-colors">IG</a>
            </div>
          </div>
        </div>

        {/* bottom row: stacks on mobile, horizontal on md+ */}
        <div className="mt-8 border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center md:items-center justify-between gap-3">
          <p className="text-gray-400 text-sm text-center md:text-left">Copyright © 2025 OneFun Logistics. All rights reserved.</p>
          <p className="text-red-400 text-sm">Designed by SpidermanX</p>
        </div>
      </div>
    </footer>
  );
}
