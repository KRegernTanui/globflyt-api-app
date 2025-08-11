import Signincard from "./Signincard";
import LoginCard from "./LoginCard";
import DropdownNav from "./DropdownNav";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import traveldata from "./data.json";

const useQuery = () => new URLSearchParams(useLocation().search);

function Viewtab() {
  const query = useQuery();
  const navigate = useNavigate();
  const selectedId = parseInt(query.get("id"));

  const [selected, setSelected] = useState(formatPlace(traveldata[0]));
  const [gridItems, setGridItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");



  const [isMobile, setIsMobile] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
    const [showLogIn, setShowLogIn] = useState(false);
    const [showAboutCard, setShowAboutCard] = useState(false);
    const [showContactCard, setShowContactCard] = useState(false);
    const [showPrivacyCard, setShowPrivacyCard] = useState(false);

  useEffect(() => {
    document.title = "Globflyt";
    const heroItemRaw = traveldata.find((d) => d.id === selectedId) || traveldata[0];
    const heroItem = formatPlace(heroItemRaw);
    const rest = traveldata.filter((d) => d.id !== heroItemRaw.id).map(formatPlace);

    setSelected(heroItem);
    setGridItems(shuffleArray(rest));
    window.scrollTo(0, 0);
  }, [selectedId]);

  const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex],
      ];
    }
    return array;
  };

  const handleSelect = (place) => {
    setLoading(true);
    setLoadingText(`Loading ${place.title}...`);
    setTimeout(() => {
      navigate(`/viewtab?id=${place.id}`);
      setLoading(false);
    }, 5000);
  };

  function formatPlace(place) {
    const images = Array.isArray(place.images)
      ? place.images.map((img) => (typeof img === "string" ? { url: img } : img))
      : place.image
      ? [{ url: place.image }]
      : [];
    return { ...place, images };
  }

  const getImageUrl = (img) => (typeof img === "string" ? img : img.url);

  return (
    <div className="bg-slate-100 min-h-screen font-inter">
      
      <div className="bg-slate-100 h-16 fixed top-0 left-0 right-0 z-40 flex items-center px-6 text-3xl shadow-md">
        <Link to="/" className="flex items-center gap-2">
          <img
            className="shadow-lg w-9 h-9 rounded-full"
            src={"https://i.imgur.com/Z2AV76a.png"}
            alt="Globflyt Logo"
          />
          <span className="black-white">Glob</span>
          <span className="text-red-400">flyt</span>
        </Link>
      </div>

      
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
            <p className="text-gray-700">🔐 Full details will be available soon.</p>
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
      
      







      <div className="pt-20 px-6">
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900 bg-opacity-80">
            <div className="text-white text-xl animate-pulse">{loadingText}</div>
          </div>
        )}

        <section className="mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-2/3">
                <img
                  src={getImageUrl(selected.images[0])}
                  alt={selected.title}
                  className="w-full h-full max-h-72 object-cover rounded-lg shadow-md"
                />
              </div>
              <div className="md:w-2/3 w-full flex flex-col justify-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {selected.title}
                </h1>
                <p className="text-gray-600">{selected.summary}</p>
              </div>
            </div>

            {selected.images.length > 1 && (
              <div className="overflow-x-auto whitespace-nowrap pb-2">
                <div className="flex gap-4">
                  {selected.images.slice(1).map((img, idx) => (
                    <img
                      key={idx}
                      src={getImageUrl(img)}
                      alt={`${selected.title} gallery ${idx + 2}`}
                      className="h-20 w-36 object-cover rounded-md shadow-sm inline-block"
                    />
                  ))}
                </div>
              </div>
            )}

            {selected.video && (
              <iframe
                src={selected.video}
                title={selected.title}
                className="w-full h-64 rounded"
                allowFullScreen
              />
            )}
          </div>
        </section>

        <section className="py-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {gridItems.map((place) => (
              <div
                key={place.id}
                onClick={() => handleSelect(place)}
                className="cursor-pointer bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden transition transform hover:scale-105"
              >
                <img
                  src={getImageUrl(place.images[0])}
                  alt={place.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-3">
                  <h3 className="text-sm font-semibold truncate">{place.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{place.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Viewtab;
