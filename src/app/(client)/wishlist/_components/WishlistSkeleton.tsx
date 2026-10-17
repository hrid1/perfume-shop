import React from 'react';

export function WishlistSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-noir-900 rounded-2xl overflow-hidden border border-noir-800 animate-pulse flex flex-col"
        >
          <div className="aspect-[4/5] bg-noir-800/60" />
          <div className="p-5 flex flex-col gap-3">
            <div className="h-3 w-16 bg-noir-800/70 rounded-sm" />
            <div className="h-5 w-3/4 bg-noir-800/70 rounded-sm" />
            <div className="h-3 w-20 bg-noir-800/50 rounded-sm" />
            <div className="h-5 w-24 bg-noir-800/70 rounded-sm mt-1" />
            <div className="h-10 w-full bg-noir-800/80 rounded-xl mt-3" />
          </div>
        </div>
      ))}
    </div>
  );
}
