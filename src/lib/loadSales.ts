'use server';

import Papa from 'papaparse';

type Row = {
  Category: string;
  Stock: string;
};

export async function loadSalesData() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    'https://next-sales-dashboard.vercel.app'; // ✅ replace with your deployed Vercel URL

  const res = await fetch(new URL('/sales.csv', baseUrl).toString());
  const csvText = await res.text();

  const parsed = Papa.parse<Row>(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  console.log('Parsed CSV:', parsed.data); // ✅ Debug line to see the raw data

  const categoryTotals: { [key: string]: number } = {};

  parsed.data.forEach((row, index) => {
    const rawCategory = row.Category?.trim();
    const rawStock = row.Stock?.trim();
    const stock = Number(rawStock);

    if (!rawCategory || isNaN(stock)) {
      console.warn(`Skipping row ${index}:`, row);
      return;
    }

    const formattedCategory =
      rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1).toLowerCase();

    if (!categoryTotals[formattedCategory]) {
      categoryTotals[formattedCategory] = 0;
    }

    categoryTotals[formattedCategory] += stock;
  });

  console.log('categoryTotals:', categoryTotals); // ✅ Debug line to see final output

  return Object.entries(categoryTotals).map(([Category, Stock]) => ({
    Category,
    Stock,
  }));
}
