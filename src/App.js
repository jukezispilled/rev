import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isReviving, setIsReviving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isRevived, setIsRevived] = useState(false);

  useEffect(() => {
    let interval;
    if (isReviving) {
      interval = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(interval);
            setIsRevived(true);
            setIsReviving(false);
            return 100;
          }
          return Math.min(oldProgress + 2, 100);
        });
      }, 20);
    } else if (!isRevived) {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [isReviving, isRevived]);

  const startReviving = () => {
    if (!isRevived) {
      setIsReviving(true);
    }
  };

  const stopReviving = () => {
    if (!isRevived) {
      setIsReviving(false);
    }
  };

  const resetRevive = () => {
    setIsRevived(false);
    setProgress(0);
  };

  return (
    <div
      className="h-screen w-screen flex flex-col justify-center items-center relative font-custom"
      style={{
        backgroundImage: 'url(/bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onMouseDown={startReviving}
      onMouseUp={stopReviving}
      onMouseLeave={stopReviving}
      onTouchStart={startReviving}
      onTouchEnd={stopReviving}
    >
      <div className='-mt-[45%] md:-mt-[20%] relative'
        style={{ userSelect: 'none' }}>
        {!isReviving && !isRevived && <img src="rev.png" alt="Rev" />}
        {isReviving && (
          <div className="reviving-container">
            <div className="reviving-text text-[#00ff00] text-[26px]">REVIVING</div>
            <svg className="reviving-animation" viewBox="0 0 100 100">
              <circle
                className="reviving-background"
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#ffffff"
                strokeWidth="10"
                strokeOpacity="0.3"
              />
              <circle
                className="reviving-progress"
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#00ff00"
                strokeWidth="10"
                strokeDasharray={`${progress * 2.83} 283`}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="reviving-icon">+</div>
          </div>
        )}
        {isRevived && (
          <div className="revived-container">
            <div className="revived-text text-[#00ff00] text-[26px]">REVIVED!</div>
          </div>
        )}
      </div>
      <div className="absolute bottom-4 left-4 text-white text-sm md:text-base">
        {isRevived
          ? 'Successfully revived!'
          : `${window.innerWidth < 768 ? 'Touch' : 'Click'} and hold to revive`}
      </div>
      <div className='absolute top-3 right-3 md:flex space-x-1 items-center z-[50] hidden'>
        <a href="https://x.com/" className='transition ease-in-out duration-150'>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className='size-14' viewBox="0 0 50 50">
            <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
          </svg>
        </a>
        <a href="https://t.me/" className='transition ease-in-out duration-150'>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className='size-14' viewBox="0 0 48 48">
            <path fill="#29b6f6" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"></path><path fill="#fff" d="M33.95,15l-3.746,19.126c0,0-0.161,0.874-1.245,0.874c-0.576,0-0.873-0.274-0.873-0.274l-8.114-6.733 l-3.97-2.001l-5.095-1.355c0,0-0.907-0.262-0.907-1.012c0-0.625,0.933-0.923,0.933-0.923l21.316-8.468 c-0.001-0.001,0.651-0.235,1.126-0.234C33.667,14,34,14.125,34,14.5C34,14.75,33.95,15,33.95,15z"></path><path fill="#b0bec5" d="M23,30.505l-3.426,3.374c0,0-0.149,0.115-0.348,0.12c-0.069,0.002-0.143-0.009-0.219-0.043 l0.964-5.965L23,30.505z"></path><path fill="#cfd8dc" d="M29.897,18.196c-0.169-0.22-0.481-0.26-0.701-0.093L16,26c0,0,2.106,5.892,2.427,6.912 c0.322,1.021,0.58,1.045,0.58,1.045l0.964-5.965l9.832-9.096C30.023,18.729,30.064,18.416,29.897,18.196z"></path>
          </svg>
        </a>
      </div>
      <div className='absolute bottom-3 right-3 flex space-x-1 items-center z-[50] md:hidden'>
        <a href="https://x.com/" className='transition ease-in-out duration-150'>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className='size-14' viewBox="0 0 50 50">
            <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
          </svg>
        </a>
        <a href="https://t.me/" className='transition ease-in-out duration-150'>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className='size-14' viewBox="0 0 48 48">
            <path fill="#29b6f6" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"></path><path fill="#fff" d="M33.95,15l-3.746,19.126c0,0-0.161,0.874-1.245,0.874c-0.576,0-0.873-0.274-0.873-0.274l-8.114-6.733 l-3.97-2.001l-5.095-1.355c0,0-0.907-0.262-0.907-1.012c0-0.625,0.933-0.923,0.933-0.923l21.316-8.468 c-0.001-0.001,0.651-0.235,1.126-0.234C33.667,14,34,14.125,34,14.5C34,14.75,33.95,15,33.95,15z"></path><path fill="#b0bec5" d="M23,30.505l-3.426,3.374c0,0-0.149,0.115-0.348,0.12c-0.069,0.002-0.143-0.009-0.219-0.043 l0.964-5.965L23,30.505z"></path><path fill="#cfd8dc" d="M29.897,18.196c-0.169-0.22-0.481-0.26-0.701-0.093L16,26c0,0,2.106,5.892,2.427,6.912 c0.322,1.021,0.58,1.045,0.58,1.045l0.964-5.965l9.832-9.096C30.023,18.729,30.064,18.416,29.897,18.196z"></path>
          </svg>
        </a>
      </div>
      <div
        className="absolute top-3 md:left-3 flex justify-center"
      >
        <div className="font-custom flex flex-col sm:flex-row justify-center bg-red-600 z-10 items-center gap-1 md:gap-3 px-5 py-3 max-w-full border-2 border-yellow-400">
          <button
            className="text-sm md:text-xl font-bold bg-yellow-400 md:hover:bg-vlue-500 transition duration-150 ease-in-out text-white py-2 px-4 border-2 border-yellow-400 z-10 whitespace-nowrap"
          >
            CA
          </button>
          <div className="text-sm md:text-lg overflow-x-auto whitespace-nowrap font-custom text-yellow-400">
            updating...
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;