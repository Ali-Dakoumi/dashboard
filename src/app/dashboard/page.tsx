import { Suspense } from 'react';
import DashboardLoading from './loading';
import DashboardContent from '../../components/dashboard/dashboard-content';
export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardContent />
    </Suspense>
  );
}
