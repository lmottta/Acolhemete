import { useState, useEffect, useCallback } from 'react';

export interface AccessibilityPreferences {
  reducedMotion: boolean;
  highContrast: boolean;
  fontSize: 'small' | 'medium' | 'large';
  screenReader: boolean;
}

export interface AccessibilityControls {
  preferences: AccessibilityPreferences;
  toggleReducedMotion: () => void;
  toggleHighContrast: () => void;
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  announceToScreenReader: (message: string) => void;
  resetPreferences: () => void;
}

const DEFAULT_PREFERENCES: AccessibilityPreferences = {
  reducedMotion: false,
  highContrast: false,
  fontSize: 'medium',
  screenReader: false,
};

const STORAGE_KEY = 'acolhemente-accessibility-preferences';

export function useAccessibility(): AccessibilityControls {
  const [preferences, setPreferences] =
    useState<AccessibilityPreferences>(DEFAULT_PREFERENCES);

  // Initialize preferences from localStorage and system preferences
  useEffect(() => {
    const initializePreferences = () => {
      try {
        // Load saved preferences
        const saved = localStorage.getItem(STORAGE_KEY);
        const savedPreferences = saved ? JSON.parse(saved) : {};

        // Detect system preferences
        const systemReducedMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches;
        const systemHighContrast = window.matchMedia(
          '(prefers-contrast: high)'
        ).matches;
        const screenReader =
          window.navigator.userAgent.includes('NVDA') ||
          window.navigator.userAgent.includes('JAWS') ||
          'speechSynthesis' in window;

        const initialPreferences: AccessibilityPreferences = {
          reducedMotion: savedPreferences.reducedMotion ?? systemReducedMotion,
          highContrast: savedPreferences.highContrast ?? systemHighContrast,
          fontSize: savedPreferences.fontSize ?? 'medium',
          screenReader: screenReader,
        };

        setPreferences(initialPreferences);
        applyPreferences(initialPreferences);
      } catch (error) {
        console.warn('Failed to initialize accessibility preferences:', error);
      }
    };

    initializePreferences();

    // Listen for system preference changes
    const reducedMotionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setPreferences(prev => {
        const updated = { ...prev, reducedMotion: e.matches };
        applyPreferences(updated);
        return updated;
      });
    };

    const handleHighContrastChange = (e: MediaQueryListEvent) => {
      setPreferences(prev => {
        const updated = { ...prev, highContrast: e.matches };
        applyPreferences(updated);
        return updated;
      });
    };

    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);
    highContrastQuery.addEventListener('change', handleHighContrastChange);

    return () => {
      reducedMotionQuery.removeEventListener(
        'change',
        handleReducedMotionChange
      );
      highContrastQuery.removeEventListener('change', handleHighContrastChange);
    };
  }, []);

  // Apply preferences to the document
  const applyPreferences = useCallback((prefs: AccessibilityPreferences) => {
    const root = document.documentElement;

    // Apply reduced motion
    if (prefs.reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    // Apply high contrast
    if (prefs.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Apply font size
    root.classList.remove('font-small', 'font-medium', 'font-large');
    root.classList.add(`font-${prefs.fontSize}`);

    // Apply screen reader optimizations
    if (prefs.screenReader) {
      root.classList.add('screen-reader');
    } else {
      root.classList.remove('screen-reader');
    }
  }, []);

  // Save preferences to localStorage
  const savePreferences = useCallback((prefs: AccessibilityPreferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch (error) {
      console.warn('Failed to save accessibility preferences:', error);
    }
  }, []);

  // Toggle reduced motion
  const toggleReducedMotion = useCallback(() => {
    setPreferences(prev => {
      const updated = { ...prev, reducedMotion: !prev.reducedMotion };
      applyPreferences(updated);
      savePreferences(updated);
      return updated;
    });
  }, [applyPreferences, savePreferences]);

  // Toggle high contrast
  const toggleHighContrast = useCallback(() => {
    setPreferences(prev => {
      const updated = { ...prev, highContrast: !prev.highContrast };
      applyPreferences(updated);
      savePreferences(updated);
      return updated;
    });
  }, [applyPreferences, savePreferences]);

  // Set font size
  const setFontSize = useCallback(
    (size: 'small' | 'medium' | 'large') => {
      setPreferences(prev => {
        const updated = { ...prev, fontSize: size };
        applyPreferences(updated);
        savePreferences(updated);
        return updated;
      });
    },
    [applyPreferences, savePreferences]
  );

  // Announce message to screen readers
  const announceToScreenReader = useCallback((message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Remove the announcement after a short delay
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, []);

  // Reset all preferences to defaults
  const resetPreferences = useCallback(() => {
    setPreferences(DEFAULT_PREFERENCES);
    applyPreferences(DEFAULT_PREFERENCES);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to reset accessibility preferences:', error);
    }
  }, [applyPreferences]);

  return {
    preferences,
    toggleReducedMotion,
    toggleHighContrast,
    setFontSize,
    announceToScreenReader,
    resetPreferences,
  };
}
