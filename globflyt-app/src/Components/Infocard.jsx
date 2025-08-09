import React, { useState, useEffect } from 'react';

async function fetchPlaceDetails(xid) {
  try {
    const res = await fetch(`http://localhost:3001/api/details/${xid}`);
    if (!res.ok) throw new Error('Failed to fetch details');
    const json = await res.json();
    return json;
  } catch (error) {
    console.error(`Error fetching details for xid ${xid}:`, error);
    return null;
  }
}

function Infocard() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    async function getPlaces() {
      try {
        const res = await fetch(
          `http://localhost:3001/api/place?lat=-1.286389&lon=36.817223`
        );
        const json = await res.json();
        const detailedPlaces = await Promise.all(
          json.map((place) => fetchPlaceDetails(place.xid))
        );
        const validPlaces = detailedPlaces.filter((place) => place !== null);
        setPlaces(validPlaces);
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    }

    getPlaces();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {places.map((place) => (
        <div key={place.xid} className="p-0 rounded-xl shadow-gray-600 bg-white">
          {place.preview?.source ? (
            <img
              src={place.preview.source}
              alt={place.name || 'Place'}
              className="w-full h-32 object-cover rounded"
            />
          ) : (
            <div className="w-full h-52 bg-blue-300 flex items-center justify-center text-gray-600">
              Location image unavailable!
            </div>
          )}
          <h3 className="font-semibold text-lg text-black mt-2">
            {place.name || 'Unnamed Place'}
          </h3>
          <p className="text-white-950 text-l">{place.xid}</p>
        </div>
      ))}
    </div>
  );
}

export default Infocard;
