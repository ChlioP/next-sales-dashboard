'use client';

import { useState } from 'react';
import FilterInput from './FilterInput';
import SalesChart from './SalesChart';

type Props = {
  data: { Category: string; Stock: number }[];
};

export default function FilterableDashboard({ data }: Props) {
  const [threshold, setThreshold] = useState(0);
  const [query, setQuery] = useState('');

  const filtered = data.filter((item) =>
    item.Category.toLowerCase().includes(query.toLowerCase()) &&
    item.Stock >= threshold
  );

  return (
    <main className="min-h-screen p-10 bg-gradient-to-br from-pink-300 via-purple-300 to-blue-400 text-white font-sans">
      <h1 className="text-3xl font-bold mb-6">Stock by Category</h1>

      {/* Search by Name */}
      <div className="relative w-full max-w-md mb-4">
  <input
    type="text"
    placeholder="Search by category..."
    onChange={(e) => setQuery(e.target.value)}
    className="pl-10 p-3 rounded-lg bg-white/80 backdrop-blur-md text-black placeholder-gray-500 w-full shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400"
  />
  <svg
    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width="20"
    height="20"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
    />
  </svg>
</div>



      {/* Filter by Stock Threshold */}
      <FilterInput onChange={setThreshold} />

      <SalesChart data={filtered} />
    </main>
  );
}
