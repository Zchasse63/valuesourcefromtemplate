
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CHART_COLORS, getDefaultTooltipProps } from '@/utils/chartUtils';

export type ChartTheme = 'light' | 'dark';
export type ChartColorScheme = keyof typeof CHART_COLORS;

interface ChartContextType {
  theme: ChartTheme;
  setTheme: (theme: ChartTheme) => void;
  colorScheme: ChartColorScheme;
  setColorScheme: (scheme: ChartColorScheme) => void;
  getColors: () => string[];
  getTooltipProps: () => Record<string, any>;
}

const ChartContext = createContext<ChartContextType | undefined>(undefined);

export const ChartProvider = ({ children, initialTheme = 'light', initialColorScheme = 'primary' }: {
  children: ReactNode;
  initialTheme?: ChartTheme;
  initialColorScheme?: ChartColorScheme;
}) => {
  const [theme, setTheme] = useState<ChartTheme>(initialTheme);
  const [colorScheme, setColorScheme] = useState<ChartColorScheme>(initialColorScheme);

  const getColors = () => CHART_COLORS[colorScheme];
  
  const getTooltipProps = () => ({
    ...getDefaultTooltipProps(),
    // Add theme-specific styles
    contentStyle: {
      ...getDefaultTooltipProps().contentStyle,
      background: theme === 'dark' ? '#1f2937' : 'white',
      color: theme === 'dark' ? 'white' : 'inherit',
      border: theme === 'dark' ? '1px solid #374151' : '1px solid #f0f0f0',
    }
  });

  return (
    <ChartContext.Provider value={{
      theme,
      setTheme,
      colorScheme,
      setColorScheme,
      getColors,
      getTooltipProps
    }}>
      {children}
    </ChartContext.Provider>
  );
};

export const useChartContext = () => {
  const context = useContext(ChartContext);
  if (context === undefined) {
    throw new Error('useChartContext must be used within a ChartProvider');
  }
  return context;
};
