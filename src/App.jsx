import React from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { HomePage } from './pages/HomePage';
import { Footer } from './components/common/Footer';

// Interactive Modals & Drawers
import { PropertyDetailModal } from './components/property/PropertyDetailModal';
import { BookingModal } from './components/property/BookingModal';
import { AuthModal } from './components/modals/AuthModal';
import { WishlistDrawer } from './components/modals/WishlistDrawer';
import { MyBookingsModal } from './components/modals/MyBookingsModal';
import { SupportModal } from './components/modals/SupportModal';

import { useApp } from './context/AppContext';
import { LocationPage } from './pages/LocationPage';
import { ForBusinessPage } from './pages/ForBusinessPage';
import { DestinationsPage } from './pages/DestinationsPage';
import { HostPage } from './pages/HostPage';
import { SupportPage } from './pages/SupportPage';

export const MainContent = () => {
  const { currentPath } = useApp();

  // Route matching
  const renderCurrentPage = () => {
    // 1. Destination / Location Specific Page
    if (currentPath.startsWith('/destination/') || currentPath.startsWith('/location/')) {
      const citySlug = currentPath.replace('/destination/', '').replace('/location/', '').split('/')[0].split('?')[0];
      return <LocationPage citySlug={citySlug} />;
    }

    // 2. For Business / Corporate Stays Page
    if (currentPath === '/for-business' || currentPath === '/business') {
      return <ForBusinessPage />;
    }

    // 3. Destinations Explorer Page
    if (currentPath === '/destinations') {
      return <DestinationsPage />;
    }

    // 4. Host Partner / List Property Page
    if (currentPath === '/host' || currentPath === '/list-property') {
      return <HostPage />;
    }

    // 5. 24/7 Support & Help Center Page
    if (currentPath === '/support' || currentPath === '/help') {
      return <SupportPage />;
    }

    // Default: Home Page with Stays
    return <HomePage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 w-full overflow-x-clip">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Routed Page */}
      <main className="flex-1 w-full">
        {renderCurrentPage()}
      </main>

      {/* Dark Footer */}
      <Footer />

      {/* Interactive Overlays & Workflows */}
      <PropertyDetailModal />
      <BookingModal />
      <AuthModal />
      <WishlistDrawer />
      <MyBookingsModal />
      <SupportModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
