// src/Pages/Hackathon/stateData.js

export const hackathonData = {
  'Maharashtra': {
    gradient: 'linear-gradient(#CACBCB, #A2EDE5 50%, #6DB4AD 100%)',
    image: '/src/assets/HackathonPage/maharashtra.png',
    isAvailable: true,
    cities: [
      { 
        name: 'Mumbai', 
        isAvailable: true, 
        hackathons: [
          { 
            id: 'mh-mum-001', 
            name: 'Mumbai Tech Summit 2025', 
            date: 'December 15-16, 2025', 
            venue: 'IIT Bombay', 
            description: 'Join us for the biggest tech hackathon in Mumbai', 
            prize: '₹5,00,000', 
            participants: '500+',
            registrationLink: 'https://forms.google.com/your-form-link-here-1',
            learnMoreLink: 'https://your-website.com/mumbai-tech-summit-2025'
          }, 
          { 
            id: 'mh-mum-002', 
            name: 'Mumbai Tech Summit 2026', 
            date: 'December 15-16, 2025', 
            venue: 'BKC (Bandra Kurla Complex)', 
            description: 'Join us for the biggest tech hackathon in Mumbai', 
            prize: '₹5,00,000', 
            participants: '500+',
            registrationLink: 'https://forms.google.com/your-form-link-here-2',
            learnMoreLink: 'https://your-website.com/mumbai-tech-summit-2026'
          }
        ] 
      },
      { 
        name: 'Pune', 
        isAvailable: true, 
        hackathons: [
          { 
            id: 'mh-pun-001', 
            name: 'Pune Innovation Challenge', 
            date: 'December 20-21, 2025', 
            venue: 'COEP Pune', 
            description: 'Innovate and create solutions', 
            prize: '₹4,00,000', 
            participants: '400+',
            registrationLink: 'https://forms.google.com/your-pune-form-link',
            learnMoreLink: 'https://your-website.com/pune-innovation-challenge'
          }
        ] 
      },
      { name: 'Nagpur', isAvailable: false, hackathons: [] },
      { name: 'Nashik', isAvailable: false, hackathons: [] },
      { name: 'Aurangabad', isAvailable: false, hackathons: [] },
      { name: 'Solapur', isAvailable: false, hackathons: [] },
      { name: 'Kolhapur', isAvailable: false, hackathons: [] },
      { name: 'Thane', isAvailable: false, hackathons: [] },
      { name: 'Amravati', isAvailable: false, hackathons: [] }
    ]
  },
  'Karnataka': {
    gradient: 'linear-gradient(135deg, #F0E8E8 10%, #DDBFBF 68%, #DAA7A7 92%)',
    image: '/src/assets/HackathonPage/karnataka.png',
    isAvailable: true,
    cities: [
      { 
        name: 'Bangalore', 
        isAvailable: true, 
        hackathons: [
          { 
            id: 'ka-ban-001', 
            name: 'Bangalore Tech Hackathon', 
            date: 'December 12-13, 2025', 
            venue: 'IISc Bangalore', 
            description: 'India\'s silicon valley biggest hackathon', 
            prize: '₹10,00,000', 
            participants: '1000+',
            registrationLink: 'https://forms.google.com/bangalore-tech-hackathon',
            learnMoreLink: 'https://your-website.com/bangalore-tech-hackathon'
          }
        ] 
      },
      { name: 'Mysore', isAvailable: false, hackathons: [] },
      { name: 'Mangalore', isAvailable: false, hackathons: [] },
      { name: 'Hubli', isAvailable: false, hackathons: [] },
      { name: 'Belgaum', isAvailable: false, hackathons: [] },
      { name: 'Gulbarga', isAvailable: false, hackathons: [] },
      { name: 'Bellary', isAvailable: false, hackathons: [] },
      { name: 'Tumkur', isAvailable: false, hackathons: [] }
    ]
  },
  'Kerala': {
    gradient: 'linear-gradient(135deg, #8B7FD8 0%, #6B5BB8 100%)',
    image: '/src/assets/HackathonPage/keral.png',
    isAvailable: true,
    cities: [
      { 
        name: 'Kochi', 
        isAvailable: true, 
        hackathons: [
          { 
            id: 'kl-koc-001', 
            name: 'Kochi Startup Sprint', 
            date: 'December 22-23, 2025', 
            venue: 'Rajagiri College', 
            description: 'Sprint your way to startup success', 
            prize: '₹4,50,000', 
            participants: '450+',
            registrationLink: 'https://forms.google.com/your-form-link-here-2',
            learnMoreLink: 'https://your-website.com/mumbai-tech-summit-2026'
          }
        ] 
      },
      { 
        name: 'Thiruvananthapuram', 
        isAvailable: true, 
        hackathons: [
          { 
            id: 'kl-tvm-001', 
            name: 'TVM Tech Challenge', 
            date: 'January 8-9, 2026', 
            venue: 'CET Trivandrum', 
            description: 'Challenge yourself with cutting-edge tech', 
            prize: '₹3,00,000', 
            participants: '300+',
            registrationLink: 'https://forms.google.com/your-form-link-here-2',
            learnMoreLink: 'https://your-website.com/mumbai-tech-summit-2026'
          }
        ] 
      },
      { name: 'Kozhikode', isAvailable: false, hackathons: [] },
      { name: 'Thrissur', isAvailable: false, hackathons: [] },
      { name: 'Kannur', isAvailable: false, hackathons: [] },
      { name: 'Kollam', isAvailable: false, hackathons: [] },
      { name: 'Palakkad', isAvailable: false, hackathons: [] },
      { name: 'Alappuzha', isAvailable: false, hackathons: [] }
    ]
  },
  'Tamil Nadu': {
    gradient: 'linear-gradient(135deg, #D4E157 0%, #ADB82B 100%)',
    image: '/src/assets/HackathonPage/tamilnadu.png',
    isAvailable: false,
    cities: [
      { name: 'Chennai', isAvailable: false, hackathons: [] },
      { name: 'Coimbatore', isAvailable: false, hackathons: [] },
      { name: 'Madurai', isAvailable: false, hackathons: [] },
      { name: 'Tiruchirappalli', isAvailable: false, hackathons: [] },
      { name: 'Salem', isAvailable: false, hackathons: [] },
      { name: 'Tirunelveli', isAvailable: false, hackathons: [] },
      { name: 'Erode', isAvailable: false, hackathons: [] },
      { name: 'Vellore', isAvailable: false, hackathons: [] },
      { name: 'Thoothukudi', isAvailable: false, hackathons: [] }
    ]
  },
  'Rajasthan': {
    gradient: 'linear-gradient(135deg, #FFB74D 0%, #FF9800 100%)',
    image: '/src/assets/HackathonPage/rajsthan.png',
    isAvailable: false,
    cities: [
      { name: 'Jaipur', isAvailable: false, hackathons: [] },
      { name: 'Udaipur', isAvailable: false, hackathons: [] },
      { name: 'Jodhpur', isAvailable: false, hackathons: [] },
      { name: 'Kota', isAvailable: false, hackathons: [] },
      { name: 'Ajmer', isAvailable: false, hackathons: [] },
      { name: 'Bikaner', isAvailable: false, hackathons: [] },
      { name: 'Alwar', isAvailable: false, hackathons: [] },
      { name: 'Bharatpur', isAvailable: false, hackathons: [] }
    ]
  },
  'Gujarat': {
    gradient: 'linear-gradient(135deg, #81C784 0%, #66BB6A 100%)',
    image: '/src/assets/states/gujarat.png',
    isAvailable: false,
    cities: [
      { name: 'Ahmedabad', isAvailable: false, hackathons: [] },
      { name: 'Surat', isAvailable: false, hackathons: [] },
      { name: 'Vadodara', isAvailable: false, hackathons: [] },
      { name: 'Rajkot', isAvailable: false, hackathons: [] },
      { name: 'Bhavnagar', isAvailable: false, hackathons: [] },
      { name: 'Jamnagar', isAvailable: false, hackathons: [] },
      { name: 'Junagadh', isAvailable: false, hackathons: [] },
      { name: 'Gandhinagar', isAvailable: false, hackathons: [] }
    ]
  },
  'Delhi': {
    gradient: 'linear-gradient(135deg, #E57373 0%, #EF5350 100%)',
    image: '/src/assets/states/delhi.png',
    isAvailable: false,
    cities: [
      { name: 'New Delhi', isAvailable: false, hackathons: [] },
      { name: 'South Delhi', isAvailable: false, hackathons: [] },
      { name: 'North Delhi', isAvailable: false, hackathons: [] },
      { name: 'East Delhi', isAvailable: false, hackathons: [] },
      { name: 'West Delhi', isAvailable: false, hackathons: [] }
    ]
  }
};

export const getCitiesByState = (stateName) => {
  return hackathonData[stateName]?.cities || [];
};

export const getAvailableCitiesCount = (stateName) => {
  const cities = hackathonData[stateName]?.cities || [];
  return cities.filter(city => city.isAvailable).length;
};

export const getHackathonsByCity = (stateName, cityName) => {
  const state = hackathonData[stateName];
  if (!state) return [];
  
  const city = state.cities.find(c => c.name === cityName);
  return city?.hackathons || [];
};

export const getAllStates = () => {
  return Object.keys(hackathonData).map(stateName => ({
    name: stateName,
    gradient: hackathonData[stateName].gradient,
    image: hackathonData[stateName].image,
    isAvailable: hackathonData[stateName].isAvailable || false
  }));
};