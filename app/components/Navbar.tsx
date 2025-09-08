import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="w-full glass">
      <div className="page-container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-400 flex items-center justify-center text-white font-semibold">
            RA
          </div>
          <div className="hidden sm:block">
            <div className="text-lg font-semibold">Resume Analyzer</div>
            <div className="text-xs text-gray-400">AI-powered feedback</div>
          </div>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            to="/"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Home
          </Link>
          <Link
            to="/upload"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Upload
          </Link>
          <Link
            to="/wipe"
            className="ml-2 inline-flex items-center px-3 py-1.5 rounded-md btn-primary"
          >
            Analyze
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;