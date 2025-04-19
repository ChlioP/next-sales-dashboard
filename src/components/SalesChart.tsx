'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

type Props = {
  data: { Category: string; Stock: number }[];
};

export default function SalesChart({ data }: Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // only run chart logic after client mounts
  }, []);

  if (!isClient) return <p>Loading chart...</p>;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/20">
      <h2 className="text-xl font-semibold mb-4 text-center text-purple-500">
  Inventory by Category
</h2>

      <BarChart width={600} height={350} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Category" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="Stock" fill="#38bdf8" />
      </BarChart>
    </div>
  );
  
  
}
