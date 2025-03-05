
import React, { useState, useEffect, useMemo } from 'react';
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { useDashboard } from '@/contexts/DashboardContext';

export interface Column<T> {
  key: string;
  title: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

interface DataTableProps<T> {
  title?: string;
  columns: Column<T>[];
  data: T[] | undefined;
  isLoading?: boolean;
  error?: Error | null;
  keyExtractor: (item: T) => string;
  onRowClick?: (item: T) => void;
  searchable?: boolean;
  pagination?: boolean;
  initialItemsPerPage?: number;
  className?: string;
}

export function DataTable<T>({
  title,
  columns,
  data,
  isLoading = false,
  error = null,
  keyExtractor,
  onRowClick,
  searchable = true,
  pagination = true,
  initialItemsPerPage = 10,
  className = ''
}: DataTableProps<T>) {
  const { isDenseView, reportPerformanceIssue } = useDashboard();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  
  // Sorting state
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  
  // Reset to first page when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [data, searchTerm, sortKey, sortDirection]);

  // Performance monitoring - large datasets warning
  useEffect(() => {
    if (data && data.length > 1000) {
      reportPerformanceIssue('DataTable', `Large dataset with ${data.length} rows might affect performance`);
    }
  }, [data, reportPerformanceIssue]);

  // Filter data based on search term - memoized for performance
  const filteredData = useMemo(() => {
    if (!data) return [];
    if (!searchTerm.trim()) return data;
    
    const searchLower = searchTerm.toLowerCase();
    return data.filter(item => {
      return Object.values(item).some(value => {
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(searchLower);
      });
    });
  }, [data, searchTerm]);

  // Sort data based on sort key and direction - memoized for performance
  const sortedData = useMemo(() => {
    if (!filteredData || !sortKey) return filteredData;

    return [...filteredData].sort((a, b) => {
      // @ts-ignore - This is a bit of a hack, but we know we're accessing valid properties
      const aValue = a[sortKey];
      // @ts-ignore
      const bValue = b[sortKey];

      // Handle different types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      // Default comparison for other types
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortKey, sortDirection]);

  // Paginate data - memoized for performance
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage, pagination]);

  // Render loading skeleton
  if (isLoading) {
    return (
      <Card className={`glass-card ${className}`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">{title || 'Loading data...'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Render error state
  if (error) {
    return (
      <Card className={`glass-card ${className}`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">{title || 'Error'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 text-center text-red-600">
            <p className="font-semibold">Failed to load data</p>
            <p className="text-sm">{error.message}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculate total pages
  const totalPages = Math.ceil((sortedData?.length || 0) / itemsPerPage);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  return (
    <ErrorBoundary componentName="DataTable">
      <Card className={`glass-card ${className}`}>
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            {searchable && (
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-8 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button 
                    className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground hover:text-foreground"
                    onClick={() => setSearchTerm('')}
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className={`bg-muted/50 ${isDenseView ? 'h-8' : 'h-10'}`}>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className={`
                        px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground
                        ${column.width ? column.width : ''}
                        ${column.sortable ? 'cursor-pointer select-none' : ''}
                      `}
                      onClick={() => column.sortable && handleSort(column.key)}
                    >
                      <div className="flex items-center space-x-1">
                        <span>{column.title}</span>
                        {column.sortable && sortKey === column.key && (
                          sortDirection === 'asc' ? 
                            <ChevronUp className="h-4 w-4" /> : 
                            <ChevronDown className="h-4 w-4" />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-4 py-8 text-center text-sm text-muted-foreground"
                    >
                      No data available
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((item) => (
                    <tr
                      key={keyExtractor(item)}
                      className={`
                        border-b border-muted/20
                        ${isDenseView ? 'h-10' : 'h-14'}
                        ${onRowClick ? 'cursor-pointer hover:bg-muted/20' : ''}
                      `}
                      onClick={() => onRowClick && onRowClick(item)}
                    >
                      {columns.map((column) => (
                        <td key={column.key} className="px-4 py-2">
                          {column.render ? (
                            column.render(item)
                          ) : (
                            // @ts-ignore - This is a bit of a hack, but we know we're accessing valid properties
                            <span>{String(item[column.key] || '')}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {pagination && totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                  {Math.min(currentPage * itemsPerPage, sortedData.length)} of{' '}
                  {sortedData.length} entries
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </ErrorBoundary>
  );
}
