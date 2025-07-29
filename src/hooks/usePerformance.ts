import { useEffect, useCallback } from 'react';

interface PerformanceOptions {
  preloadCritical?: boolean;
  enableAnalytics?: boolean;
  enableServiceWorker?: boolean;
}

export const usePerformance = (options: PerformanceOptions = {}) => {
  const { preloadCritical = true, enableAnalytics = true, enableServiceWorker = true } = options;

  // Preload de recursos críticos
  const preloadCriticalResources = useCallback(() => {
    if (!preloadCritical) return;

    const criticalResources = [
      // Fontes críticas
      'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400;1,500&family=JetBrains+Mono:ital,wght@0,400;0,500;1,400&display=swap',
      // Imagens críticas
      '/src/assets/hero-basquiat.jpg',
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = resource.includes('fonts') ? 'style' : 'image';
      link.href = resource;
      document.head.appendChild(link);
    });
  }, [preloadCritical]);

  // Lazy loading de componentes não críticos
  const lazyLoadComponents = useCallback(() => {
    // Intersection Observer para componentes pesados
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const lazyComponent = target.dataset.lazyComponent;
            
            if (lazyComponent) {
              // Carregar componente dinamicamente
              import(`../components/${lazyComponent}.tsx`)
                .then((module) => {
                  // Componente carregado
                  target.classList.add('lazy-loaded');
                })
                .catch((error) => {
                  console.error('Erro ao carregar componente:', error);
                });
              
              observer.unobserve(target);
            }
          }
        });
      },
      {
        rootMargin: '100px 0px',
        threshold: 0.1
      }
    );

    // Observar elementos com data-lazy-component
    document.querySelectorAll('[data-lazy-component]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Otimização de imagens
  const optimizeImages = useCallback(() => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.dataset.src;
            
            if (src) {
              img.src = src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1
      }
    );

    images.forEach((img) => imageObserver.observe(img));

    return () => imageObserver.disconnect();
  }, []);

  // Service Worker para cache
  const registerServiceWorker = useCallback(async () => {
    if (!enableServiceWorker || !('serviceWorker' in navigator)) return;

    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registrado:', registration);
    } catch (error) {
      console.error('Erro ao registrar Service Worker:', error);
    }
  }, [enableServiceWorker]);

  // Analytics de performance
  const trackPerformance = useCallback(() => {
    if (!enableAnalytics) return;

    // Core Web Vitals
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
          }
          if (entry.entryType === 'first-input') {
            console.log('FID:', entry.processingStart - entry.startTime);
          }
          if (entry.entryType === 'layout-shift') {
            console.log('CLS:', (entry as any).value);
          }
        });
      });

      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    }

    // Tempo de carregamento da página
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      console.log('Tempo de carregamento:', loadTime);
    });
  }, [enableAnalytics]);

  // Debounce para otimizar eventos
  const debounce = useCallback((func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }, []);

  // Throttle para otimizar eventos
  const throttle = useCallback((func: Function, limit: number) => {
    let inThrottle: boolean;
    return function executedFunction(...args: any[]) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }, []);

  // Otimização de scroll
  const optimizeScroll = useCallback(() => {
    const handleScroll = throttle(() => {
      // Implementar lógica de otimização de scroll
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Parallax ou outras animações baseadas em scroll
      document.querySelectorAll('[data-parallax]').forEach((el) => {
        const speed = parseFloat((el as HTMLElement).dataset.parallax || '0.5');
        const yPos = -(scrollTop * speed);
        (el as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    }, 16); // ~60fps

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [throttle]);

  // Inicialização
  useEffect(() => {
    preloadCriticalResources();
    registerServiceWorker();
    trackPerformance();
    
    const cleanupLazyLoad = lazyLoadComponents();
    const cleanupImages = optimizeImages();
    const cleanupScroll = optimizeScroll();

    return () => {
      cleanupLazyLoad();
      cleanupImages();
      cleanupScroll();
    };
  }, [
    preloadCriticalResources,
    registerServiceWorker,
    trackPerformance,
    lazyLoadComponents,
    optimizeImages,
    optimizeScroll
  ]);

  return {
    debounce,
    throttle,
    preloadCriticalResources,
    lazyLoadComponents,
    optimizeImages,
    registerServiceWorker,
    trackPerformance,
    optimizeScroll
  };
}; 