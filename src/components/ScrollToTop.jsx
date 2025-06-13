import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// ScrollToTop component: when the route/pathname changes, force the window to the top.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable automatic scroll restoration if supported (prevents the browser
    // from restoring the previous scroll position when navigating via SPA).
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Always scroll the window and root elements to the top (multiple fallbacks).
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0; // For Safari & older browsers
      document.body.scrollTop = 0;            // For some mobile browsers

      // In case a custom scroll container is used somewhere, also reset it.
      const portfolioEl = document.querySelector('.photography-portfolio');
      if (portfolioEl) portfolioEl.scrollTop = 0;
    };

    // Run immediately and again on next frame to catch late layout shifts.
    scrollToTop();
    requestAnimationFrame(scrollToTop);
  }, [pathname]);

  // This component does not render anything visible.
  return null;
} 