
/**
 * Utility functions for chart formatting and data processing
 * to ensure consistency across the entire application
 */

/**
 * Format currency values for display
 * @param value The numerical value to format as currency
 * @param minimumFractionDigits Number of decimal places (default: 0)
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number, minimumFractionDigits: number = 0): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits,
    maximumFractionDigits: minimumFractionDigits
  }).format(value);
};

/**
 * Format dates for display
 * @param date The date to format
 * @param style The date style to use (default: medium)
 * @returns Formatted date string or "N/A" if date is null
 */
export const formatDate = (date: Date | string | null, style: 'short' | 'medium' | 'long' = 'medium'): string => {
  if (!date) return 'N/A';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('en-US', { 
    dateStyle: style 
  }).format(dateObj);
};

/**
 * Get an array of the last N months
 * @param count Number of months to return (default: 6)
 * @returns Array of month objects with name and date
 */
export const getLastMonths = (count: number = 6) => {
  return [...Array(count)].map((_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    return {
      month: date.toLocaleString('default', { month: 'short' }),
      fullDate: date,
    };
  }).reverse();
};

/**
 * Standard set of chart colors to use across the application
 */
export const CHART_COLORS = {
  primary: ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'],
  secondary: ['#ffc658', '#ff8042', '#ff6361', '#bc5090', '#58508d'],
  success: ['#82ca9d', '#a4de6c', '#d0ed57', '#97e3d5', '#61cdbb'],
  info: ['#8dd1e1', '#83a6ed', '#8884d8', '#7784cc', '#665191'],
  warning: ['#ffc658', '#ffa00a', '#ff8042', '#ff6361', '#ffb55a'],
  danger: ['#ff6361', '#ea5545', '#ef7c8e', '#f8a07e', '#ff8042']
};

/**
 * Generate default Tooltip props for Recharts
 */
export const getDefaultTooltipProps = () => ({
  contentStyle: { 
    background: 'white', 
    border: '1px solid #f0f0f0', 
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
  }
});
