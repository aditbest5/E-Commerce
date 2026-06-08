import React from "react";

const Footer = () => {
  return (
    <footer className='border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-brand-darker/50 py-8 mt-24 transition-colors duration-300'>
      <div className='container mx-auto text-center text-slate-500 dark:text-gray-400 font-light'>
        <p className="text-sm tracking-wide">&copy; 2023 PT. Arneva Teknologi Solusi. All rights reserved.</p>
        <p className='mt-2 text-xs opacity-75'>
          Gedung Graha Kas Lt.3, Kota Jakarta Selatan, Indonesia
        </p>
      </div>
    </footer>
  );
};

export default Footer;
