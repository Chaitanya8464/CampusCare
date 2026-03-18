import React from 'react';

/**
 * Loading Skeleton Component
 * Provides visual placeholder while content loads
 */
export const CardSkeleton = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 animate-pulse"
        >
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        </div>
      ))}
    </>
  );
};

/**
 * Stats Card Skeleton
 */
export const StatsSkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {Array.from({ length: 4 }).map((_, index) => (
      <div
        key={index}
        className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow animate-pulse"
      >
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      </div>
    ))}
  </div>
);

/**
 * Table Row Skeleton
 */
export const TableRowSkeleton = ({ rows = 5 }) => (
  <>
    {Array.from({ length: rows }).map((_, index) => (
      <div
        key={index}
        className="p-4 border-b border-gray-200 dark:border-gray-700 animate-pulse"
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          </div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
        </div>
      </div>
    ))}
  </>
);

/**
 * Page Loading Skeleton
 */
export const PageSkeleton = () => (
  <div className="min-h-screen bg-white dark:bg-black pt-20 pb-8 px-6">
    <div className="max-w-6xl mx-auto">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2 animate-pulse"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6 animate-pulse"></div>
      <StatsSkeleton />
      <div className="mt-8">
        <CardSkeleton count={3} />
      </div>
    </div>
  </div>
);

export default {
  CardSkeleton,
  StatsSkeleton,
  TableRowSkeleton,
  PageSkeleton
};
