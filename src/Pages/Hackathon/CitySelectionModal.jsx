// src/Pages/Hackathon/CitySelectionModal.jsx

import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { getCitiesByState, getAvailableCitiesCount } from './stateData';

const CitySelectionModal = ({ isOpen, onClose, selectedState, onCitySelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  if (!isOpen) return null;

  const cities = getCitiesByState(selectedState);
  const availableCitiesCount = getAvailableCitiesCount(selectedState);
  
  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCityClick = (city) => {
    if (city.isAvailable) {
      onCitySelect(city.name);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] sm:max-h-[85vh] overflow-hidden flex flex-col mx-2 sm:mx-4">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 sm:px-8 py-4 sm:py-6 text-white">
          <div className="flex justify-between items-center">
            <div className="min-w-0 flex-1 mr-2">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold truncate">Find Your City</h2>
              <p className="text-orange-100 mt-1 text-sm sm:text-base">Select a city in {selectedState}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors flex-shrink-0"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="px-4 sm:px-8 py-4 sm:py-6 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Select Your City"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 pr-24 sm:pr-32 rounded-full border-2 border-gray-300 focus:border-orange-500 focus:outline-none text-base sm:text-lg"
            />
            <button className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-red-500 hover:bg-red-600 text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-full font-semibold transition-colors text-sm sm:text-base">
              Search Here
            </button>
          </div>
        </div>

        <div className="px-4 sm:px-8 py-4 sm:py-6 overflow-y-auto flex-1" style={{ maxHeight: 'calc(90vh - 280px)', minHeight: '200px' }}>
          {filteredCities.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 pb-4">
              {filteredCities.map((city, index) => (
                <button
                  key={index}
                  onClick={() => handleCityClick(city)}
                  disabled={!city.isAvailable}
                  className={`group relative rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-300 border-2 ${
                    city.isAvailable
                      ? 'bg-gradient-to-br from-gray-50 to-gray-100 hover:from-orange-50 hover:to-orange-100 hover:shadow-lg hover:scale-105 border-transparent hover:border-orange-400 cursor-pointer'
                      : 'bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300 cursor-not-allowed opacity-60'
                  }`}
                  style={{
                    filter: city.isAvailable ? 'none' : 'grayscale(50%)'
                  }}
                >
                  <div className="flex flex-col items-center gap-2 sm:gap-3">
                    <div className={`rounded-full p-3 sm:p-4 shadow-md transition-shadow relative ${
                      city.isAvailable 
                        ? 'bg-white group-hover:shadow-lg' 
                        : 'bg-gray-300'
                    }`}>
                      <svg 
                        className={`w-6 h-6 sm:w-8 sm:h-8 ${
                          city.isAvailable ? 'text-orange-500' : 'text-gray-500'
                        }`}
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      
                      {!city.isAvailable && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-400/80 backdrop-blur-sm rounded-full">
                          <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                      )}
                    </div>
                    
                    <div className="text-center">
                      <p className={`font-bold text-sm sm:text-lg ${
                        city.isAvailable 
                          ? 'text-gray-800 group-hover:text-orange-600' 
                          : 'text-gray-500'
                      }`}>
                        {city.name}
                      </p>
                      <p className={`text-xs sm:text-sm mt-1 ${
                        city.isAvailable ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        {city.isAvailable ? (
                          `${city.hackathons.length} Hackathon${city.hackathons.length !== 1 ? 's' : ''}`
                        ) : (
                          'Coming Soon'
                        )}
                      </p>
                    </div>
                    
                    {!city.isAvailable && (
                      <div className="mt-1 sm:mt-2 bg-gray-400 rounded-full px-2 sm:px-3 py-0.5 sm:py-1">
                        <p className="text-xs font-semibold text-white">Not Available</p>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 sm:py-12">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-500 text-base sm:text-lg">No cities found matching "{searchQuery}"</p>
            </div>
          )}
        </div>

        <div className="bg-gray-50 px-4 sm:px-8 py-3 sm:py-4 border-t border-gray-200 flex-shrink-0">
          <p className="text-xs sm:text-sm text-gray-600 text-center">
            🎯 Total {availableCitiesCount} {availableCitiesCount === 1 ? 'city' : 'cities'} available in {selectedState}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CitySelectionModal;