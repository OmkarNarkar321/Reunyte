// src/Pages/Hackathon/HackathonDetailsModal.jsx

import React from 'react';
import { getHackathonsByCity } from './stateData';

const HackathonDetailsModal = ({ isOpen, onClose, selectedState, selectedCity, onBack }) => {
  if (!isOpen) return null;

  const hackathons = getHackathonsByCity(selectedState, selectedCity);

  const handleRegister = (registrationLink) => {
    if (registrationLink) {
      window.open(registrationLink, '_blank', 'noopener,noreferrer');
    } else {
      alert('Registration link not available yet. Please check back soon!');
    }
  };

  const handleLearnMore = (learnMoreLink) => {
    if (learnMoreLink) {
      window.open(learnMoreLink, '_blank', 'noopener,noreferrer');
    } else {
      alert('More details coming soon!');
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] sm:max-h-[85vh] overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 text-white">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
              <button
                onClick={onBack}
                className="hover:bg-white/20 rounded-full p-2 transition-colors flex-shrink-0"
                aria-label="Go back"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="min-w-0 flex-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold truncate">Hackathons in {selectedCity}</h2>
                <p className="text-orange-100 mt-1 text-sm sm:text-base truncate">{selectedState} • {hackathons.length} Events Available</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors flex-shrink-0"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 120px)' }}>
          {hackathons.length > 0 ? (
            <div className="space-y-4 sm:space-y-6">
              {hackathons.map((hackathon) => (
                <div
                  key={hackathon.id}
                  className="bg-gradient-to-r from-white to-orange-50 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-orange-100 hover:border-orange-300"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 bg-gradient-to-br from-orange-400 to-orange-600 p-6 sm:p-8 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="bg-white/20 backdrop-blur rounded-full w-24 h-24 sm:w-32 sm:h-32 mx-auto flex items-center justify-center mb-3 sm:mb-4">
                          <svg className="w-12 h-12 sm:w-16 sm:h-16" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                          </svg>
                        </div>
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold break-words">{hackathon.name}</h3>
                      </div>
                    </div>

                    <div className="md:w-2/3 p-4 sm:p-6">
                      <div className="space-y-3 sm:space-y-4">
                        <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed">
                          {hackathon.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2 sm:pt-4">
                          <div className="flex items-start gap-2 sm:gap-3">
                            <div className="bg-orange-100 rounded-lg p-1.5 sm:p-2 flex-shrink-0">
                              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs sm:text-sm text-gray-500 font-semibold">Date</p>
                              <p className="text-sm sm:text-base text-gray-800 font-bold break-words">{hackathon.date}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2 sm:gap-3">
                            <div className="bg-orange-100 rounded-lg p-1.5 sm:p-2 flex-shrink-0">
                              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                              </svg>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs sm:text-sm text-gray-500 font-semibold">Venue</p>
                              <p className="text-sm sm:text-base text-gray-800 font-bold break-words">{hackathon.venue}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2 sm:gap-3">
                            <div className="bg-orange-100 rounded-lg p-1.5 sm:p-2 flex-shrink-0">
                              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs sm:text-sm text-gray-500 font-semibold">Prize Pool</p>
                              <p className="text-sm sm:text-base text-gray-800 font-bold">{hackathon.prize}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2 sm:gap-3">
                            <div className="bg-orange-100 rounded-lg p-1.5 sm:p-2 flex-shrink-0">
                              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs sm:text-sm text-gray-500 font-semibold">Expected</p>
                              <p className="text-sm sm:text-base text-gray-800 font-bold">{hackathon.participants}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
                          <button 
                            onClick={() => handleRegister(hackathon.registrationLink)}
                            className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-sm sm:text-base"
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Register Now
                          </button>
                          <button 
                            onClick={() => handleLearnMore(hackathon.learnMoreLink)}
                            className="flex-1 bg-white border-2 border-orange-500 text-orange-600 hover:bg-orange-50 font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-sm sm:text-base"
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Learn More
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <svg className="w-16 h-16 sm:w-20 sm:h-20 text-gray-300 mx-auto mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-500 text-lg sm:text-xl">No hackathons available in {selectedCity} yet</p>
              <p className="text-gray-400 mt-2 text-sm sm:text-base">Check back soon for upcoming events!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HackathonDetailsModal;