// Template for creating new components
// Replace "ComponentName" with your actual component name
// Replace "Page Title" and "Page Description" with appropriate content

import React from 'react';

const Cprogramming = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cprogramming</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Page description goes here
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6">Content Section</h2>
          <p className="text-gray-600 mb-4">
            This is the content for this page. Replace this with your actual content.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-3">Feature 1</h3>
              <p className="text-gray-600">Description of feature 1</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-3">Feature 2</h3>
              <p className="text-gray-600">Description of feature 2</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cprogramming;