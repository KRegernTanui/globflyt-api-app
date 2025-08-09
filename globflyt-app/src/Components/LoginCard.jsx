function LoginCard({ onClose }) {
  return (
    <div className="border-2 bg-slate-100 border-cyan-100 text-slate-800 transition-colors duration-200 p-8 rounded-xl shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>

      
      <input
        type="text"
        placeholder="Username"
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-300"
      />

      
      <input
        type="password"
        placeholder="Password"
        className="w-full px-4 py-2 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-300"
      />

      
      <button className="w-full bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition duration-200">
        Log In
      </button>

      
      <button
        onClick={onClose}
        className="mt-4 w-full bg-white text-pink-500 px-4 py-2 rounded hover:bg-pink-100 transition duration-200"
      >
        Close
      </button>
    </div>
  );
}

export default LoginCard;
