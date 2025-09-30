import ReportsTable from "@/components/dashboard/reportsTable";
import StatsCard from "@/components/dashboard/statsCard";
import { Button } from "@/components/ui/button";
import { Search, CheckCircle, Clock } from "lucide-react";

export default function PassengerDashboard() {
  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="bg-blue-100 text-blue-800 px-4 py-3 rounded-md">
        <strong>Heads up!</strong> This is a live demo prototype. Data is
        simulated.
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 hidden md:grid">
        <StatsCard title="Open Reports" value="2" icon={<Search />} />
        <StatsCard title="Resolved Cases" value="1" icon={<CheckCircle />} />
        <StatsCard
          title="Avg. Resolution (Days)"
          value="4.7"
          icon={<Clock />}
        />
      </div>
      {/* Stats Cards mobile */}
      <div className="md:hidden">
        <div className="flex gap-4 mb-4 w-full">
          <StatsCard title="Open Reports" value="2" icon={<Search />} />
          <StatsCard title="Resolved Cases" value="1" icon={<CheckCircle />} />
        </div>

        <StatsCard
          title="Avg. Resolution (Days)"
          value="4.7"
          icon={<Clock />}
        />
      </div>

      {/* Reports Section */}
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
      
        <ReportsTable />
      </div>
    </div>
  );
}
