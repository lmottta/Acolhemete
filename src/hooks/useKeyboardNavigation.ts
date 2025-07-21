import { useEffect, useCallback, useRef } from 'react';

export interface KeyboardNavigationOptions {
  // Enable arrow key navigation between focusable elements
  enableArrowKeys?: boolean;
  // Enable escape key to close/exit
  enableEscape?: boolean;
  // Enable enter/space for activation
  enableActivation?: boolean;
  // Trap focus within the container
  trapFocus?: boolean;
  // Auto-focus first element when enabled
  autoFocus?: boolean;
  // Custom key handlers
  onEscape?: () => void;
  onEnter?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
}

export interface KeyboardNavigationControls {
  // Ref to attach to the container element
  containerRef: React.RefObject<HTMLElement>;
  // Focus the first focusable element
  focusFirst: () => void;
  // Focus the last focusable element
  focusLast: () => void;
  // Focus the next focusable element
  focusNext: () => void;
  // Focus the previous focusable element
  focusPrevious: () => void;
  // Get all focusable elements in the container
  getFocusableElements: () => HTMLElement[];
}

const FOCUSABLE_SELECTORS = [
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  'a[href]',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
  'summary',
  'iframe',
  'object',
  'embed',
  'area[href]',
  'audio[controls]',
  'video[controls]',
].join(', ');

export function useKeyboardNavigation(
  options: KeyboardNavigationOptions = {}
): KeyboardNavigationControls {
  const {
    enableArrowKeys = false,
    enableEscape = false,
    enableActivation = false,
    trapFocus = false,
    autoFocus = false,
    onEscape,
    onEnter,
    onArrowUp,
    onArrowDown,
    onArrowLeft,
    onArrowRight,
  } = options;

  const containerRef = useRef<HTMLElement>(null);

  // Get all focusable elements within the container
  const getFocusableElements = useCallback((): HTMLElement[] => {
    if (!containerRef.current) return [];

    const elements = Array.from(
      containerRef.current.querySelectorAll(FOCUSABLE_SELECTORS)
    ) as HTMLElement[];

    return elements.filter(element => {
      // Check if element is visible and not hidden
      const style = window.getComputedStyle(element);
      return (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        element.offsetWidth > 0 &&
        element.offsetHeight > 0
      );
    });
  }, []);

  // Focus management functions
  const focusFirst = useCallback(() => {
    const elements = getFocusableElements();
    if (elements.length > 0) {
      elements[0].focus();
    }
  }, [getFocusableElements]);

  const focusLast = useCallback(() => {
    const elements = getFocusableElements();
    if (elements.length > 0) {
      elements[elements.length - 1].focus();
    }
  }, [getFocusableElements]);

  const focusNext = useCallback(() => {
    const elements = getFocusableElements();
    const currentIndex = elements.indexOf(
      document.activeElement as HTMLElement
    );

    if (currentIndex === -1) {
      focusFirst();
    } else {
      const nextIndex = (currentIndex + 1) % elements.length;
      elements[nextIndex].focus();
    }
  }, [getFocusableElements, focusFirst]);

  const focusPrevious = useCallback(() => {
    const elements = getFocusableElements();
    const currentIndex = elements.indexOf(
      document.activeElement as HTMLElement
    );

    if (currentIndex === -1) {
      focusLast();
    } else {
      const prevIndex =
        currentIndex === 0 ? elements.length - 1 : currentIndex - 1;
      elements[prevIndex].focus();
    }
  }, [getFocusableElements, focusLast]);

  // Keyboard event handler
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!containerRef.current) return;

      const { key, shiftKey } = event;

      switch (key) {
        case 'Escape':
          if (enableEscape && onEscape) {
            event.preventDefault();
            onEscape();
          }
          break;

        case 'Enter':
          if (enableActivation && onEnter) {
            event.preventDefault();
            onEnter();
          }
          break;

        case 'Tab':
          if (trapFocus) {
            const elements = getFocusableElements();
            if (elements.length === 0) return;

            const firstElement = elements[0];
            const lastElement = elements[elements.length - 1];
            const activeElement = document.activeElement;

            if (shiftKey) {
              // Shift + Tab (backward)
              if (activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
              }
            } else {
              // Tab (forward)
              if (activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
              }
            }
          }
          break;

        case 'ArrowUp':
          if (enableArrowKeys) {
            event.preventDefault();
            if (onArrowUp) {
              onArrowUp();
            } else {
              focusPrevious();
            }
          }
          break;

        case 'ArrowDown':
          if (enableArrowKeys) {
            event.preventDefault();
            if (onArrowDown) {
              onArrowDown();
            } else {
              focusNext();
            }
          }
          break;

        case 'ArrowLeft':
          if (enableArrowKeys && onArrowLeft) {
            event.preventDefault();
            onArrowLeft();
          }
          break;

        case 'ArrowRight':
          if (enableArrowKeys && onArrowRight) {
            event.preventDefault();
            onArrowRight();
          }
          break;

        case 'Home':
          if (enableArrowKeys) {
            event.preventDefault();
            focusFirst();
          }
          break;

        case 'End':
          if (enableArrowKeys) {
            event.preventDefault();
            focusLast();
          }
          break;
      }
    },
    [
      enableArrowKeys,
      enableEscape,
      enableActivation,
      trapFocus,
      onEscape,
      onEnter,
      onArrowUp,
      onArrowDown,
      onArrowLeft,
      onArrowRight,
      getFocusableElements,
      focusFirst,
      focusLast,
      focusNext,
      focusPrevious,
    ]
  );

  // Set up event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('keydown', handleKeyDown);

    // Auto-focus first element if enabled
    if (autoFocus) {
      const timer = setTimeout(() => {
        focusFirst();
      }, 100); // Small delay to ensure elements are rendered

      return () => {
        clearTimeout(timer);
        container.removeEventListener('keydown', handleKeyDown);
      };
    }

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, autoFocus, focusFirst]);

  return {
    containerRef,
    focusFirst,
    focusLast,
    focusNext,
    focusPrevious,
    getFocusableElements,
  };
}

// Hook for managing focus trap (commonly used in modals, dropdowns)
export function useFocusTrap(isActive: boolean = true) {
  return useKeyboardNavigation({
    trapFocus: isActive,
    autoFocus: isActive,
    enableEscape: true,
  });
}

// Hook for managing list navigation (commonly used in menus, select options)
export function useListNavigation(
  options: {
    onSelect?: (index: number) => void;
    onEscape?: () => void;
  } = {}
) {
  const { onSelect, onEscape } = options;

  return useKeyboardNavigation({
    enableArrowKeys: true,
    enableEscape: true,
    enableActivation: true,
    onEscape,
    onEnter: () => {
      if (onSelect) {
        const elements =
          containerRef.current?.querySelectorAll(FOCUSABLE_SELECTORS);
        if (elements) {
          const activeIndex = Array.from(elements).indexOf(
            document.activeElement as HTMLElement
          );
          if (activeIndex !== -1) {
            onSelect(activeIndex);
          }
        }
      }
    },
  });
}
