/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback } from "react";

export const useDebounce = <T,>(value: T, delay = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useDebouncedCallback = <T extends (...args: any[]) => any>(
  fn: T,
  delay = 300,
  deps: React.DependencyList = []
): ((...args: Parameters<T>) => void) => {
  const callback = useCallback(fn, deps);
  const timeoutRef = React.useRef<number | null>(null);

  // Clean up any previous timeout on component unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Create the final debounced function that handles the timeout ref
  return useCallback(
    (...args: Parameters<T>) => {
      // Clear any existing timeout
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }

      // Set new timeout
      timeoutRef.current = window.setTimeout(() => {
        timeoutRef.current = null;
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
};
