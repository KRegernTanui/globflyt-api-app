import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";

function Signincard({ onClose }) {
  return (
    <div className="border-2 bg-slate-100 border-cyan-100 text-slate-800 transition-colors duration-200 p-8 rounded-xl shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

      
      <button className="flex items-center justify-center w-full mb-4 px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 transition duration-200 shadow">
        <FcGoogle className="text-2xl mr-2" />
        <span className="text-lg font-medium text-gray-700">Sign in with Google</span>
      </button>

      
      <button className="flex items-center justify-center w-full mb-6 px-4 py-2 bg-[#f3f3f3] border border-gray-300 rounded hover:bg-[#e2e2e2] transition duration-200 shadow">
        <FaMicrosoft className="text-xl text-blue-700 mr-2" />
        <span className="text-lg font-medium text-gray-700">Sign in with Microsoft</span>
      </button>

      
      <button
        onClick={onClose}
        className="w-full bg-white text-pink-500 px-4 py-2 rounded hover:bg-pink-100 transition duration-200"
      >
        Close
      </button>
    </div>
  );
}

export default Signincard;
