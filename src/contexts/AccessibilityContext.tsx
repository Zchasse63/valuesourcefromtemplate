
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface AccessibilityContextType {
  // Font size controls
  fontSize: 'normal' | 'large' | 'x-large';
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
  
  // Contrast and color modes
  highContrast: boolean;
  toggleHighContrast: () => void;
  
  // Motion reduction
  reduceMotion: boolean;
  toggleReduceMotion: () => void;
  
  // Screen reader compatibility enhancements
  enhanceScreenReaderCompatibility: boolean;
  toggleScreenReaderCompatibility: () => void;
  
  // Focus indicators
  focusIndicatorsEnhanced: boolean;
  toggleFocusIndicators: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  
  // Initialize state from localStorage if available
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'x-large'>(() => {
    const saved = localStorage.getItem('accessibility-font-size');
    return (saved as 'normal' | 'large' | 'x-large') || 'normal';
  });
  
  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem('accessibility-high-contrast') === 'true';
  });
  
  const [reduceMotion, setReduceMotion] = useState(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const savedPreference = localStorage.getItem('accessibility-reduce-motion');
    return savedPreference !== null 
      ? savedPreference === 'true' 
      : mediaQuery.matches;
  });
  
  const [enhanceScreenReaderCompatibility, setEnhanceScreenReaderCompatibility] = useState(() => {
    return localStorage.getItem('accessibility-screen-reader') === 'true';
  });
  
  const [focusIndicatorsEnhanced, setFocusIndicatorsEnhanced] = useState(() => {
    return localStorage.getItem('accessibility-focus-indicators') === 'true';
  });
  
  // Apply settings to the DOM
  useEffect(() => {
    // Font size
    document.documentElement.classList.remove('text-normal', 'text-large', 'text-x-large');
    document.documentElement.classList.add(`text-${fontSize}`);
    localStorage.setItem('accessibility-font-size', fontSize);
    
    // High contrast
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    localStorage.setItem('accessibility-high-contrast', highContrast.toString());
    
    // Motion reduction
    if (reduceMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
    localStorage.setItem('accessibility-reduce-motion', reduceMotion.toString());
    
    // Screen reader compatibility
    if (enhanceScreenReaderCompatibility) {
      document.documentElement.classList.add('sr-enhanced');
    } else {
      document.documentElement.classList.remove('sr-enhanced');
    }
    localStorage.setItem('accessibility-screen-reader', enhanceScreenReaderCompatibility.toString());
    
    // Focus indicators
    if (focusIndicatorsEnhanced) {
      document.documentElement.classList.add('focus-enhanced');
    } else {
      document.documentElement.classList.remove('focus-enhanced');
    }
    localStorage.setItem('accessibility-focus-indicators', focusIndicatorsEnhanced.toString());
  }, [
    fontSize, 
    highContrast, 
    reduceMotion, 
    enhanceScreenReaderCompatibility,
    focusIndicatorsEnhanced
  ]);
  
  // Font size handlers
  const increaseFontSize = () => {
    setFontSize(prev => {
      if (prev === 'normal') return 'large';
      if (prev === 'large') return 'x-large';
      return prev;
    });
    toast({
      title: "Font size increased",
      description: "The text size has been increased for better readability.",
    });
  };
  
  const decreaseFontSize = () => {
    setFontSize(prev => {
      if (prev === 'x-large') return 'large';
      if (prev === 'large') return 'normal';
      return prev;
    });
    toast({
      title: "Font size decreased",
      description: "The text size has been decreased.",
    });
  };
  
  const resetFontSize = () => {
    setFontSize('normal');
    toast({
      title: "Font size reset",
      description: "The text size has been reset to normal.",
    });
  };
  
  // Toggle functions
  const toggleHighContrast = () => {
    setHighContrast(prev => !prev);
    toast({
      title: highContrast ? "High contrast disabled" : "High contrast enabled",
      description: highContrast 
        ? "Standard contrast mode is now active." 
        : "High contrast mode is now active for better visibility.",
    });
  };
  
  const toggleReduceMotion = () => {
    setReduceMotion(prev => !prev);
    toast({
      title: reduceMotion ? "Motion effects enabled" : "Motion effects reduced",
      description: reduceMotion 
        ? "Standard animations are now active." 
        : "Animations have been reduced for better comfort.",
    });
  };
  
  const toggleScreenReaderCompatibility = () => {
    setEnhanceScreenReaderCompatibility(prev => !prev);
    toast({
      title: enhanceScreenReaderCompatibility 
        ? "Screen reader enhancements disabled" 
        : "Screen reader enhancements enabled",
      description: enhanceScreenReaderCompatibility 
        ? "Standard screen reader mode is now active." 
        : "Enhanced screen reader compatibility is now active.",
    });
  };
  
  const toggleFocusIndicators = () => {
    setFocusIndicatorsEnhanced(prev => !prev);
    toast({
      title: focusIndicatorsEnhanced 
        ? "Focus indicators set to standard" 
        : "Focus indicators enhanced",
      description: focusIndicatorsEnhanced 
        ? "Standard focus indicators are now active." 
        : "Focus indicators have been enhanced for better visibility.",
    });
  };
  
  return (
    <AccessibilityContext.Provider value={{
      fontSize,
      increaseFontSize,
      decreaseFontSize,
      resetFontSize,
      highContrast,
      toggleHighContrast,
      reduceMotion,
      toggleReduceMotion,
      enhanceScreenReaderCompatibility,
      toggleScreenReaderCompatibility,
      focusIndicatorsEnhanced,
      toggleFocusIndicators,
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
