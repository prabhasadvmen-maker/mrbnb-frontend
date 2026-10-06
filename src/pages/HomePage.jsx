import React from 'react';
import { HeroSearch } from '../components/home/HeroSearch';
import { ValueProps } from '../components/home/ValueProps';
import { Destinations } from '../components/home/Destinations';
import { FeaturedStays } from '../components/home/FeaturedStays';
import { BusinessPerks } from '../components/home/BusinessPerks';
import { HostBanner } from '../components/home/HostBanner';
import { ClientLogos } from '../components/home/ClientLogos';
import { GuestReviews } from '../components/home/GuestReviews';
import { MobileAppBanner } from '../components/home/MobileAppBanner';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const HomePage = () => {
  // Activate scroll-triggered smooth entrance animations
  useScrollAnimation();

  return (
    <div className="w-full bg-white flex flex-col overflow-x-clip">
      {/* 1. Hero Section with Penthouse Skyline & Floating Search */}
      <HeroSearch />

      {/* 2. Four Core Value Propositions (Glides from Left & Right) */}
      <ValueProps />

      {/* 3. Popular Business Destinations (Glides from Left & Right) */}
      <Destinations />

      {/* 4. Handpicked Featured Stays matching Image 1 */}
      <FeaturedStays />

      {/* 5. Business Stays & Executive Perks (Glides from Left & Right) */}
      <BusinessPerks />

      {/* 6. Host Partnership Video Spotlight (Glides from Left & Right) */}
      <HostBanner />

      {/* 7. Corporate Client Validation Logos */}
      <ClientLogos />

      {/* 8. What Our Guests Say (Transparent Villa Background) matching Image 2 */}
      <GuestReviews />

      {/* 9. Get the MrBNB Mobile App (Glides from Left & Right) */}
      <MobileAppBanner />
    </div>
  );
};

export default HomePage;
