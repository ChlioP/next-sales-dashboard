import FilterableDashboard from '@/components/FilterableDashboard';
import { loadSalesData } from '@/lib/loadSales';

export default async function DashboardPage() {
  const data = await loadSalesData();

  return <FilterableDashboard data={data} />;
}
