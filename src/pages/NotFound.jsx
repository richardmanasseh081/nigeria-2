import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="mb-4">Page not found</p>

        <Link to="/" className="text-green-600 underline">
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
