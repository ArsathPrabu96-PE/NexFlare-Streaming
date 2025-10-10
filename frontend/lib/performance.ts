import React from 'react'

export const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`${name} took ${end - start} milliseconds`);
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0;
  
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
};

// Mobile and performance detection utilities
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false
  
  return (
    window.innerWidth <= 768 ||
    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  )
}

export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Intersection Observer for lazy loading
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver | null => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null
  }
  
  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  }
  
  return new IntersectionObserver(callback, defaultOptions)
}

// Performance monitoring
export const createPerformanceMarker = (name: string) => {
  if (typeof window === 'undefined' || !('performance' in window)) return

  return {
    start: () => {
      performance.mark(`${name}-start`)
    },
    end: () => {
      performance.mark(`${name}-end`)
      performance.measure(name, `${name}-start`, `${name}-end`)
      
      const measure = performance.getEntriesByName(name)[0]
      console.log(`${name}: ${measure.duration.toFixed(2)}ms`)
      
      // Clean up
      performance.clearMarks(`${name}-start`)
      performance.clearMarks(`${name}-end`)
      performance.clearMeasures(name)
    }
  }
}

// Network information
export const getNetworkInfo = () => {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return null
  }
  
  const connection = (navigator as any).connection
  return {
    effectiveType: connection.effectiveType, // 'slow-2g', '2g', '3g', '4g'
    downlink: connection.downlink, // Mbps
    rtt: connection.rtt, // ms
    saveData: connection.saveData, // boolean
  }
}

// Performance mode detection
export const getPerformanceMode = () => {
  const mobile = isMobileDevice()
  const reducedMotion = prefersReducedMotion()
  const network = getNetworkInfo()
  
  // Determine if we should use low-performance mode
  const lowPerformanceMode = 
    mobile ||
    reducedMotion ||
    (network && ['slow-2g', '2g'].includes(network.effectiveType))
  
  return {
    mobile,
    reducedMotion,
    lowPerformanceMode,
    network,
  }
}

// Lazy loading hook
export const useLazyLoading = (ref: React.RefObject<HTMLElement>) => {
  const [isVisible, setIsVisible] = React.useState(false)
  
  React.useEffect(() => {
    const element = ref.current // Copy ref value to avoid stale closure
    
    const observer = createIntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer?.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )
    
    if (observer && element) {
      observer.observe(element)
    }
    
    return () => {
      if (observer && element) {
        observer.unobserve(element)
      }
    }
  }, [ref])
  
  return isVisible
}

export const lazyLoad = (target: HTMLElement, callback: () => void) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback();
        observer.unobserve(target);
      }
    });
  });
  
  observer.observe(target);
};