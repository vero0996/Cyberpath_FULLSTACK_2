import { useNavigate } from "react-router-dom";

export default function PopupSignIn({ onClose }) {
  const navigate = useNavigate();

  const handleSignIn = () => {
    onClose();
    navigate("/login");
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#1A1A1A] w-[500px] rounded-2xl p-10 flex flex-col items-center">

        <h1 className="text-white text-4xl font-bold mb-6">
          Access Restricted
        </h1>

        <p className="text-gray-300 text-lg text-center mb-8">
          Please sign in to access this feature
        </p>

        <button
          onClick={handleSignIn}
          className="bg-[#CD163F] hover:bg-red-700 transition px-8 py-3 rounded-xl text-white font-bold mb-4"
        >
          Sign In
        </button>

        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition"
        >
          Cancel
        </button>

      </div>
    </div>
  );
}