import { useEffect } from 'react';

export const useSmoothScroll = () => {
  useEffect(() => {
    const handleTabClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' && target.textContent) {
        const tabName = target.textContent.toLowerCase();
        
        // Smooth scroll to section if it exists
        const section = document.querySelector(`[data-section="${tabName}"]`);
        if (section) {
          e.preventDefault();
          section.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    document.addEventListener('click', handleTabClick);

    return () => {
      document.removeEventListener('click', handleTabClick);
    };
  }, []);
}; 