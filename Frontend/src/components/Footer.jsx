import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-auto py-10 border-t border-white/5 bg-slate-950/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-black text-white mb-4 tracking-tight">ALPHA <span className="text-indigo-500">STORE</span></h2>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Premium E-commerce platform built for the next generation of online shopping.
              Experience seamless browsing and high-quality assets.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="/" className="hover:text-indigo-400 transition-colors">Store</a></li>
              <li><a href="/cart" className="hover:text-indigo-400 transition-colors">Cart</a></li>
              <li><a href="/login" className="hover:text-indigo-400 transition-colors">Login</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Social</h3>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-10 border-t border-white/5 text-center text-slate-500 text-xs">
          © {new Date().getFullYear()} Alpha Store. Built with ❤️ for CodeAlpha.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
