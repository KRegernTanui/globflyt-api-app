import React, { useState, useEffect, useRef } from "react";
import traveldata from './data.json';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Imagecard from "./Imagecard";
import Searchbar from "./Searchbar";
import Infocard from "./Infocard";
import DropdownNav from './DropdownNav';
import Signincard from './Signincard';
import LoginCard from "./LoginCard";

function HomePage() {
  const [destinationCount, setDestinationCount] = useState(0);
  const scrollContainerRef = useRef(null);
  const [shuffledTravelData, setShuffledTravelData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isPaginating, setIsPaginating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);
  const [showAboutCard, setShowAboutCard] = useState(false);
  const [showContactCard, setShowContactCard] = useState(false);
  const [showPrivacyCard, setShowPrivacyCard] = useState(false);
  const aboutUsRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    document.title = `Globflyt`;
  }, [destinationCount]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  };

  useEffect(() => {
    setShuffledTravelData(shuffleArray([...traveldata]));
  }, []);
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 200;
      const spaceX = 24;
      const scrollAmount = (cardWidth * 5) + (spaceX * 4);
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 200;
      const spaceX = 24;
      const scrollAmount = (cardWidth * 5) + (spaceX * 4);
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setIsLoading(true);
    try {
      const geoRes = await fetch(`http://localhost:3001/api/geoname?name=${searchTerm}`);
      const geoData = await geoRes.json();
      const { lat, lon } = geoData;

      const placesRes = await fetch(
        `http://localhost:3001/api/place?lat=${lat}&lon=${lon}`
      );
      const placesData = await placesRes.json();

      const detailedPlaces = await Promise.all(
        placesData.map((place) =>
          fetch(`http://localhost:3001/api/details/${place.xid}`)
            .then((res) => res.json())
            .catch(() => null)
        )
      );

      const validPlaces = detailedPlaces.filter((place) => place !== null);
      setSearchResults((prev) =>
        offset === 0 ? validPlaces : [...prev, ...validPlaces]
      );
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Imagecard />

      <Searchbar
        searchTerm={searchTerm}
        setSearchTerm={(term) => {
          setSearchTerm(term);
          setOffset(0);
          setSearchResults([]);
        }}
        handleSearch={handleSearch}
        isLoading={isLoading}
      />

      <DropdownNav
        onAboutClick={() => setShowAboutCard(true)}
        onContactClick={() => setShowContactCard(true)}
        onPrivacyClick={() => setShowPrivacyCard(true)}
        onSignInClick={() => setShowSignIn(true)}
        onLogInClick={() => setShowLogIn(true)}
      />

      {!isMobile && (
        <>
          <button
            onClick={() => setShowSignIn(true)}
            className="absolute px-2 text-center h-10 text-lg top-4 right-48 rounded-xl border-2 bg-slate-100 border-cyan-100 text-slate-800 hover:bg-cyan-300 hover:text-white transition-colors duration-200"
          >
            Sign in
          </button>
          <button
            onClick={() => setShowLogIn(true)}
            className="absolute px-2 text-center h-10 text-lg top-4 right-72 rounded-xl border-2 bg-slate-100 border-cyan-100 text-slate-800 hover:bg-cyan-300 hover:text-white transition-colors duration-200"
          >
            Log in
          </button>
        </>
      )}
      {showAboutCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center w-80 border border-slate-300">
            <h2 className="text-xl font-bold text-slate-800 mb-2">About Us</h2>
            <p className="text-gray-700">🚧 Will be available soon.</p>
            <button
              onClick={() => setShowAboutCard(false)}
              className="mt-4 px-4 py-2 bg-pink-700 hover:bg-pink-800 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showContactCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center w-80 border border-slate-300">
            <h2 className="text-xl font-bold text-slate-800 mb-2">Contact Us</h2>
            <p className="text-gray-700">📫 We'll be reachable soon!</p>
            <button
              onClick={() => setShowContactCard(false)}
              className="mt-4 px-4 py-2 bg-pink-700 hover:bg-pink-800 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showPrivacyCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center w-80 border border-slate-300">
            <h2 className="text-xl font-bold text-slate-800 mb-2">Privacy Terms</h2>
            <p className="text-gray-700">🔐 We're refining our privacy policy. Full details will be available soon.</p>
            <button
              onClick={() => setShowPrivacyCard(false)}
              className="mt-4 px-4 py-2 bg-pink-700 hover:bg-pink-800 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {showSignIn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
          <Signincard onClose={() => setShowSignIn(false)} />
        </div>
      )}

      {showLogIn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
          <LoginCard onClose={() => setShowLogIn(false)} />
        </div>
      )}

      <div className="absolute top-[30rem] w-full">
        {searchResults.length === 0 ? (
          <div
            className="w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${"https://i.imgur.com/3a07Fhq.png"})` }}
          >
            <h2 className="text-orange-200 mb-4 text-3xl">
              Top destinations
              <h6 className="text-orange-200 top-3 left-56 absolute mb-4 text-sm">(Recommended)</h6>
            </h2>
            <div className="flex items-center left-8 bg-pink-900 rounded-lg py-1">
              <button
                onClick={scrollLeft}
                className="p-3 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 focus:outline-none z-10 mr-3"
                aria-label="Scroll left"
              >
                <FaArrowLeft className="text-xl text-gray-700" />
              </button>
              <div
                ref={scrollContainerRef}
                className="flex overflow-x-hidden space-x-6 py-4 scrollbar-hide"
                style={{ width: 'calc((200px * 4) + (24px * 4))' }}
              >
                {shuffledTravelData.map((destination) => (
                  <div
                    key={destination.id}
                    className="flex-none w-48 h-64 bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <img
                      src={destination.images?.[0]?.url || "https://i.imgur.com/3a07Fhq.png"}
                      alt={destination.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                        {destination.title}
                      </h2>
                      <p className="text-gray-600 text-sm leading-tight mb-2 line-clamp-2">
                        {destination.summary}
                      </p>
                      <Link
                        to="/Viewtab"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Learn more
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={scrollRight}
                className="p-3 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 focus:outline-none z-10 ml-3"
                aria-label="Scroll right"
              >
                <FaArrowRight className="text-xl text-gray-700" />
              </button>
            </div>
            <div className="mt-12">
              <h2 className="text-orange-200 mb-4 text-3xl">More picks for you</h2>
              <Infocard />
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-pink-700 mb-4 text-3xl">Search Results</h2>
            <div className="grid grid-cols-2 gap-4">
              {searchResults.map((place) => {
                const fallbackImage = "https://i.imgur.com/3a07Fhq.png";
                const imageSrc = place.preview?.source || fallbackImage;
                return (
                  <div key={place.xid} className="p-4 rounded shadow bg-white">
                    <img
                      src={imageSrc}
                      alt={place.name || 'Place'}
                      className="w-full h-32 object-cover rounded"
                    />
                    <h3 className="font-semibold text-lg mt-2">
                      {place.name || 'Unnamed Place'}
                    </h3>
                    <p className="text-gray-600 text-sm">{place.kinds}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  setIsPaginating(true);
                  setOffset((prev) => prev + 30);
                  handleSearch().finally(() => setIsPaginating(false));
                }}
                disabled={isPaginating}
                className="bg-pink-700 hover:bg-pink-800 text-white px-4 z-10 py-2 rounded shadow"
              >
                {isPaginating ? 'Loading more...' : 'Next Page'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;
