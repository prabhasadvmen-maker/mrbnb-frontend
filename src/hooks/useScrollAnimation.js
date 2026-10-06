import { useEffect } from 'react';

/**
 * Custom hook to trigger smooth directional entrance animations on scroll (Left, Right, Bottom)
 */
export const useScrollAnimation = () => {
  useEffect(() => {
    const handleScrollCheck = () => {
      const animElements = document.querySelectorAll(
        '.animate-on-scroll, .anim-from-left, .anim-from-right, .anim-from-bottom, .anim-fade-in'
      );
      const windowHeight = window.innerHeight;

      animElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // If element is entering the viewport window
        if (rect.top <= windowHeight * 0.92 && rect.bottom >= 0) {
          el.classList.add('is-visible');
        }
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -20px 0px',
      threshold: 0.05
    });

    const attachObserver = () => {
      const animElements = document.querySelectorAll(
        '.animate-on-scroll, .anim-from-left, .anim-from-right, .anim-from-bottom, .anim-fade-in'
      );
      const windowHeight = window.innerHeight;
      animElements.forEach((el) => {
        observer.observe(el);
        const rect = el.getBoundingClientRect();
        if (rect.top <= windowHeight * 0.95 && rect.bottom >= 0) {
          el.classList.add('is-visible');
        }
      });
    };

    // Run on initial mount and shortly after for async/lazy elements
    handleScrollCheck();
    attachObserver();
    const t1 = setTimeout(handleScrollCheck, 150);
    const t2 = setTimeout(attachObserver, 350);

    // Also listen to scroll event for guaranteed reliability
    window.addEventListener('scroll', handleScrollCheck, { passive: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      observer.disconnect();
      window.removeEventListener('scroll', handleScrollCheck);
    };
  }, []);
};
