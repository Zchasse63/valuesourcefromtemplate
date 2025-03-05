
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";

// Dashboard view types
export type DashboardViewPeriod = 'day' | 'week' | 'month' | 'quarter' | 'year';
export type DashboardDataFilter = 'all' | 'sales' | 'expenses' | 'inventory';

// Business objectives tracking
export interface BusinessObjective {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  category: 'revenue' | 'cost' | 'growth' | 'efficiency';
}

interface DashboardContextType {
  // View controls
  viewPeriod: DashboardViewPeriod;
  setViewPeriod: (period: DashboardViewPeriod) => void;
  dataFilter: DashboardDataFilter;
  setDataFilter: (filter: DashboardDataFilter) => void;
  
  // Cross-component communication
  refreshDashboard: () => void;
  
  // Business objectives
  businessObjectives: BusinessObjective[];
  updateObjectiveProgress: (id: string, value: number) => void;
  
  // Performance monitoring
  reportPerformanceIssue: (component: string, issue: string) => void;
  
  // Configuration
  isDenseView: boolean;
  setIsDenseView: (isDense: boolean) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [viewPeriod, setViewPeriod] = useState<DashboardViewPeriod>('month');
  const [dataFilter, setDataFilter] = useState<DashboardDataFilter>('all');
  const [isDenseView, setIsDenseView] = useState<boolean>(false);
  
  // Sample business objectives
  const [businessObjectives, setBusinessObjectives] = useState<BusinessObjective[]>([
    {
      id: 'obj-1',
      title: 'Quarterly Revenue',
      target: 500000,
      current: 378500,
      unit: 'USD',
      category: 'revenue',
    },
    {
      id: 'obj-2',
      title: 'Cost Reduction',
      target: 15,
      current: 8.7,
      unit: 'percent',
      category: 'cost',
    },
    {
      id: 'obj-3',
      title: 'Customer Growth',
      target: 100,
      current: 63,
      unit: 'customers',
      category: 'growth',
    },
    {
      id: 'obj-4',
      title: 'Inventory Turnover',
      target: 12,
      current: 9.2,
      unit: 'ratio',
      category: 'efficiency',
    },
  ]);

  const refreshDashboard = () => {
    toast.success({
      title: "Dashboard Refreshed",
      description: `Data updated for ${viewPeriod} view with ${dataFilter} filter`,
    });
    // In a real app, this would trigger data refetching
  };

  const updateObjectiveProgress = (id: string, value: number) => {
    setBusinessObjectives(prev => prev.map(obj => 
      obj.id === id ? { ...obj, current: value } : obj
    ));
    
    toast({
      title: "Objective Updated",
      description: `Business objective progress has been updated`,
    });
  };

  const reportPerformanceIssue = (component: string, issue: string) => {
    console.warn(`Performance issue in ${component}: ${issue}`);
    toast.warning({
      title: "Performance Issue Detected",
      description: `${component}: ${issue}. Our team has been notified.`,
    });
    // In a real app, this might send telemetry to a monitoring service
  };

  return (
    <DashboardContext.Provider value={{
      viewPeriod,
      setViewPeriod,
      dataFilter,
      setDataFilter,
      refreshDashboard,
      businessObjectives,
      updateObjectiveProgress,
      reportPerformanceIssue,
      isDenseView,
      setIsDenseView,
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
