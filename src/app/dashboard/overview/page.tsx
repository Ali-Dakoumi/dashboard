import { UserProfile } from '@/components/dashboard/user-profile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function DashboardOverview() {
  return (
    <div className='container space-y-6 p-6'>
      <h1 className='text-3xl font-bold'>Dashboard Overview</h1>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        <UserProfile />

        {/* Other dashboard cards */}
        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
          </CardHeader>
          <CardContent>{/* Add your statistics content */}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>{/* Add your recent activity content */}</CardContent>
        </Card>
      </div>
    </div>
  );
}
