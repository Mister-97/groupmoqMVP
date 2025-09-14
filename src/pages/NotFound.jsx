import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Search, Package } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="max-w-md w-full text-center px-4">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-gray-300 mb-4">404</div>
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-12 w-12 text-gray-400" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => navigate(-1)}
            className="w-full flex items-center justify-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Home className="h-4 w-4" />
              Home
            </button>
            
            <button
              onClick={() => navigate('/pools')}
              className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <Package className="h-4 w-4" />
              Browse Pools
            </button>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-sm text-gray-600">
          <p>If you think this is a mistake, please contact our support team.</p>
          <a 
            href="mailto:support@groupmoq.com" 
            className="text-blue-600 hover:underline font-medium"
          >
            support@groupmoq.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
