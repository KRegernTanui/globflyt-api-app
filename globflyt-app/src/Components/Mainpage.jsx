import Ocean from './Ocean.png';
import Resort from './Resort.png';
import Beach from './Beach.png';
import Icon from './Icon.png';

function Mainpage() {
    return (
        <div className="bg-slate-800 h-16 text-5xl relative">
            <h className="absolute top-3 left-32 text-3xl -translate-x-1/2">
            <img className=' absolute right-24 shadow-lg w-9 -translate-x-1/2 rounded-full h-9 ' src={Icon} alt="fish" />
                <span style={{ color: 'black' }}>Glob</span>
                <span style={{ color: 'red' }}>flyt</span>
            </h>
            <div className='absolute bg-sky-300 shadow-xl w-full h-32 top-16 left-0 z-10 ' >
                <img className=' absolute shadow-lg w-56 left-32 h-28 z-10 top-1 ' src={Ocean} alt="fish" />
                <img className=' absolute shadow-lg w-56 left-44 h-28 z-10 top-2 ' src={Resort} alt="fish" />
                <img className=' absolute shadow-lg w-56 left-52 h-28 z-10 top-3 ' src={Beach} alt="fish" />
            </div>
            <div className=' relative text-orange-900 top-56 h-8 text-2xl shadow-2xl ' >
                <h>Top destinations</h>
            </div>

        </div>
    );
}
export default Mainpage;