import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';

function DropdownNav({ onAboutClick, onContactClick, onPrivacyClick, onSignInClick, onLogInClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="absolute top-4 right-3 z-50 text-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-slate-100 border-2 border-cyan-100 px-3 py-2 w-40 h-10 rounded-lg hover:bg-cyan-300 flex items-center gap-2"
      >
        <FaBars className='text-slate-950 hover:bg-cyan-300 hover:text-white' />
        <span className="text-lg hover:text-white hover:bg-cyan-300 text-slate-800">More</span>
      </button>

      {isOpen && (
        <div className="mt-2 bg-cyan-300 absolute rounded-lg shadow-lg py-2 flex flex-col items-start min-w-[180px]">
          <button
            onClick={onPrivacyClick}
            className="px-4 py-2 hover:bg-slate-600 w-full text-left text-white"
          >
            Privacy Terms
          </button>
          <button
            onClick={onContactClick}
            className="px-4 py-2 hover:bg-slate-600 w-full text-left text-white"
          >
            Contact Us
          </button>
          <button
            onClick={onAboutClick}
            className="px-4 py-2 hover:bg-slate-600 w-full text-left text-white"
          >
            About Us
          </button>

          {isMobile && (
            <>
              <button
                onClick={onSignInClick}
                className="px-4 py-2 hover:bg-slate-600 w-full text-left text-white"
              >
                Sign In
              </button>
              <button
                onClick={onLogInClick}
                className="px-4 py-2 hover:bg-slate-600 w-full text-left text-white"
              >
                Log In
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default DropdownNav;
