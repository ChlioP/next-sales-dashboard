'use server';

import Papa from 'papaparse';

type Row = {
  Category: string;
  Stock: string;
};

export async function loadSalesData() {
    const res = await fetch(new URL('/sales.csv', 'https://next-sales-dashboard.vercel.app').toString());

  const csvText = await res.text();

  const parsed = Papa.parse<Row>(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  const categoryTotals: { [key: string]: number } = {};

  parsed.data.forEach((row) => {
    let category = row.Category?.trim();
    const rawStock = row.Stock?.trim();
    const stock = Number(rawStock);

    if (!category || isNaN(stock)) return;

    category = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

    if (!categoryTotals[category]) {
      categoryTotals[category] = 0;
    }

    categoryTotals[category] += stock;
  });

  return Object.entries(categoryTotals).map(([Category, Stock]) => ({
    Category,
    Stock,
  }));
}
