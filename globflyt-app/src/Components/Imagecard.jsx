import { Link } from 'react-router-dom';

import React, { useEffect, useState } from 'react';

function Imagecard() {
    const [animateOcean, setAnimateOcean] = useState(false);
    const [animateResort, setAnimateResort] = useState(false);
    const [animateBeach, setAnimateBeach] = useState(false);

    useEffect(() => {
        setAnimateOcean(true);
        setAnimateResort(true);
        setAnimateBeach(true);
    }, []);

    return (
        <div>

            <h className="absolute top-3 left-32 text-3xl -translate-x-1/2">
                <img className='absolute right-24 shadow-lg w-9 -translate-x-1/2 rounded-full h-9' src={"https://i.imgur.com/Z2AV76a.png"} alt="Globflyt Logo" />
                <span style={{ color: 'black' }}>Glob</span>
                <span style={{ color: 'red' }}>flyt</span>
            </h>


            <div className='absolute bg-blue-300 shadow-gray-900 w-full h-28 top-16 z-10 overflow-hidden'
            style={{ backgroundImage: `url(${"https://i.imgur.com/36lY4Wg.png"})` }}>
                <img
                    className={` shadow-lg w-48 h-48 z-20 rounded-t-lg ${animateResort ? 'animate-Image3-loop' : ''}`}
                    src={"https://i.imgur.com/aKplaWI.jpeg"}
                    alt="Image3"
                />
                <img
                    className={` shadow-lg w-60 h-32 z-30 rounded-t-lg ${animateBeach ? 'animate-Image4-loop' : ''}`}
                    src={"https://i.imgur.com/uLzfBkc.jpeg"}
                    alt="Image4"
                />
                <img
                    className={` shadow-lg w-60 h-32 z-40 rounded-t-lg ${animateBeach ? 'animate-Image5-loop' : ''}`}
                    src={"https://i.imgur.com/A6pnHWI.jpeg"}
                    alt="Image5"
                />
                <img
                    className={` shadow-lg w-60 h-32 z-50 rounded-t-lg ${animateBeach ? 'animate-Image6-loop' : ''}`}
                    src={"https://i.imgur.com/wb4U8hB.jpeg"}
                    alt="Image6"
                />

            </div>
            <div className=' top-[23rem] text-5xl left-10 skew-x-12 italic absolute'>
            <h>Globflyt</h>
            </div>
            <div className=' text-xl left-20 top-[26rem] absolute font-mono italic -skew-x-12 '>
            <h6>Easily find fun and history in unique locations.</h6>
            </div>



            
            <div className='absolute top-44 right-4 sm:right-16'>
  <img
    className={`shadow-pink-300 rounded-full 
      w-36 h-36 sm:w-48 sm:h-48 md:w-60 md:h-60 
      ${animateBeach ? 'book1' : ''}`}
    src={"https://i.imgur.com/e9sJH9h.jpeg"}
    alt="book1"
  />
</div>


        </div>
    );
}
export default Imagecard;
