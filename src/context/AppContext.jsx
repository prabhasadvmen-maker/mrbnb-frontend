import React, { createContext, useContext, useState, useEffect } from 'react';
import { PROPERTIES } from '../data/propertiesData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Search & Filter State
  const [searchDestination, setSearchDestination] = useState('');
  const [checkInDate, setCheckInDate] = useState('2026-10-15');
  const [checkOutDate, setCheckOutDate] = useState('2026-10-19');
  const [guestsCount, setGuestsCount] = useState({ adults: 2, children: 0, infants: 0 });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([4000, 30000]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [corporateOnly, setCorporateOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);

  // Modals & Drawers
  const [selectedProperty, setSelectedProperty] = useState(null); // Details modal
  const [bookingProperty, setBookingProperty] = useState(null); // Booking modal
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);

  // User State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('mrbnb_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Wishlist State (persisted in localStorage)
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('mrbnb_wishlist');
    return saved ? JSON.parse(saved) : ['prop-1', 'prop-3'];
  });

  // Bookings list (persisted in localStorage)
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('mrbnb_bookings');
    return saved ? JSON.parse(saved) : [
      {
        bookingId: 'MRB-2026-7821',
        propertyId: 'prop-2',
        propertyName: 'The Glasshouse Executive Loft',
        city: 'Mumbai',
        roomName: 'Executive Tech Studio',
        checkIn: '2026-11-02',
        checkOut: '2026-11-06',
        guests: '2 Adults',
        amount: 35600,
        status: 'Confirmed',
        timestamp: '2026-10-04T10:30:00Z',
        corporate: true
      }
    ];
  });

  // Currency
  const [currency, setCurrency] = useState('INR');

  // URL Path Routing State (HTML5 History API)
  const [currentPath, setCurrentPath] = useState(() => {
    return window.location.pathname || '/';
  });

  const navigate = (path) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    localStorage.setItem('mrbnb_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('mrbnb_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('mrbnb_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('mrbnb_user');
    }
  }, [currentUser]);

  // Wishlist toggle
  const toggleWishlist = (propertyId) => {
    setWishlist((prev) =>
      prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId]
    );
  };

  // Add new booking
  const addBooking = (newBooking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  // Filter properties logic
  const filteredProperties = PROPERTIES.filter((property) => {
    // Destination / City match
    if (searchDestination.trim()) {
      const q = searchDestination.toLowerCase().trim();
      const pCity = (property.city || '').toLowerCase();
      const pLoc = (property.location || '').toLowerCase();
      const pName = (property.name || '').toLowerCase();

      const isDelhiMatch = (q.includes('delhi') || q.includes('gurgaon') || q.includes('ncr')) &&
                           (pCity.includes('delhi') || pLoc.includes('delhi') || pLoc.includes('gurgaon'));
      const isDirectMatch = pCity.includes(q) || pLoc.includes(q) || pName.includes(q) || q.includes(pCity);

      if (!isDirectMatch && !isDelhiMatch) return false;
    }

    // Category match
    if (selectedCategory !== 'all') {
      if (property.category !== selectedCategory) return false;
    }

    // Price range match
    if (property.pricePerNight < priceRange[0] || property.pricePerNight > priceRange[1]) {
      return false;
    }

    // Corporate filter
    if (corporateOnly && !property.corporateFriendly) {
      return false;
    }

    // Min rating
    if (minRating > 0 && property.rating < minRating) {
      return false;
    }

    // Amenities match
    if (selectedAmenities.length > 0) {
      const hasAllAmenities = selectedAmenities.every((amenity) =>
        property.amenities.some((a) => a.toLowerCase().includes(amenity.toLowerCase()))
      );
      if (!hasAllAmenities) return false;
    }

    return true;
  });

  return (
    <AppContext.Provider
      value={{
        searchDestination,
        setSearchDestination,
        checkInDate,
        setCheckInDate,
        checkOutDate,
        setCheckOutDate,
        guestsCount,
        setGuestsCount,
        selectedCategory,
        setSelectedCategory,
        priceRange,
        setPriceRange,
        selectedAmenities,
        setSelectedAmenities,
        corporateOnly,
        setCorporateOnly,
        minRating,
        setMinRating,
        selectedProperty,
        setSelectedProperty,
        bookingProperty,
        setBookingProperty,
        isAuthOpen,
        setIsAuthOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSupportOpen,
        setIsSupportOpen,
        isMyBookingsOpen,
        setIsMyBookingsOpen,
        currentUser,
        setCurrentUser,
        wishlist,
        toggleWishlist,
        bookings,
        addBooking,
        currency,
        setCurrency,
        currentPath,
        setCurrentPath,
        navigate,
        filteredProperties
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
