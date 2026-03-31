'use client';

import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-furniture-terracotta" />
        <p className="text-furniture-gray-500 text-sm">Loading...</p>
      </div>
    </div>
  );
}
