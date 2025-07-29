import { useState, useEffect, useCallback } from 'react';

export const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>('');
  const [nextPage, setNextPage] = useState<string>('');

  const transitionTo = useCallback((page: string, callback?: () => void) => {
    if (isTransitioning || currentPage === page) return;

    setIsTransitioning(true);
    setNextPage(page);

    // Simular transição de saída
    setTimeout(() => {
      setCurrentPage(page);
      setIsTransitioning(false);
      if (callback) callback();
    }, 300);
  }, [isTransitioning, currentPage]);

  return {
    isTransitioning,
    currentPage,
    nextPage,
    transitionTo
  };
}; 