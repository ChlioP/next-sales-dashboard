'use server';

import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

type RawRow = {
  Category: string;
  Stock: string;
};

export async function loadSalesData() {
  const filePath = path.join(process.cwd(), 'src/data/sales.csv');
  const file = fs.readFileSync(filePath, 'utf8');

  const parsed = Papa.parse<RawRow>(file, {
    header: true,
    skipEmptyLines: true,
  });

  const categoryTotals: { [key: string]: number } = {};

  parsed.data.forEach((row) => {
    let category = row.Category?.trim();
    const rawStock = row.Stock?.trim();
    const stock = Number(rawStock);

    // Skip invalid rows
    if (!category || isNaN(stock)) return;

    // Format category name to sentence case
    category = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

    if (!categoryTotals[category]) {
      categoryTotals[category] = 0;
    }

    categoryTotals[category] += stock;
  });

  // Format the final chart data
  const chartData = Object.entries(categoryTotals).map(([Category, Stock]) => ({
    Category,
    Stock,
  }));

  return chartData;
}
